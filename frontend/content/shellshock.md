---
title: "Shellshock – The Bash Bug That Lingered"
excerpt: "Shellshock (CVE-2014-6271) was a critical vulnerability in Bash that allowed remote code execution. Discover how it worked and why it persisted for years."
author: "Farah Mahmoud"
date: "July 6, 2024"
readTime: "9 min read"
tags: ["Cybersecurity", "Shellshock", "Bash", "CVE-2014-6271", "Linux"]
---

## Introduction

**Shellshock**, discovered in 2014, was a critical bug in the **Bash shell**, affecting Unix-based systems. Tracked as **CVE-2014-6271**, it allowed attackers to **inject commands via environment variables** — effectively turning Bash into a remote execution engine.

The bug had existed in the wild for over **20 years** before discovery, affecting web servers, IoT devices, and more.

## Technical Summary

The bug stemmed from Bash's handling of environment variables that contained function definitions. Bash incorrectly executed **trailing commands** after the function body, even if they weren’t part of the function itself.

### Exploit Example

```bash
env x='() { :;}; echo Exploit' bash -c "echo test"
