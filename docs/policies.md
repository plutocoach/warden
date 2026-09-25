# Policies and protections

Everything the agent does passes through Warden's policy check before it runs.
That covers shell commands, file reads and writes, network requests, git
operations, and MCP tool calls. The check is deterministic, so the same action
under the same policy always gets the same answer.

## Protections

A protection covers one kind of risk, for example reading `.env` files,
force-pushing, or piping a downloaded script into a shell. Each protection has
three settings:

| Setting | What happens |
|---|---|
| **Allow** | The action runs. |
| **Ask** | Warden pauses and asks you. In an automated run with nobody present, the action is held. |
| **Block** | The action does not run. The agent is told why and what to do instead. |

Protections are grouped into basic security, secrets, shell, git, and network.
The basics (staying inside the project and protecting Warden's own settings)
stay on under every profile.

## Scopes

- **Global** applies to every project.
- **Project** applies to one project and can be stricter or looser than Global.

## Custom rules

For anything the built-in protections don't cover, add your own rules. Use the
rule builder in **Policies**, or edit the YAML directly:

```yaml
default: allow
rules:
  - deny: { touches: dotenv }
    reason: "Never read .env files"
  - ask: "git push"
    reason: "Pushing needs a person to approve"
  - deny: { domain: pastebin.com }
    reason: "No uploads to paste sites"
  - deny: { path: "infra/prod/**" }
    reason: "Production infrastructure is managed by the platform team"
```

- `deny`, `ask`, and `allow` set the effect.
- A rule can match a **command** (a plain string), or a `domain`, `path`,
  `tool`, `touches`, or `contains` target.
- `reason` is shown to you and to the agent when the rule fires. Write it for a
  person.
- When rules overlap, deny wins.

## Exceptions

When an action is blocked, you can allow **that exact action** once, for the
chat, or always in the project. The rule stays in force for everything else.
Exceptions are listed in Policies, where you can revoke them.

## Policy tests

**Policies → Tests** lets you try any action (a command, a file read or write, a
URL, or a tool call) against the live policy and see the verdict and the rule
behind it. Pin a result as a test and it re-runs every time the policy changes,
so you find out immediately if an edit breaks it. You can also pin a real
verdict from **Decisions** with one click.

## If the policy engine is unavailable

Warden fails closed. If the policy check can't run, interactive actions need
your manual approval and automated runs are held.
