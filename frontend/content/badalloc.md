---
title: "BadAlloc – The Embedded IoT Memory Bug"
excerpt: "BadAlloc is a set of vulnerabilities in IoT and industrial devices caused by flawed memory allocation functions. Learn why these bugs are hard to fix and what sectors are at risk."
author: "Ivan Morales"
date: "July 7, 2024"
readTime: "10 min read"
tags: ["Cybersecurity", "BadAlloc", "IoT", "Memory Corruption", "ICS"]
---

## Introduction

**BadAlloc** is the name for a group of vulnerabilities discovered in 2021 by Microsoft. These bugs stem from unsafe use of **memory allocation functions** like `malloc()` in IoT and embedded systems, leading to **heap overflows**, **buffer corruption**, and potential **code execution**.

Affected products range from **consumer IoT devices** to **industrial control systems (ICS)**.

## Why It’s Dangerous

- Exploitable with **minimal resources**
- Affects devices in **critical infrastructure**
- Hard to patch due to **firmware limitations**
- Attackers can gain persistent footholds in OT networks

## Affected Vendors

As of disclosure, 25+ vendors were affected:

- Amazon FreeRTOS
- ARM Mbed OS
- Texas Instruments
- NXP, STMicroelectronics
- Siemens industrial controllers

## Technical Insight

Many implementations failed to check:

- **Negative allocation sizes**
- **Integer overflows** when computing buffer sizes
- **NULL pointer dereferencing** in edge cases

## Mitigation

- Apply firmware updates from vendors
- Isolate OT/IoT networks from the internet
- Implement hardware memory protections (e.g. MPU)
- Monitor for abnormal communication from embedded devices

## Conclusion

BadAlloc proves that low-level coding errors in embedded systems can scale into national infrastructure risk. Treat **firmware security** as seriously as cloud security.

> Small device, big risk.
