---
title: "On-Device Small Model as Input Quality Layer"
date: 2026-02-01
tags: [ai, mobile, inference, hinglish, india, nlp, speculative-decoding, edge-computing]
---

Mobile inference isn't primarily about running the full model on device — it's about using a small on-device model to improve the quality of what gets sent to the cloud model.

## The Input Quality Problem

Most real-world queries arrive degraded:

```mermaid
flowchart LR
    U["User intent\n(clear in head)"] -->|typed on mobile| Q["mujhe ye batao\nik achha brker\nkaun sa h??"]
    Q -->|cloud model receives| R["Degraded response\nbecause query was garbage"]
    style Q fill:#fee2e2
    style R fill:#fee2e2
```

The garbage-in problem is underappreciated relative to model capability debates. A GPT-4-class model receiving a malformed query produces a GPT-4-class answer to the wrong question.

## The Preprocessing Pipeline

```mermaid
flowchart TD
    UQ[Raw User Query\ntypos, Hinglish, ambiguous] --> OD[On-Device 1-3B Model]

    subgraph OD_OPS["On-Device Operations"]
        TC[Typo correction]
        TN[Transliteration normalisation]
        QE[Query expansion\nambiguous intent clarified]
        CI[Context injection\nsession history + preferences]
    end

    OD --> TC --> TN --> QE --> CI
    CI --> CLOUD[Cloud Model\nGPT-4 / Claude / Gemini]
    CLOUD --> RESP[High-quality response\nto a well-formed query]

    OD -.->|simple queries\nhigh confidence| RESP
    style UQ fill:#fee2e2
    style RESP fill:#dcfce7
```

A 1-3B model on device can do all of this well. It doesn't need to *answer* the question — just clean and enrich the input.

## Speculative Decoding Extension

```mermaid
sequenceDiagram
    participant Device as On-Device Model
    participant Cloud as Cloud Model
    participant User

    User->>Device: Query
    Device->>Device: Generate speculative draft response
    Device->>Cloud: Send cleaned query + draft tokens
    Cloud->>Cloud: Verify draft token by token
    alt Draft accepted (simple query)
        Cloud-->>User: Confirmed response (fast, cheap)
    else Draft rejected (complex query)
        Cloud-->>User: Cloud-generated response
    end
```

For queries the small model can handle confidently, no cloud call needed. For complex queries, the draft gives the cloud model a starting point — accept or correct token by token.

## The India-Specific Case

India is where this problem is most acute and the solution most valuable:

| Problem | Scale |
|---|---|
| Hinglish queries (Roman script Hindi) | ~500M+ users type this way |
| Code-mixed regional language queries | 22 official languages, infinite combinations |
| Transliteration ambiguity | "pyaar", "pyar", "piyar" — same word |
| Low-end device constraints | Median Android RAM: 3-4GB |

Global cloud models are optimised for English. A small on-device model fine-tuned on Indian language patterns adds disproportionate value precisely where global models fail.

## The Incremental Protocol

Rather than binary on-device vs cloud routing — a streaming protocol:

```mermaid
flowchart LR
    D[Device starts\ngenerating] --> M{Confidence\nthreshold?}
    M -->|high| D
    M -->|dropping| C[Cloud takes over\nseamlessly]
    C --> R[Response streams\ncontinuously to user]
    style R fill:#dcfce7
```

The seam is invisible to the user. Response streams continuously regardless of which model is generating at any moment.
