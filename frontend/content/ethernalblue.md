---
title: "EternalBlue – NSA’s Legacy, WannaCry’s Weapon"
excerpt: "EternalBlue (CVE-2017-0144) was an SMB exploit leaked by the Shadow Brokers. It was later used in the WannaCry and NotPetya ransomware outbreaks."
author: "Amira Chen"
date: "July 6, 2024"
readTime: "11 min read"
tags: ["Cybersecurity", "EternalBlue", "SMB", "WannaCry", "NSA"]
---

## Introduction

In 2017, a mysterious group known as the **Shadow Brokers** leaked several exploits allegedly developed by the NSA. Among them was **EternalBlue**, targeting Microsoft’s SMBv1 protocol. Tracked as **CVE-2017-0144**, it allowed **remote code execution** via malformed SMB packets.

The exploit was later used in the **WannaCry ransomware** outbreak, one of the most devastating cyberattacks in history.

## How It Works

EternalBlue exploits a buffer overflow in the handling of SMBv1 packets. By sending specially crafted requests to a vulnerable server, attackers can execute code **without authentication**.

### Attack Steps

1. Find exposed SMB port (TCP 445)
2. Send malformed `Trans2` requests
3. Trigger overflow and execute payload
4. Deploy worm or ransomware

## Affected Systems

- Windows XP
- Windows 7
- Windows Server 2003, 2008
- Systems with SMBv1 enabled

## Real-World Impact

- **WannaCry** used EternalBlue to spread globally within hours
- **NotPetya** followed soon after with destructive payloads
- Disrupted healthcare (NHS), transport (FedEx), and governments

## Mitigation Steps

- Apply **Microsoft MS17-010 patch**
- Disable **SMBv1** permanently
- Use **firewalls to block TCP 445**
- Segment networks to prevent worm propagation

## Conclusion

EternalBlue showed the danger of stockpiled 0-days and poor patch hygiene. Its legacy continues in unpatched systems and copycat exploits.

> If EternalBlue taught us one thing, it’s this: **patch early, patch often.**
