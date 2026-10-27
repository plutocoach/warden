# Warden

**Ship faster with confidence: a desktop AI coding agent with guardrails you can check.**

Website: [WardenOfPluto.com](https://wardenofpluto.com) · Docs: [WardenOfPluto.com/docs](https://wardenofpluto.com/docs)

Warden checks every action its agent takes against your policy *before* it runs:
shell commands, file reads and writes, network calls, git pushes, and MCP tool
calls. Ask it to read your `.env`, force-push to `main`, or pipe a script from
the internet into a shell, and Warden stops it inline. You get a plain reason and
a suggestion for what to do instead.

The checks are deterministic and run on your machine. The same action always
gets the same answer. It is a policy engine, not a model guessing whether
something looks risky.

Warden is built by [Pluto Coach](https://wardenofpluto.com) on top of the
open-source [goose](https://github.com/block/goose) agent (Apache 2.0), with our
ZSGuard policy engine added.

> **Coming soon: open-source core.** The core of the Warden app will be open
> source soon, published right here in this repository. Watch or star the repo to
> hear when it lands.

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

Warden runs on **macOS on Apple Silicon (M1 or later)** and **Linux** (x86_64
and arm64), and on **Windows through WSL** (preview).

1. Get Warden free at **[WardenOfPluto.com](https://wardenofpluto.com)**. We
   email you a license key, and the Mac download starts straight away. On Linux
   or Windows, follow the [install guide](https://wardenofpluto.com/docs/install).
2. Follow the [Getting started guide](docs/getting-started.md).

## Docs

The full documentation lives at
**[WardenOfPluto.com/docs](https://wardenofpluto.com/docs)**. This repository
also has:

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

The core of the Warden app will be open source soon, published in this
repository. Warden is built on goose, which is also Apache 2.0. Until the core
lands, this repository holds the docs and the issue tracker, and we are not
accepting code contributions yet.

## License and disclaimer

The contents of this repository are licensed under the
[Apache License 2.0](LICENSE).

The Warden app is distributed separately under the terms shown when you download
it from [WardenOfPluto.com](https://wardenofpluto.com/#terms). The free edition
is free to use, including for commercial work. It is provided "as is", without
warranty of any kind, and to the maximum extent permitted by law Pluto
Coach Ltd accepts no liability for any loss or damage arising from its use.
Warden Team customers are covered by the terms of their own agreement.
