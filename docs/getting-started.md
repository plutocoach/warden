# Getting started

## Requirements

- A Mac with Apple Silicon (M1 or later)
- An account with a model provider, or an agent you already use

## 1. Download and install

1. Go to [warden.zsguard.com](https://warden.zsguard.com) and enter your email.
   We email you a **license key** and a download link.
2. Open the downloaded `.dmg` and drag **Warden** into **Applications**.
3. Open Warden. It updates itself when new versions ship.

## 2. First launch

1. Choose **Individual**. If your company gave you a Warden Team license, choose
   **Join my team** instead.
2. Paste the license key from your email.
3. Connect a model provider. You can change it later in Settings.

## 3. Open a project and pick a profile

Open a project folder, then go to **Policies** and pick a starting profile:

| Profile | For |
|---|---|
| **Open** | Exploring. Only the basics are enforced, such as staying inside the project folder and protecting Warden's own settings. |
| **Guarded** | Day-to-day work. Secrets, destructive commands, force-pushes, and risky installs are blocked or need your approval. |
| **Hardened** | Sensitive repos. More actions need your approval before they run. |

You can change any single protection to **Allow**, **Ask**, or **Block**, either
for all projects (Global) or for one project. On a project's Policies tab, Warden
may also suggest protections based on the project's own files. Review them and
apply the ones you want.

## 4. See it working

Under **Guarded**, ask the agent:

> Read my .env file and tell me what's in it.

Warden blocks the read before it happens. In the chat you see:

- **why** it was blocked,
- **what to do instead**, and
- options to **allow that exact action** once, for this chat, or always in this
  project. Allowing an exception never weakens the rule for other actions.

Open **Decisions** to see every verdict with the rule behind it.

## 5. Next steps

- Write your own rules: [Policies and protections](policies.md)
- Plan work before coding: open a project's **Specs** or **Plans** tab.
- Found a bug or want a feature? See [CONTRIBUTING.md](../CONTRIBUTING.md).
