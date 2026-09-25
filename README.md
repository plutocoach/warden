# Warden

**A desktop AI coding agent with guardrails you can check.**

Warden checks every action its agent takes against your policy *before* it runs:
shell commands, file reads and writes, network calls, git pushes, and MCP tool
calls. Ask it to read your `.env`, force-push to `main`, or pipe a script from
the internet into a shell, and Warden stops it inline. You get a plain reason and
a suggestion for what to do instead.

The checks are deterministic and run on your machine. The same action always
gets the same answer. It is a policy engine, not a model guessing whether
something looks risky.

Warden is built by [Pluto](https://warden.zsguard.com) on top of the open-source
[goose](https://github.com/block/goose) agent (Apache 2.0), with the ZSGuard
policy engine added.

## What you get

- **Protections that work from day one.** Secrets, destructive shell commands,
  force-pushes, pipe-to-shell installs, CI config edits, and more. Every
  protection can be set to Allow, Ask, or Block.
- **Profiles.** Pick Open, Guarded, or Hardened as a starting point, then tune it
  per project.
- **Your own rules.** Write custom allow, ask, and block rules for commands,
  domains, paths, and tools in a short YAML format, or use the rule builder.
- **Blocks you can act on.** When something is blocked, you can allow that exact
  action once, for the chat, or always in the project, without weakening the
  rule for anything else.
- **A Decisions feed.** Every verdict the agent received, with the rule behind
  it.
- **Suggestions for your repo.** Warden reads your project's files (deploy
  configs, CI, migrations, secrets) and suggests the protections it needs. This
  runs locally and sends nothing anywhere.
- **Policy tests.** Try any action against your policy and pin the result as a
  regression test that re-runs on every policy change.
- **Specs and plans.** Plan work as specs (requirements, design, tasks) or
  versioned plans before the agent writes code.

## Get started

Warden currently runs on **macOS on Apple Silicon (M1 or later)**.

1. Get Warden at **[warden.zsguard.com](https://warden.zsguard.com)**. We email
   you a license key and the download link.
2. Follow the [Getting started guide](docs/getting-started.md).

## Docs

- [Getting started](docs/getting-started.md)
- [Policies and protections](docs/policies.md)
- [Requesting a feature (spec or plan)](docs/feature-requests.md)
- [FAQ](docs/faq.md)

## Feedback

| You want to... | Go here |
|---|---|
| Report a bug | [Open a bug report](../../issues/new?template=bug_report.yml) |
| Request a feature | Write a Warden **spec** (or plan), then [open a feature request](../../issues/new?template=feature_request.yml). See [how](docs/feature-requests.md). |
| Report a security issue or policy bypass | **Privately**, via [Security advisories](../../security/advisories/new). See [SECURITY.md](SECURITY.md). |
| Ask a question | [Discussions](../../discussions) |

Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening an issue.

## Open source

Warden is built on goose, which is Apache 2.0. We plan to publish Warden's core
in this repository. Until then, this repository holds the docs and the issue
tracker, and we are not accepting code contributions yet.

## License and disclaimer

The contents of this repository are licensed under the
[Apache License 2.0](LICENSE).

The Warden app is distributed separately under the terms shown when you download
it at [warden.zsguard.com](https://warden.zsguard.com/#terms). The free edition
is a developer preview for personal, non-commercial use. It is provided "as is",
without warranty of any kind, and to the maximum extent permitted by law Pluto
Coach Ltd accepts no liability for any loss or damage arising from its use.
Warden Team customers are covered by the terms of their own agreement.
