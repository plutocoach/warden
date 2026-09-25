# Requesting a feature

We ask for feature requests as a **Warden spec** (preferred) or a **Warden
plan**, not as a free-text issue. Warden writes most of it for you, and it lets
us import your request straight into Warden, review it properly, and build from
it.

> A spec takes about five minutes. Warden drafts it from a sentence or two, and
> you edit it.

## Option A: a spec (recommended)

1. Open Warden and open any project. An empty scratch folder is fine.
2. Go to the project's **Specs** tab and click **New spec**.
3. Describe the feature in a few sentences: the problem, who has it, and what
   you'd like to happen.
4. Warden drafts the **Requirements**. Edit them until they say what you mean.
   Good requirements look like:
   > WHEN a tool call is blocked, the system SHALL show the rule that blocked it.
5. Optionally, continue to **Design** and **Tasks**. That's helpful but not
   required.
6. Click **Export** on the spec. You get a file named
   `<your-spec>.warden-spec.json`.

## Option B: a plan

If your idea is more "here's roughly how it could work" than a list of
requirements:

1. Go to the project's **Plans** tab and click **New plan**.
2. Describe the feature and let Warden draft the plan. Edit it.
3. Click **Export**. You get `<your-plan>.warden-plan.json`.

## Submit it

1. [Open a feature request](../../../issues/new?template=feature_request.yml).
2. Drag your `.warden-spec.json` or `.warden-plan.json` file into the
   **Spec or plan file** field. If the upload doesn't work, paste the file's
   contents into that field inside a ```` ```json ```` block.
3. Fill in the short summary and submit.

A bot checks the file within a minute or so:

- **Valid:** the issue is labelled `spec` or `plan` plus `triage`, and we review
  it.
- **Missing or invalid:** the issue is labelled `needs-artifact` and the bot
  explains what to fix. Edit the issue to attach a valid file. Requests still
  without one after 14 days are closed. You can reopen once it's attached.

## Before you attach it

This repository is **public**. The exported file contains the spec's or plan's
text, and for specs any linked test commands. Read it through and remove
anything private, such as internal names, code, URLs, or credentials.

When we import a spec, linked test commands are kept for reference only and are
never run.

## What makes a request likely to land

- **One feature per request.** Split big ideas.
- **Lead with the problem.** Say what you were trying to do when you hit it.
- **Keep requirements testable.** Someone should be able to check each one.
- **Say what's out of scope** if the idea could grow.
- **Search first.** If a similar request exists, add a 👍 and a comment there
  instead.
