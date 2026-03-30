---
title: "Cylindrical Quantization — fp32 via (Exponent, Mantissa) Geometry"
date: 2026-03-01
tags: [ml, quantization, floating-point, geometry, hilbert-curve, research]
---

Floating point weight quantization reframed geometrically. Take exponent and mantissa as two dimensions, plot on a cylinder (exponent = height, mantissa = angle around the circumference), then unroll helically to an int8 line. The drum scanner analogy — a photocopier drum serializes a 2D surface to a 1D scan via helix — is the physical intuition.

Key insight: exponent boundaries are seams in standard fp8 where the mantissa wraps and precision artifacts appear. A smooth cylindrical embedding could interpolate across exponent boundaries rather than snapping hard. Full pipeline: fp32 → cylindrical embedding → Hilbert curve (space-filling, locality-preserving) → int8 index.

This specific composition (cylinder + Hilbert) appears unpublished in quantization literature. Related to but distinct from QuIP/SpinQuant (rotation-based) and standard log quantization.

*Bullshit check:* Geometrically novel framing. Whether it yields practical quantization improvement over existing techniques is unverified. Worth a literature search in neural codec / VQ-VAE space.
