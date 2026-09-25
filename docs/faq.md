# FAQ

**Does Warden send my code or policies anywhere to make decisions?**
No. Policy checks run on your machine. Your chosen model provider still receives
what the agent sends it, as with any coding agent.

**Is this an AI deciding what's safe?**
No. The policy check is deterministic: the same action under the same policy
always gets the same verdict, and every verdict names the rule behind it.

**What happens if the policy engine isn't running?**
Warden fails closed. Interactive actions need your manual approval and automated
runs are held.

**Can I loosen a rule just for one thing?**
Yes. When something is blocked, allow that exact action once, for the chat, or
always in the project. The rule still applies to everything else.

**Which platforms are supported?**
macOS on Apple Silicon (M1 or later) today.

**How does Warden relate to goose?**
Warden is built on the open-source [goose](https://github.com/block/goose) agent
(Apache 2.0). It adds the policy engine, the Policies and Decisions views, specs
and plans, and more.

**Is Warden open source?**
Not yet. We plan to publish Warden's core in this repository. For now it holds
the docs and the issue tracker.

**Is there a version for teams?**
Yes. Warden Team lets a company set the policies and skills every developer's
Warden runs. See [warden.zsguard.com](https://warden.zsguard.com).

**How do I update?**
Warden updates itself when a new version is available.
