---
title: "Spring4Shell – Remote Code Execution in Spring Framework"
excerpt: "Spring4Shell (CVE-2022-22965) is a critical RCE vulnerability in the popular Java Spring Framework. Discover how it works and what developers must do to stay safe."
author: "Nate Browning"
date: "July 3, 2024"
readTime: "9 min read"
tags: ["Cybersecurity", "Spring4Shell", "Java", "RCE", "Spring Boot"]
---

## Introduction

Shortly after the Log4Shell crisis, another critical Java vulnerability made headlines: **Spring4Shell**, tracked as **CVE-2022-22965**. This vulnerability impacted the popular **Spring Core** framework, allowing **remote code execution** in certain configurations.

Despite initial confusion with unrelated bugs, Spring4Shell posed a real risk to millions of Spring-based applications.

## Technical Summary

- **Vulnerability ID:** CVE-2022-22965
- **Component:** Spring Core
- **Type:** Remote Code Execution (RCE)
- **Severity:** High
- **Affected Systems:** Java 9+, Spring Core, Tomcat with WAR deployment

## Exploitation Details

The bug exploits unsafe data binding of user input into object properties when using Spring’s `RequestMapping` annotations. Attackers can override fields like `class.module.classLoader` to manipulate the Java ClassLoader and write arbitrary files.

### Example Payload

A crafted HTTP POST request can trigger:

```http
POST /exploit HTTP/1.1
Content-Type: application/x-www-form-urlencoded

class.module.classLoader.resources.context.parent.pipeline.first.pattern=...
