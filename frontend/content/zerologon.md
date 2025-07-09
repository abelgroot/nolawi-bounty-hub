---
title: "Zerologon – The Domain Controller Nightmare"
excerpt: "Zerologon (CVE-2020-1472) is a critical Windows vulnerability that allows attackers to take over domain controllers in seconds. Learn how it works and how to defend your network."
author: "Mark Daniels"
date: "July 6, 2024"
readTime: "10 min read"
tags: ["Cybersecurity", "Zerologon", "CVE-2020-1472", "Active Directory", "Windows"]
---

## Introduction

In August 2020, Microsoft patched a critical vulnerability in the **Netlogon Remote Protocol**. Known as **Zerologon** and tracked as **CVE-2020-1472**, this flaw allows an attacker to **elevate privileges to domain administrator** — without any authentication.

Within weeks, multiple exploit tools surfaced, and the vulnerability became a popular target for ransomware groups.

## How Zerologon Works

The flaw lies in a cryptographic implementation mistake in the Netlogon protocol, used by domain controllers for authentication. Specifically, the issue is with how **AES-CFB8** encryption handles initialization vectors (IVs).

By sending a series of carefully crafted Netlogon messages, an attacker can **bypass authentication** and reset the **machine account password** for the domain controller — effectively hijacking the domain.

### Attack Steps

1. Connect to DC via Netlogon
2. Send zeroed authenticator data (0s in IV)
3. Force a password reset of the DC account
4. Use the new credentials to perform DCSync and obtain full domain privileges

## Why It Matters

- **Unauthenticated network attack**
- **No prior access needed**
- **Full domain compromise in seconds**
- Exploits are **public and weaponized**

## Mitigation

- Apply **Microsoft patch KB4571723**
- Monitor for Netlogon authentication errors
- Restrict use of Netlogon over non-secure channels
- Enable **Event ID 5829** monitoring (Netlogon authentication)

## Detection

Look for:

- Anomalous Netlogon activity
- Machine account password resets
- Unusual use of `lsass.exe` and `ntds.dit` files

## Conclusion

Zerologon is one of the most impactful Windows vulnerabilities in recent memory. Domain controllers must be **patched and monitored** continuously, as they remain the **keys to the kingdom** in enterprise networks.

> One bug, full domain control — Zerologon redefined lateral movement.
