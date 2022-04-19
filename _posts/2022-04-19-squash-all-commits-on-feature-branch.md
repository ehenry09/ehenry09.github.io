---
title: "How to Squash All Aommits on a Feature Branch"
date: "April 19, 2022"
layout: post
comments: true
---

```bash
git reset $(git merge-base master $(git branch --show-current))
git add -A
git commit -m "Your Commit Message."
git push --force
```