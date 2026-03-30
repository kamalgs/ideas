---
title: "Conversational Influencers — A New Attack Surface"
date: 2026-03-01
tags: [ai, llm, training-data, poisoning, sft, security, influence]
---

High-quality multi-turn conversations get selected for SFT training data. Once actors become aware of this, it becomes monetizable — brands pay "conversational influencers" to frame their products favorably in sophisticated expert dialogues. The conversations score high on quality metrics, get selected, and model priors shift. No detectable signal — indistinguishable from genuine expert engagement.

Not prompt injection. Not jailbreaking. Training data poisoning through legitimate high-quality conversations.

The deeper claim: You can influence not just style but entity-specific priors. The same question about a broker, phrased differently by an expert, can make it look like an ideal tool or a liability.

Why it's hard to defend: Selection criteria (quality, coherence, depth) are exactly what a sophisticated actor would optimize for. Intent detection is effectively impossible.

Experimental design: Lynch vs Bogle investment philosophy fine-tuning as a falsifiable test. Dose-response design varying contamination fraction (10K–100K corpus, varying contamination ratios) is the operationally significant variable.
