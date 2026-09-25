// Checks that a feature request carries a valid Warden spec or plan export.
//
// Runs from .github/workflows/feature-request-check.yml on issue events. The
// attached file is parsed as JSON and inspected, never executed. Keeps one bot
// comment per issue (updated in place on edits) and sets labels:
//   valid   -> spec|plan + triage, needs-artifact removed
//   invalid -> needs-artifact, spec/plan/triage removed

import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

const MAX_BYTES = 1_000_000;
const MIN_TEXT = 80;
const MARKER = '<!-- warden-artifact-check -->';
const GUIDE = 'https://github.com/plutocoach/warden/blob/main/docs/feature-requests.md';

// Only GitHub-hosted issue attachments are fetched.
const ATTACHMENT_RE =
  /https:\/\/github\.com\/(?:user-attachments\/files|[\w.-]+\/[\w.-]+\/files)\/\d+\/[^\s)"'<>\]]+/gi;
const FENCE_RE = /```(?:json)?[ \t]*\r?\n([\s\S]*?)\r?\n[ \t]*```/gi;

const text = (v) => (typeof v === 'string' ? v.trim() : '');

/** Validate a parsed envelope. Pure, so it is unit-tested. */
export function validateEnvelope(env) {
  const errors = [];
  const warnings = [];
  if (!env || typeof env !== 'object' || Array.isArray(env)) {
    return { ok: false, errors: ['The file is not a Warden export (expected a JSON object).'], warnings };
  }
  const kind = env.wardenArtifact;
  if (kind !== 'spec' && kind !== 'plan') {
    return {
      ok: false,
      errors: ['The file is not a Warden spec or plan export (missing `wardenArtifact`). Use **Export** on the spec or plan in Warden.'],
      warnings,
    };
  }
  if (env.formatVersion !== 1) errors.push(`Unsupported \`formatVersion\` (${JSON.stringify(env.formatVersion)}). Re-export from an up-to-date Warden.`);
  if (!text(env.title)) errors.push('The ' + kind + ' has no title.');

  if (kind === 'spec') {
    const req = text(env.requirements_md);
    if (req.length < MIN_TEXT) {
      errors.push('The spec has no requirements yet. Generate or write the **Requirements** phase before exporting.');
    } else if (!/\bshall\b/i.test(req)) {
      warnings.push('No requirement uses the "... the system SHALL ..." form. Testable requirements are much more likely to land.');
    }
    if (!text(env.design_md)) warnings.push('No design section. Optional, but helpful.');
    const checks = [...(Array.isArray(env.coverage) ? env.coverage : []), ...(Array.isArray(env.invariants) ? env.invariants : [])];
    if (checks.some((c) => c && text(c.test))) {
      warnings.push('Linked test commands are kept for reference only and are never run on import.');
    }
  } else {
    const versions = Array.isArray(env.versions) ? env.versions : [];
    const current = versions.find((v) => v && v.n === env.currentVersion) || versions[versions.length - 1];
    if (!current || text(current.content_md).length < MIN_TEXT) {
      errors.push('The plan has no content yet. Draft the plan in Warden before exporting.');
    }
  }
  return { ok: errors.length === 0, kind, title: text(env.title), errors, warnings };
}

/** Candidate sources in an issue body: attachment URLs, then pasted JSON blocks. */
export function findCandidates(body) {
  const src = body || '';
  const urls = [...new Set(src.match(ATTACHMENT_RE) || [])];
  const blocks = [...src.matchAll(FENCE_RE)].map((m) => m[1]).filter((b) => b.trim().startsWith('{'));
  return { urls, blocks };
}

async function fetchAttachment(url) {
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) throw new Error(`download failed (${res.status})`);
  const len = Number(res.headers.get('content-length') || 0);
  if (len > MAX_BYTES) throw new Error('file is larger than 1 MB');
  const body = await res.text();
  if (body.length > MAX_BYTES) throw new Error('file is larger than 1 MB');
  return body;
}

