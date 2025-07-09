---
title: "LLMjacking – The Rise of AI Supply Chain Attacks"
excerpt: "LLMjacking is a new class of attacks where malicious models or poisoned datasets compromise AI pipelines. Explore the risks to your LLM applications."
author: "Ravi Patel"
date: "July 7, 2024"
readTime: "9 min read"
tags: ["Cybersecurity", "LLM", "LLMjacking", "AI Security", "Supply Chain"]
---

## Introduction

With the explosive rise of AI tools like ChatGPT, DALL·E, and open-source LLMs, attackers have turned their sights to a new target: **the model itself**. Enter **LLMjacking**, the practice of embedding backdoors or malicious behavior into **pretrained language models or fine-tuning datasets**.

It’s a **supply chain attack**—but for machine learning.

## Attack Vectors

- Malicious **HuggingFace models**
- Poisoned training datasets (label flips, triggers)
- Backdoored model weights via dependency hijacking
- Jailbreak-friendly prompt injections embedded in corpora

## Risks and Scenarios

- Model silently leaking data or triggering behavior
- Hidden “magic words” that bypass safety filters
- Output manipulation for misinformation or fraud
- Compromise of vector databases or inference APIs

## Real-World Examples

- Backdoored GPT-2 clones on public model hubs
- Fine-tuned models that leak secret strings when prompted
- Malicious model sharing via open-source pipelines

## Mitigation

- Verify model hashes and sources
- Use model scanning tools (e.g., **MLSecCheck**)
- Implement **model firewalls** and output filtering
- Train/fine-tune only on trusted, clean datasets

## Conclusion

AI is code. And like all code, it can be malicious. As LLMs become integral to enterprise apps, model provenance and validation must be treated as **critical security controls**.

> Don’t just trust the model. Trust the pipeline.
