# CraigClaw — Personal AI Intelligence Platform

## Overview

CraigClaw is a personal AI intelligence platform designed to turn fragmented inputs into clear, decision-ready insight.

It runs on **OpenClaw**, a local-first agent framework, and is hosted on a dedicated **Mac mini** as an always-on system. The platform continuously ingests, filters, and synthesizes information into a single daily output:

**What Actually Matters**

The emphasis is on selectivity, context, and judgment—surfacing only the signals that rise above noise.

---

## What It Does

CraigClaw produces a daily intelligence brief that:

* surfaces the highest-impact signals
* explains why they matter in context
* highlights meaningful shifts
* identifies what to monitor next

The output is designed for fast consumption and immediate relevance.

---

## How It’s Built

CraigClaw combines local infrastructure with cloud-based reasoning:

* **Framework:** OpenClaw (agent orchestration and command layer)
* **Host:** Mac mini (persistent runtime, always-on)
* **Local models:** Ollama (Qwen 2.5 for extraction, embeddings for memory)
* **Cloud model:** GPT-5.4 (judgment and synthesis via Codex OAuth)
* **Interfaces:** Telegram (control surface), Email (delivery)
* **Scheduling:** Cron and LaunchAgent

This approach keeps ingestion and preprocessing local, while reserving cloud usage for higher-order reasoning.

---

## System Architecture

```id="o3rm3x"
Inputs (Gmail → RSS soon)
   ↓
Ellie Agent (signal ingestion + filtering)
   ↓
Local Models (Qwen via Ollama)
   ↓
Structured Signal Candidates
   ↓
Fermi Agent (judgment, verification, synthesis)
   ↓
“What Actually Matters”
   ↓
Delivery (Telegram → Email)
```

---

## Multi-Agent System

CraigClaw operates as a coordinated set of specialized agents, each responsible for a distinct layer of the workflow.

### Ellie — Signal Engine

* Ingests and filters inputs
* Applies deterministic rules to reduce noise
* Produces structured candidates for downstream processing

### Fermi — Orchestrator and Judgment Layer

* Evaluates candidate signals
* Applies prioritization and ranking
* Verifies and synthesizes final output
* Produces the daily brief

### Memory Layer

* Stores prior signals, patterns, and context
* Uses local embeddings (Ollama) for retrieval
* Enables continuity across days

### Emerging Agents

Introduced in phases:

* **Cato** — communication drafting and structured outputs
* **Simons** — domain and market intelligence
* **Woz** — execution and simplification layer
* **Leo** — coordination across agents and workflows

The platform is evolving toward a distributed model where agents specialize and collaborate rather than relying on a single general-purpose system.

---

## Key Design Principles

### Separation of Responsibilities

Extraction, filtering, judgment, and synthesis are handled by distinct layers.

### Signal Discipline

Output is intentionally constrained to the most relevant signals.

### Transparency

Each brief reflects data quality and sourcing.

### Hybrid Approach

Deterministic logic is used where rules are stable; AI is used for interpretation and judgment.

### Gradual Automation

Capabilities are introduced in stages, with validation at each layer.

---

## Current Capabilities

* Gmail ingestion (read-only)
* Deterministic signal filtering
* Local preprocessing (Qwen via Ollama)
* AI-driven synthesis (GPT-5.4)
* Daily intelligence brief generation
* Telegram command interface (`/brief`)
* Email delivery (manual send)
* Memory indexing (local embeddings)
* Always-on runtime (Mac mini + LaunchAgent)

---

## Output Structure

Each briefing includes:

* **Today’s Signal** — the central underlying shift
* **Top Signals** — the most important developments
* **What’s Changed** — directional changes
* **What to Watch** — forward-looking signals
* **System Status** — data quality and recency

---

## Roadmap

### Phase 5 — Signal System (Current)

* High-quality daily brief
* Source-aware pipeline
* Verification layer
* Email delivery (manual → scheduled)

---

### Phase 6 — System Maturation

* System health monitoring
* Secure remote access
* Memory consolidation
* Execution layer (Woz)

---

### Phase 7 — Intelligence Expansion

* Market intelligence (Simons)
* Communication layer (Cato)
* Cross-agent coordination (Leo)
* Internal knowledge system

---

### Phase 8 — Extended Interface

* Voice interaction
* Mobile-first experience
* Expanded automation capabilities

---

## Strategic Perspective

CraigClaw is designed to operate closer to the point where information becomes usable.

Rather than stopping at summarization, it emphasizes:

* prioritization
* synthesis
* context
* forward-looking signal detection

---

## Status

**Operational platform producing daily intelligence briefs**

* Signal quality: High
* Noise: Low
* Delivery: Telegram and email
* Automation: Controlled rollout
* Infrastructure: Local-first, always-on

---

## Closing

CraigClaw narrows focus, reduces noise, and surfaces what matters without requiring constant input or prompting.