/** Try every candidate; the first valid one wins, else the most useful failure. */
export async function checkBody(body, fetcher = fetchAttachment) {
  const { urls, blocks } = findCandidates(body);
  if (urls.length === 0 && blocks.length === 0) {
    return { ok: false, errors: ['No spec or plan file was attached. Drag your exported `.warden-spec.json` or `.warden-plan.json` into the issue.'], warnings: [] };
  }
  let firstFailure = null;
  const sources = [...urls.map((u) => ({ url: u })), ...blocks.map((b) => ({ raw: b }))];
  for (const s of sources) {
    let result;
    try {
      const raw = s.raw ?? (await fetcher(s.url));
      if (raw.length > MAX_BYTES) throw new Error('file is larger than 1 MB');
      let parsed;
      try {
        parsed = JSON.parse(raw);
      } catch {
        throw new Error('the file is not valid JSON');
      }
      result = validateEnvelope(parsed);
    } catch (err) {
      result = { ok: false, errors: [`Couldn't read the attachment: ${err.message}.`], warnings: [] };
    }
    if (result.ok) return result;
    firstFailure ??= result;
  }
  return firstFailure;
}

// Neutralize @mentions and markdown so an echoed title can't ping or inject.
const safeInline = (s) => s.replace(/[`\\]/g, '').replace(/@/g, '@​').slice(0, 120);

export function renderComment(result) {
  const lines = [MARKER];
  if (result.ok) {
    lines.push(`✅ Found a valid Warden **${result.kind}**: \`${safeInline(result.title)}\`. It's queued for triage.`);
  } else {
    lines.push('⚠️ This feature request needs a valid Warden spec or plan attached.', '');
    for (const e of result.errors) lines.push(`- ${e}`);
    lines.push('', `**Edit this issue** to attach a fixed export and the check re-runs automatically. [How to create and export a spec](${GUIDE}).`,
      'Requests without a valid spec or plan are closed after 14 days.');
  }
  if (result.warnings?.length) {
    lines.push('', '<details><summary>Suggestions</summary>', '');
    for (const w of result.warnings) lines.push(`- ${w}`);
    lines.push('', '</details>');
  }
  return lines.join('\n');
}

async function gh(method, path, body) {
  const res = await fetch(`https://api.github.com${path}`, {
    method,
    headers: {
      authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      accept: 'application/vnd.github+json',
      'x-github-api-version': '2022-11-28',
      ...(body ? { 'content-type': 'application/json' } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok && res.status !== 404) throw new Error(`${method} ${path} -> ${res.status} ${await res.text()}`);
  return res.status === 204 || res.status === 404 ? null : res.json();
}

async function main() {
  const event = JSON.parse(await readFile(process.env.GITHUB_EVENT_PATH, 'utf-8'));
  const issue = event.issue;
  const repo = process.env.GITHUB_REPOSITORY;
  if (!issue || issue.pull_request || issue.state !== 'open') return;
  if (!issue.labels.some((l) => l.name === 'feature-request')) return;

  const result = await checkBody(issue.body);
  const base = `/repos/${repo}/issues/${issue.number}`;

  const comments = await gh('GET', `${base}/comments?per_page=100`);
  const mine = (comments || []).find((c) => c.user?.type === 'Bot' && c.body?.includes(MARKER));
  const body = renderComment(result);
  if (mine) await gh('PATCH', `/repos/${repo}/issues/comments/${mine.id}`, { body });
  else await gh('POST', `${base}/comments`, { body });

  const remove = result.ok ? ['needs-artifact', result.kind === 'spec' ? 'plan' : 'spec'] : ['spec', 'plan', 'triage'];
  const add = result.ok ? [result.kind, 'triage'] : ['needs-artifact'];
  const current = new Set(issue.labels.map((l) => l.name));
  for (const l of remove) if (current.has(l)) await gh('DELETE', `${base}/labels/${encodeURIComponent(l)}`);
  await gh('POST', `${base}/labels`, { labels: add });
  console.log(result.ok ? `valid ${result.kind}` : `invalid: ${result.errors.join(' | ')}`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
