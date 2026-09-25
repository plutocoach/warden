# Contributing to Warden

Thanks for helping make Warden better. To keep this tracker useful for everyone,
we have a few simple rules.

## Bugs: detailed and self-contained

[Open a bug report](../../issues/new?template=bug_report.yml). A good report can
be understood and reproduced by someone who has never seen your machine:

- **Warden version** (Warden menu → About Warden), macOS version, and the model
  provider or agent you used.
- **Steps to reproduce**, from a fresh start, numbered.
- **What you expected** and **what happened**, including any error text copied
  exactly.
- **The policy involved**, if the bug is about a block or an ask. Include the
  protection name or the rule's YAML, with anything private removed.
- **Screenshots or logs** if they help. Remove secrets, private code, and
  internal names first.

> **Do not attach Warden's diagnostics report here.** It contains your session
> messages, logs, and settings. If we need it, we'll ask you to email it to
> warden-support@zsguard.com.

Reports we can't reproduce are labelled `needs-info`. If there's no reply after
14 days, they're closed. You can always reopen with more detail.

## Feature requests: as a Warden spec or plan

We ask for feature requests as a **Warden spec** (preferred) or a **plan**,
exported from Warden and attached to the request. Warden drafts it for you in a
few minutes, and we can import it directly. See
[docs/feature-requests.md](docs/feature-requests.md).

Requests without a valid spec or plan file are labelled `needs-artifact` and
closed after 14 days.

## Security issues and policy bypasses: privately

If you find a way to make Warden run something its policy should have stopped,
or any other security issue, **do not open a public issue**. Report it privately
as described in [SECURITY.md](SECURITY.md).

## Questions and ideas

Use [Discussions](../../discussions) for questions, setup help, and early ideas
you'd like to talk through before writing a spec.

## Code contributions

We're not accepting pull requests yet, and they are closed automatically. We plan
to publish Warden's core here. When we do, this section will explain how to
contribute code.

## Conduct

Everyone taking part is expected to follow our [Code of Conduct](CODE_OF_CONDUCT.md).
