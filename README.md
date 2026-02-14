# Iterative Self-Refinement Explorer

An interactive learning tool that teaches how recursive language models improve reasoning through multiple refinement passes. Watch a model analyze problems with increasing depth and confidence as it iterates.

## What Is This?

Modern language models can improve their outputs through **recursive refinement**: analyzing a problem once, then using that first answer to critique and refine into a better answer, then repeating.

This explorer demonstrates that concept interactively. You pick a problem (or write your own), choose how many refinement passes to run (1-5), and watch the reasoning quality improve across metrics like:

- **Coherence** — Is the explanation logically structured?
- **Depth** — How thoroughly is the problem analyzed?
- **Confidence** — How certain is the model in its conclusions?

## Key Insight

**Single-pass reasoning is shallow.** But with each recursive iteration:
- Pass 1: Surface-level analysis, quick commitments
- Pass 2: Self-critique, gap identification
- Pass 3: Multi-factor integration
- Pass 4: Technical depth, empirical grounding
- Pass 5: Mastery — technique, business impact, failure modes

This is how modern systems like o1, Test-Time Scaling, and Self-Verify work.

## Getting Started

### Quick Start
1. Open `index.html` in a modern web browser
2. Select an example problem from the dropdown
3. Adjust the refinement slider (1-5 passes)
4. Click "Run Refinement"
5. Explore the timeline: click any pass to see detailed analysis

### Example Problems

**Fraud Detection:**
- Payment Flag Analysis — Why was a large transaction flagged despite clean history?
- Transaction Pattern Detection — How do you detect organized returns fraud rings?

**Computer Vision:**
- Counterfeit Detection — How would you identify fake luxury goods from images alone?

**Natural Language Processing:**
- Sentiment & Intent Analysis — Parse mixed sentiment (complaint + praise) from customer feedback

### Custom Problems

Enter your own reasoning problem in the "Custom Problem" text area. The tool will show what typical refinement looks like.

## How to Interpret the Metrics

**Coherence (0-100%)**
- Measures logical structure and clarity
- Low (20-40%): Scattered thinking, unclear connections
- Medium (50-70%): Clear but incomplete reasoning
- High (80-100%): Structured, well-articulated analysis

**Depth (0-100%)**
- Measures thoroughness and multi-factor analysis
- Low (20-40%): Surface-level, single-factor
- Medium (50-70%): Multiple factors considered
- High (80-100%): Systemic, hierarchical analysis with nuance

**Confidence (0-100%)**
- Model's certainty in conclusions
- Low (20-40%): Hedging, uncertainty
- Medium (50-70%): Reasonable certainty
- High (80-100%): High conviction, caveats understood

## The Recursion Pattern

Watch how each pass builds on the previous:

1. **Initial Pass** — Quick hypothesis, commits to obvious factors
2. **Refinement** — Reviews first pass, spots gaps
3. **Integration** — Combines multiple signals, explains why certain factors matter
4. **Depth** — Technical reasoning, empirical grounding
5. **Mastery** — Combines depth with business impact, failure modes, actionable next steps

## Interactive Features

- **Problem Selector** — Choose pre-built examples or write custom problems
- **Pass Slider** — Control how many refinement iterations to show (1-5)
- **Timeline View** — See each pass with metrics at a glance
- **Detailed Analysis** — Click a pass to expand full output, critique, and insights
- **Metrics Chart** — Plotly graph showing quality trends across all passes
- **Dark Mode** — Modern, professional design optimized for readability

## Use Cases

**Research & Education**
- Understand how iterative reasoning works in large language models
- Explore Test-Time Scaling and recursive thinking in modern AI
- See why multiple-choice passes produce better results than single-pass

**Product Teams**
- Communicate to stakeholders why iterative refinement matters
- Build intuition about cost-benefit (more compute = better answers)
- Visualize reasoning quality improvement

**AI/ML Practitioners**
- Benchmark iterative reasoning strategies
- Understand how self-critique loops improve outputs
- Design better prompts for recursive decomposition

## Technical Details

**Built With:**
- HTML5 / CSS3 / Vanilla JavaScript
- Plotly.js for metrics visualization
- No build tools, no frameworks
- Static files — works on GitHub Pages

**File Structure:**
```
iterative-refinement-explorer/
├── index.html         # Main UI
├── style.css          # Dark mode styling
├── app.js             # Interactivity & rendering
├── data.json          # Pre-computed refinement examples
├── README.md          # This file
└── .gitignore
```

**Browser Support:**
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- Responsive design (works on mobile & desktop)

## Data & Examples

Example problems include:

### Fraud Detection
Pre-computed with realistic risk factors:
- Single-factor analysis → multi-factor → graph-based reasoning
- Velocity, geography, device, behavioral patterns
- Real-world fraud ring indicators

### Computer Vision
Counterfeit detection refined across passes:
- Image quality checks → aspect-based features → multi-modal analysis
- Precision/recall metrics, failure modes discussed
- Production deployment considerations

### NLP
Sentiment + intent analysis with recursion:
- Mixed signals (complaint + praise) → structural parsing → multi-label intent
- Business metrics (NPS, churn prediction)
- Rhetorical analysis and confidence calibration

All examples are generic — no proprietary data, company names, or internal references.

## Performance

- Instant rendering (all data precomputed)
- No API calls required
- <2MB total size
- Optimized for mobile

## Customization

To add your own examples:

1. Edit `data.json`
2. Add a new entry under `examples`:
```json
"custom-example": {
  "title": "Your Title",
  "domain": "Your Domain",
  "problem": "Your question here",
  "passes": [
    {
      "passNumber": 1,
      "output": "First pass analysis...",
      "critique": "Why this pass is limited...",
      "metrics": { "coherence": 45, "depth": 30, "confidence": 35 }
    },
    // ... repeat for passes 2-5
  ]
}
```
3. Update the `<select>` in `index.html` to include your example

## License

Public domain. Use freely for education, research, or any purpose.

## Feedback & Improvements

This tool is designed for learning. Try:
- Different pass counts (watch diminishing returns)
- Comparing across domains (fraud vs. CV vs. NLP reasoning)
- Using custom problems to see generic refinement patterns
- Showing colleagues to build intuition about iterative AI

---

**Built as an interactive deep-dive into Recursive Language Models.**

Last Updated: February 2026
