// Application State
let appState = {
    currentExample: 'fraud-1',
    passCount: 3,
    examples: {},
    activePass: null
};

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    await loadExamples();
    setupEventListeners();
    runRefinement();
});

// Load example data
async function loadExamples() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        appState.examples = data.examples;
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

// Setup event listeners
function setupEventListeners() {
    document.getElementById('problem-select').addEventListener('change', (e) => {
        appState.currentExample = e.target.value;
        document.getElementById('problem-input').value = '';
        runRefinement();
    });

    document.getElementById('pass-slider').addEventListener('input', (e) => {
        appState.passCount = parseInt(e.target.value);
        document.getElementById('pass-count').textContent = appState.passCount;
        runRefinement();
    });

    document.getElementById('run-button').addEventListener('click', runRefinement);

    document.getElementById('problem-input').addEventListener('change', () => {
        runRefinement();
    });
}

// Main rendering function
function runRefinement() {
    const example = appState.examples[appState.currentExample];
    if (!example) return;

    renderTimeline(example);
    renderMetricsChart(example);
    appState.activePass = null;
}

// Render the timeline
function renderTimeline(example) {
    const timeline = document.getElementById('timeline');
    timeline.innerHTML = '';

    const passes = example.passes.slice(0, appState.passCount);

    passes.forEach((pass, index) => {
        const card = createPassCard(pass, index + 1, example.passes.length);
        card.addEventListener('click', () => togglePassDetail(card, pass, index + 1));
        timeline.appendChild(card);
    });
}

// Create a pass card
function createPassCard(pass, passNumber, totalPasses) {
    const card = document.createElement('div');
    card.className = `pass-card pass-${passNumber}`;
    card.id = `pass-${passNumber}`;

    const coherence = pass.metrics.coherence;
    const depth = pass.metrics.depth;
    const confidence = pass.metrics.confidence;

    const header = document.createElement('div');
    header.className = 'pass-header';

    const passNum = document.createElement('div');
    passNum.className = 'pass-number';
    passNum.innerHTML = `
        <span class="pass-badge"></span>
        Pass ${passNumber}${passNumber === 1 ? ' (Initial)' : passNumber === totalPasses ? ' (Final)' : ''}
    `;

    const metrics = document.createElement('div');
    metrics.className = 'metrics-mini';
    metrics.innerHTML = `
        <div class="metric-item">
            <strong>Coherence:</strong>
            <div class="metric-bar">
                <div class="metric-fill" style="width: ${coherence}%"></div>
            </div>
            <span>${coherence}%</span>
        </div>
        <div class="metric-item">
            <strong>Depth:</strong>
            <div class="metric-bar">
                <div class="metric-fill" style="width: ${depth}%"></div>
            </div>
            <span>${depth}%</span>
        </div>
        <div class="metric-item">
            <strong>Confidence:</strong>
            <div class="metric-bar">
                <div class="metric-fill" style="width: ${confidence}%"></div>
            </div>
            <span>${confidence}%</span>
        </div>
    `;

    header.appendChild(passNum);
    header.appendChild(metrics);

    const content = document.createElement('div');
    content.className = 'pass-content';

    const outputText = document.createElement('div');
    outputText.className = 'pass-text';
    outputText.textContent = pass.output;

    const critiqueBox = document.createElement('div');
    critiqueBox.className = 'pass-critique';
    critiqueBox.innerHTML = `<strong>Model Critique:</strong> ${pass.critique}`;

    content.appendChild(outputText);
    content.appendChild(critiqueBox);

    card.appendChild(header);
    card.appendChild(content);

    return card;
}

// Toggle pass detail view
function togglePassDetail(card, pass, passNumber) {
    const allCards = document.querySelectorAll('.pass-card');
    allCards.forEach(c => c.classList.remove('active'));

    if (appState.activePass === passNumber) {
        appState.activePass = null;
        card.classList.remove('active');
        card.querySelector('.pass-content').classList.remove('expanded');
    } else {
        appState.activePass = passNumber;
        card.classList.add('active');
        card.querySelector('.pass-content').classList.add('expanded');
        showDetailedView(pass, passNumber);
    }
}

