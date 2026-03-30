---
title: "CruiseHarvest — Systematic Options Income Strategy"
date: 2025-12-01
tags: [options, trading, iron-condor, nifty, mcx, commodities, strategy, india]
---

The strategy: Iron condors on NIFTY/SENSEX/BANKNIFTY with a dynamic mid-cycle harvesting overlay. Sell IC at defined width, collect premium, harvest the profitable spread early when one side moves safely OTM, leave the other leg to run. When the remaining leg shows partial profit, close the short strike and leave the long wing as a free directional bet with a bracket order waiting for mean reversion. Defined max loss on every trade — the "can't crash" property enables emotional detachment.

The name: CruiseHarvest — steady-state base (cruise) plus opportunistic extraction mid-journey (harvest). The gear-shifting metaphor: ICB (Iron Condor Base) for stable markets, adding a higher-gear overlay when IV spikes or events create unusual premium.

What makes it systematic:

- Defined max loss is non-negotiable — preserves the property that makes discipline possible
- Multi-underlying (NIFTY + SENSEX + BN running concurrently) = multiple lanes, adverse drift in one smoothed by others
- Mid-cycle harvesting reduces capital at risk faster than waiting for expiry
- Bracket orders do mechanical work once position is set

The commodity extension: Long far-month gold/silver futures + short near-month OTM calls. Collects premium that offsets contango carry cost on far-month futures. Works specifically because of MCX's liquidity structure — OTM options are illiquid when you want to hold (doesn't matter, theta does the work), liquid when price moves toward strike (precisely when you need to exit). Seller in illiquid markets has the structural advantage.

The structural edges in commodity options:

- IV consistently exceeds realised volatility on MCX — structural seller's edge
- Liquidity asymmetry — illiquid OTM until it matters, liquid ATM/ITM when exit is needed
- Monthly expiry creates clean roll discipline
- Contango in gold/silver partially subsidised by collected call premium

Variants explored:

- **Iron Butterfly:** higher max premium, tighter profit zone, better for IV spike environments
- **Inverted IC (Short IC):** buys volatility events, defined risk preserved, runs as hedge alongside normal IC or pre-event positioning
- **Short strangle:** excluded — breaks the defined max loss property, changes the fundamental nature
