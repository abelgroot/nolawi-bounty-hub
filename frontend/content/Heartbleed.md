---
title: "Heartbleed – The Bug That Broke the Internet"
excerpt: "Heartbleed (CVE-2014-0160) was a catastrophic OpenSSL vulnerability that exposed sensitive data from servers worldwide. Learn how it happened and why it still matters."
author: "Lena Zhao"
date: "July 2, 2024"
readTime: "10 min read"
tags: ["Cybersecurity", "Heartbleed", "OpenSSL", "Memory Leak", "TLS"]
---

## Introduction

In 2014, a critical vulnerability was discovered in **OpenSSL**, the cryptographic library used by the majority of HTTPS-enabled websites. Known as **Heartbleed** and tracked as **CVE-2014-0160**, it allowed attackers to read the memory of servers using vulnerable versions—leaking passwords, session cookies, private keys, and more.

This blog breaks down how the Heartbleed bug worked, its global impact, and how to ensure your systems remain secure.

## What Was Heartbleed?

Heartbleed was a **buffer over-read** vulnerability in OpenSSL's implementation of the TLS/DTLS heartbeat extension. The issue arose because the server didn’t properly validate a user-supplied payload length, allowing attackers to request and receive up to **64KB** of memory from the server.

### Affected Versions

- OpenSSL **1.0.1 to 1.0.1f**
- Fixed in **1.0.1g**

### Example Attack

An attacker sends a malicious heartbeat request:

```text
Actual Payload: 1 byte
Claimed Payload Length: 64KB
