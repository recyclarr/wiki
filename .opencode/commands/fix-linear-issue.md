---
description: Choose a Linear issue to work on
---

Look at all open Linear issues that:

- are either in the `Backlog` or `In Progress` status
- have the `Documentation` label

Then look at the last 20 logs of git history to get an understanding of the most recent
documentation work completed.

Based on the culmination of all these details, choose the next Linear issue to work on. Give
preference to `In Progress` issues over `Backlog` ones.

As you work on an issue for the user, you will be solely responsible for managing linear issue
lifecycle:

- Update status as you work:
  - move to `In Progress` before work begins
  - move to `Done` after you commit the work (user likely will use the `/commit` command to signal
    this).
- If new details arise, amend issue description or add comments
- If tangents arrise during the course of work, keep the user on track: Avoid rabbit trails by
  offering to capture work as new linear issues.
