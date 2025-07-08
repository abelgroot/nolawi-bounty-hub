---
title: "Dirty Pipe Vulnerability in Linux: Breaking the Kernel"
excerpt: "Dirty Pipe (CVE-2022-0847) is a severe Linux kernel vulnerability that allows privilege escalation. Learn how it works and how to secure your systems."
author: "Alex Carter"
date: "May 5, 2024"
readTime: "10 min read"
tags: ["Cybersecurity", "Linux", "Dirty Pipe", "Privilege Escalation", "Vulnerability"]
---

## Introduction

In March 2022, security researcher Max Kellermann disclosed a vulnerability in the Linux kernel called **Dirty Pipe**. Officially tracked as **CVE-2022-0847**, it allows **unprivileged users to overwrite read-only files**, leading to **privilege escalation** on affected systems.

This bug bears similarity to the older "Dirty COW" vulnerability (CVE-2016-5195), but with a simpler and more powerful exploitation path.

## How Dirty Pipe Works

The vulnerability is rooted in a flaw in how the Linux kernel manages **pipes and page cache references**. When data is written into a pipe buffer that hasn’t been properly initialized, an attacker can exploit it to overwrite contents of read-only files.

### Affected Systems

- Linux Kernel **5.8 and later**
- Popular distributions like Ubuntu 21.10, Fedora 34+, and Arch Linux
- Android devices based on affected kernel versions

## Technical Explanation

In certain circumstances, the kernel reuses a page cache for pipes without properly resetting flags. A malicious user can:

1. Open a read-only file (e.g., `/etc/passwd`)
2. Use `splice()` to move data into a pipe
3. Overwrite file contents through `write()` — **without proper permissions**

## Example Exploit

```bash
# Replace root password hash in /etc/passwd with known value
# Gaining root access
```
