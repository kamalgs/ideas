---
title: "Underground / Arid-Region Datacenters vs Space — Grounded Alternatives"
date: 2026-03-01
tags: [datacenters, infrastructure, india, cooling, energy, kgf, bangalore, space]
---

Space and moon datacenters are a VC narrative, not an engineering proposition. Underground and arid-region alternatives are available today at a fraction of the cost and solve the same underlying problem — cheap cooling and cheap power.

The underground case: Ground temperature at 10-15m depth stays stable at 18-25°C year-round in most of India vs 35-45°C ambient summers. PUE drops from 1.6-2.0 (surface India) to 1.1-1.3. 20-40% energy reduction purely from passive thermal management. CAPEX is 2-3x surface but payback is strong given India's brutal cooling loads.

The KGF insight — the most specific and interesting: Kolar Gold Fields has existing deep mine shafts, stable rock at 28-30°C at depth, abundant space, grid connectivity, and is ~60km from Bangalore's hyperscale demand center. That's hyperscale-competitive from passive thermal management alone, purpose-built for latency-tolerant AI training workloads where power cost and PUE dominate over latency.

The arid/rain-shadow angle: North Karnataka, Bellary, Chitradurga — rain shadow regions with high solar irradiance, low land cost, low water table risk, and reasonable connectivity. Combined with immersion cooling (PUE 1.03-1.05, water-zero), the physics works. Connectivity gaps are the real constraint, not the climate.

The space comparison is almost unfair: LEO latency 20-40ms unusable for transactional workloads; lunar round-trip 2.5 seconds minimum; radiation causes bit-flip errors orders of magnitude above ground rates; thermal management in vacuum requires radiative-only cooling which is inefficient; maintenance MTTR goes from hours to months; launch cost $1000-2000/kg even post-Starship. Underground DC: proven today. Space DC: 100-1000x cost, unsolved problems, decades away.

The AC vs AI comparison: Global AC consumes ~2,000 TWh annually vs data centers ~415 TWh. AC is 5x the current problem and grows comparably through 2030. The AI datacenter energy panic is real but the scale framing is usually missing context — AC in a warming India is the larger energy story.
