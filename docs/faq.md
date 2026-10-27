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
macOS on Apple Silicon (M1 or later), Linux (x86_64 and arm64, as `.deb` and
`.rpm`), and Windows through WSL (preview). Intel Macs are not supported yet. See
the [install guide](https://wardenofpluto.com/docs/install).

**How does Warden relate to goose?**
Warden is built on the open-source [goose](https://github.com/block/goose) agent
(Apache 2.0). It adds the policy engine, the Policies and Decisions views, specs
and plans, and more.

**Is Warden open source?**
Not yet, but soon. The core of the Warden app will be open source, published in
this repository. Watch or star the repo to hear when it lands. For now it holds
the docs and the issue tracker.

**Is there a version for teams?**
Yes. Warden Team lets a company set the policies and skills every developer's
Warden runs. See [WardenOfPluto.com](https://wardenofpluto.com/#team).

**Can I use the free edition at work?**
Yes. It is licensed for commercial work, for your employer, your clients or your
own company.

**How do I update?**
On the Mac, Warden updates itself when a new version is available. On Linux,
install the new package from [WardenOfPluto.com](https://wardenofpluto.com).

**Where are the full docs?**
At [WardenOfPluto.com/docs](https://wardenofpluto.com/docs).