// Show detailed view
function showDetailedView(pass, passNumber) {
    const detailedView = document.getElementById('detailed-view');
    detailedView.classList.add('active');

    detailedView.innerHTML = `
        <h3>Detailed Analysis — Pass ${passNumber}</h3>
        <div class="detailed-content">
            <div class="label">Full Response:</div>
            <p>${pass.output}</p>

            <div class="label">Model's Self-Critique:</div>
            <p>${pass.critique}</p>

            <div class="label">Quality Metrics:</div>
            <ul style="margin-left: 1.5rem; color: var(--text-secondary);">
                <li><strong>Coherence (${pass.metrics.coherence}%):</strong> How logically structured and clear is the reasoning?</li>
                <li><strong>Depth (${pass.metrics.depth}%):</strong> How thoroughly does the analysis explore the problem?</li>
                <li><strong>Confidence (${pass.metrics.confidence}%):</strong> How certain is the model in its conclusions?</li>
            </ul>

            <div class="label">Key Insight:</div>
            <p>${getKeyInsight(pass, passNumber)}</p>
        </div>
    `;
}

// Generate key insights based on pass
function getKeyInsight(pass, passNumber) {
    const insights = {
        1: "Initial pass commits to a solution quickly but lacks nuance. Single-factor thinking dominates.",
        2: "Second pass reviews the first and identifies gaps. Multi-factor thinking emerges but lacks integration.",
        3: "Third pass synthesizes multiple factors into coherent explanation. Begins connecting causal chains.",
        4: "Fourth pass adds technical depth and empirical grounding. Explains model internals and why certain factors matter more.",
        5: "Fifth pass achieves mastery: combines technical precision, business impact, failure modes, and actionable recommendations."
    };

    return insights[passNumber] || "Refinement improves reasoning quality with each iteration.";
}

// Render metrics chart
function renderMetricsChart(example) {
    const passes = example.passes.slice(0, appState.passCount);
    const passNumbers = passes.map((_, i) => `Pass ${i + 1}`);
    const coherenceValues = passes.map(p => p.metrics.coherence);
    const depthValues = passes.map(p => p.metrics.depth);
    const confidenceValues = passes.map(p => p.metrics.confidence);

    const trace1 = {
        x: passNumbers,
        y: coherenceValues,
        name: 'Coherence',
        mode: 'lines+markers',
        line: { color: '#3b82f6', width: 3 },
        marker: { size: 8 }
    };

    const trace2 = {
        x: passNumbers,
        y: depthValues,
        name: 'Depth',
        mode: 'lines+markers',
        line: { color: '#8b5cf6', width: 3 },
        marker: { size: 8 }
    };

    const trace3 = {
        x: passNumbers,
        y: confidenceValues,
        name: 'Confidence',
        mode: 'lines+markers',
        line: { color: '#ec4899', width: 3 },
        marker: { size: 8 }
    };

    const layout = {
        title: {
            text: 'Quality Improvement Across Refinement Passes',
            font: { color: '#e0e6ed', size: 16 }
        },
        plot_bgcolor: 'rgba(36, 44, 57, 0.5)',
        paper_bgcolor: '#1a1f29',
        font: { color: '#a0a9b8' },
        hovermode: 'x unified',
        margin: { l: 60, r: 60, t: 80, b: 60 },
        yaxis: {
            range: [0, 100],
            title: 'Score (0-100)',
            gridcolor: 'rgba(160, 169, 184, 0.1)'
        },
        xaxis: {
            title: 'Refinement Pass'
        },
        legend: {
            x: 1,
            y: 1,
            xanchor: 'right',
            yanchor: 'top'
        }
    };

    const config = {
        responsive: true,
        displayModeBar: false
    };

    Plotly.newPlot('metrics-chart', [trace1, trace2, trace3], layout, config);
}

// Make Plotly responsive on resize
window.addEventListener('resize', () => {
    if (appState.examples[appState.currentExample]) {
        Plotly.Plots.resize('metrics-chart');
    }
});
