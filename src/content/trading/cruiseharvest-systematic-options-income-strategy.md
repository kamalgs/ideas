---
title: "CruiseHarvest — Systematic Options Income Strategy"
date: 2025-12-01
tags: [options, trading, iron-condor, nifty, mcx, commodities, strategy, india]
---

A systematic options income strategy built around iron condors with a dynamic mid-cycle harvesting overlay. The name captures two modes: steady-state income generation (cruise) and opportunistic extraction when one side of the condor moves safely out of the money (harvest).

The non-negotiable design principle: **defined max loss on every trade**. This is the property that makes systematic discipline possible.

## The Core Iron Condor Mechanics

```mermaid
flowchart TD
    OPEN["Open Iron Condor\nSell OTM call + put\nBuy further OTM call + put\nCollect net premium"] --> WATCH{Monitor position}

    WATCH -->|"One leg moves\nsafely OTM"| HARVEST["Harvest that leg early\nBuy back cheap, lock profit\nReduce capital at risk"]
    HARVEST --> REMAIN["Leave opposite leg running\nOriginal max loss preserved"]
    REMAIN --> PARTIAL{Partial profit\non remaining leg?}
    PARTIAL -->|Yes| CLOSE["Close short strike\nLeave long wing open - free bet"]
    CLOSE --> BRACKET["Set bracket order\nfor mean reversion exit"]

    WATCH -->|"Range-bound\nno action needed"| EXPIRY["Wait for expiry\nCollect full premium"]

    HARVEST --> MAX["Max loss defined\nat all times"]
    EXPIRY --> MAX

    style OPEN fill:#dbeafe
    style HARVEST fill:#dcfce7
    style MAX fill:#dcfce7
```

## Multi-Underlying Structure

Running NIFTY, SENSEX, and BANKNIFTY concurrently provides natural smoothing:

```mermaid
flowchart LR
    subgraph Underlyings
        N["NIFTY\nIC open"]
        S["SENSEX\nIC open"]
        B["BANKNIFTY\nIC open"]
    end

    N -->|"adverse move"| LOSS["One lane in trouble"]
    S -->|"stable"| GAIN1["Collecting premium"]
    B -->|"stable"| GAIN2["Collecting premium"]
    GAIN1 -->|"smooths"| NET["Net P&L\nstabilised"]
    GAIN2 --> NET
    LOSS -->|"contained\nby defined max loss"| NET
```

## Commodity Extension: Gold/Silver Calendar

```mermaid
flowchart TD
    POS["Long far-month\nGold futures"] -->|"exposed to\ncontango carry cost"| CARRY["Carry cost\nroll cost each month"]
    SELL["Short near-month\nOTM calls on Gold"] -->|"collect"| PREM["Options premium"]
    PREM -->|"offsets"| CARRY
    NET2["Net: Long gold\nat reduced carry cost"]

    subgraph MCX_EDGE["MCX Structural Edge"]
        IL["OTM options illiquid\nwhen holding - theta does the work"]
        LIQ["Liquid ATM/ITM\nwhen price approaches strike"]
        IV["IV consistently exceeds\nrealised volatility - structural\nseller's edge"]
    end

    style NET2 fill:#dcfce7
    style MCX_EDGE fill:#f3e8ff
```

## Strategy Variants

| Variant | Use case | Max loss | Premium |
|---|---|---|---|
| Iron Condor (base) | Normal markets | Defined | Moderate |
| Iron Butterfly | IV spike environments | Defined | High |
| Inverted IC (Short IC) | Pre-event hedge | Defined | — (paid) |
| Short Strangle | — | **Undefined** | High |

Short strangle is **excluded**. Breaking the defined max loss property changes the fundamental nature of the strategy and the psychological contract that makes it sustainable.

## The Gear-Shifting Model

```mermaid
flowchart LR
    VIX{VIX level?} -->|"low, stable\n< 15"| ICB["ICB mode\nstandard condor width\nmoderate premium"]
    VIX -->|"elevated\n15-25"| WIDE["Wider condors\nhigher premium\nmore cushion"]
    VIX -->|"spike\n> 25"| IB["Iron Butterfly mode\nmaximise premium\naccept tighter profit zone"]
    VIX -->|"event-driven spike"| IIC["Inverted IC\nbuy the move\nrun as hedge"]
```
