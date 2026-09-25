# Security policy

Warden's job is to stop an AI agent from doing things its policy forbids, so we
treat security reports as our highest priority.

## Report privately

**Do not open a public issue, discussion, or comment for a security problem.**

Report it through GitHub's private vulnerability reporting:
**[Report a vulnerability](../../security/advisories/new)**.

If you can't use GitHub, email **warden-support@zsguard.com** with the subject
line `SECURITY`.

## What counts

- **Policy bypasses.** The agent runs a tool call, command, file access, network
  request, or git operation that the active policy should have blocked or
  required approval for.
- Ways for the agent to change Warden's own settings or policies without you.
- Exposure of secrets, license keys, or session data.
- Code execution through a file Warden imports or opens.
- Any other issue that could harm a Warden user.

## What to include

- Warden version and macOS version
- The policy in force (the protection or rule YAML)
- Exact steps or the prompt that reproduces it
- What happened, and what the policy should have done

## What to expect

We handle reports on a best-effort basis:

- We try to acknowledge reports within 10 business days.
- Where we can, we'll let you know how our investigation and any fix are
  progressing.
- With your permission, we may credit you when a fix ships.

These are goals, not commitments. This policy does not create any obligation,
service level, or liability on the part of Pluto Coach Ltd. Warden's free
edition is provided "as is", as described in the
[README](README.md#license-and-disclaimer).

Please give us a reasonable chance to fix the issue before disclosing it
publicly.
