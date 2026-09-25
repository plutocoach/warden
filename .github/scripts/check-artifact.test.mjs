// node --test .github/scripts/
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateEnvelope, findCandidates, checkBody, renderComment } from './check-artifact.mjs';

const REQS = '# Requirements\n\nWHEN a tool call is blocked, the system SHALL show the rule that blocked it, including its id.';
const spec = (over = {}) => ({ wardenArtifact: 'spec', formatVersion: 1, title: 'Show rule', requirements_md: REQS, design_md: 'd', ...over });
const plan = (over = {}) => ({
  wardenArtifact: 'plan', formatVersion: 1, title: 'P', currentVersion: 1,
  versions: [{ n: 1, content_md: 'x'.repeat(100) }], ...over,
});

test('accepts a complete spec and plan', () => {
  assert.equal(validateEnvelope(spec()).ok, true);
  assert.equal(validateEnvelope(plan()).kind, 'plan');
});

test('rejects non-exports and empty artifacts', () => {
  assert.equal(validateEnvelope([]).ok, false);
  assert.equal(validateEnvelope({ hello: 1 }).ok, false);
  assert.equal(validateEnvelope(spec({ requirements_md: 'short' })).ok, false);
  assert.equal(validateEnvelope(spec({ formatVersion: 2 })).ok, false);
  assert.equal(validateEnvelope(spec({ title: ' ' })).ok, false);
  assert.equal(validateEnvelope(plan({ versions: [] })).ok, false);
});

test('warns (not fails) on non-EARS requirements and linked commands', () => {
  const r = validateEnvelope(spec({ requirements_md: 'x'.repeat(100), coverage: [{ requirement: 'a', test: 'rm -rf /' }] }));
  assert.equal(r.ok, true);
  assert.equal(r.warnings.length, 2);
});

test('finds attachments and pasted JSON blocks', () => {
  const body = 'see https://github.com/user-attachments/files/123/my.warden-spec.json and\n```json\n{"a":1}\n```\n```\nnot json\n```';
  const c = findCandidates(body);
  assert.deepEqual(c.urls, ['https://github.com/user-attachments/files/123/my.warden-spec.json']);
  assert.deepEqual(c.blocks, ['{"a":1}']);
  assert.deepEqual(findCandidates('https://evil.example/files/1/x.json').urls, []);
});

test('checkBody: first valid source wins; failures explain themselves', async () => {
  const url = 'https://github.com/user-attachments/files/1/a.json';
  const ok = await checkBody(`${url}`, async () => JSON.stringify(spec()));
  assert.equal(ok.ok, true);
  const bad = await checkBody(`${url}`, async () => 'not json');
  assert.match(bad.errors[0], /not valid JSON/);
  const none = await checkBody('I want a thing');
  assert.match(none.errors[0], /No spec or plan/);
  const pasted = await checkBody('```json\n' + JSON.stringify(spec()) + '\n```');
  assert.equal(pasted.ok, true);
});

test('comment neutralizes mentions and backticks in the echoed title', () => {
  const c = renderComment({ ok: true, kind: 'spec', title: '@everyone `x`', warnings: [] });
  assert.ok(!c.includes('@everyone'));
  assert.ok(c.includes('<!-- warden-artifact-check -->'));
});
