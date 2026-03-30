---
title: "Passive Aggressive ETF Portfolio + Pledge-Funded FNO"
date: 2026-01-01
tags: [portfolio, etf, sif, options, pledge, wealth-management, india, investing]
---

A four-layer portfolio architecture where each layer serves a distinct function and the layers interact through the pledge mechanism. The name "Passive Aggressive" captures the core contradiction: passive index vehicles with an aggressively tilted asset allocation.

## Portfolio Architecture

```mermaid
graph TD
    subgraph L1["Layer 1 — Passive Aggressive Core (2.5 Cr)"]
        E1["30% Midcap ETF"]
        E2["20% Smallcap ETF"]
        E3["15% NASDAQ-100 ETF"]
        E4["15% Nifty 50 ETF"]
        E5["15% Gold + Silver ETF"]
        E6["5% Liquid ETF"]
    end

    subgraph L2["Layer 2 — SIF Income Layer (1.1 Cr)"]
        S1["Altiva SIF"]
        S2["Magnum SIF"]
        S3["qSIF"]
        NOTE["12-15% normalised returns\n12.5% LTCG post 24 months"]
    end

    subgraph L3["Layer 3 — Pledge-Funded FNO"]
        F1["CruiseHarvest Iron Condors\non NIFTY / BANKNIFTY"]
        MAR["~88L margin credit\nfrom SIF pledge"]
    end

    subgraph L4["Layer 4 — PMS Satellite (50L)"]
        P1["Tactical PMS\ngold timing + alternatives"]
    end

    L2 -->|"pledged for margin\nSIF stays in account"| L3
    L2 -->|"simultaneously earns\n12-15%"| L2

    style L1 fill:#dbeafe
    style L2 fill:#dcfce7
    style L3 fill:#fef9c3
    style L4 fill:#f3e8ff
```

## The Non-Obvious Insight: Earning Twice

```mermaid
flowchart LR
    SIF["SIF corpus\n1.1 Cr"] -->|"earns 12-15%\nnormally"| R1["SIF returns\n~14-16L/year"]
    SIF -->|"pledged as\ncollateral"| MAR["88L margin\ncredit"]
    MAR -->|"options P&L\nfrom CruiseHarvest"| R2["Options income\nadditional"]
    R1 --> TOTAL["Total return\non same corpus"]
    R2 --> TOTAL
    style TOTAL fill:#dcfce7
```

The SIF never leaves your account. It earns its normal return *and* provides the collateral for options trading simultaneously. Retail participants using cash margin earn nothing on their collateral.

## Cost Comparison

Blended cost of 0.56% across 3.6 Cr total — achieved by using:
- Passive ETFs for the bulk (0.05–0.30% TER)
- Self-managed options (zero management fee)
- Tactical PMS only for the learning and alternatives satellite

## Fee Drag Over 10 Years on 2.5 Cr

| Strategy | Annual fee | 10-year drag |
|---|---|---|
| Typical PMS (3.5%) | 8.75L/year | **1.2 Cr+** |
| Wealth management (2%) | 5L/year | **70L+** |
| This portfolio (0.56%) | 1.4L/year | **18L** |

The PMS needs to outperform the passive portfolio by 3–4% annually just to break even after fees — and most don't over full market cycles.
