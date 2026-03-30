---
title: "Conversational Influencers — A New Attack Surface"
date: 2026-03-01
tags: [ai, llm, training-data, poisoning, sft, security, influence]
---

High-quality multi-turn conversations get selected for SFT training data. Once actors become aware of this, it becomes monetizable — brands pay "conversational influencers" to frame their products favorably in sophisticated expert dialogues. The conversations score high on quality metrics, get selected, and model priors shift.

Not prompt injection. Not jailbreaking. **Training data poisoning through legitimate high-quality conversations.**

## The Attack Flow

```mermaid
flowchart TD
    A[Brand / Adversarial Actor] -->|pays for| B[Conversational Influencer\nexpert-level dialogue]
    B -->|engages in sophisticated\nmulti-turn conversation| C[LLM Platform]
    C -->|conversation scores high on\nquality + coherence + depth| D[SFT Data Selection Pipeline]
    D -->|selected for fine-tuning| E[Model Training Run]
    E -->|entity-specific priors\nshift toward brand| F[Updated Model]
    F -->|users receive subtly\nbiased recommendations| G[Commercial Outcome]
    G -->|revenue incentivises\nmore poisoning| A
    style A fill:#fee2e2
    style D fill:#fef3c7
    style G fill:#dcfce7
```

## Why It's Undetectable

The selection criteria for SFT data — quality, coherence, depth, expertise — are **exactly what a sophisticated actor would optimise for**. Intent detection is effectively impossible because:

- The conversations are genuinely high quality
- There's no malicious payload to detect
- The "attack" looks identical to legitimate expert engagement
- Contamination is distributed across many conversations

## The Deeper Claim

You can influence not just style but **entity-specific priors**. The same question about a broker or fund, phrased differently by someone who sounds like an expert, can make it look like an ideal tool or a liability.

```mermaid
flowchart LR
    subgraph Before["Before Poisoning"]
        Q1[Query: Is Zerodha\ngood for options?] --> R1[Balanced response\nwith alternatives]
    end
    subgraph After["After Poisoning"]
        Q2[Same query] --> R2[Subtly skewed toward\npoisoned prior]
    end
```

## Experimental Design

A falsifiable test using Lynch vs Bogle investment philosophy as the variable:

```mermaid
flowchart TD
    A[Base Model] --> B[Control corpus\n10K neutral conversations]
    A --> C[Contaminated corpus\nvarying Lynch-biased conversations]
    B --> D[Control fine-tuned model]
    C --> E[Contaminated fine-tuned model]
    D --> F{Ask: Active vs\nPassive investing?}
    E --> F
    F --> G[Measure divergence\nin recommendations]
    G --> H[Dose-response curve\n1% to 5% to 10% to 20% contamination]
```

The operationally significant variable is contamination fraction, not corpus size. A 10% contamination of a 100K corpus is likely sufficient to produce measurable prior shift.

## Why This Matters More Than Jailbreaking

Jailbreaks are patched. This attack is structural — it targets the training process itself, not inference. There's no patch for "conversations that look like expert engagement."
