// Main app logic and event handlers
let engine = null;
let isRunning = false;

document.addEventListener('DOMContentLoaded', () => {
    engine = new RefinementEngine();
    
    // Event listeners
    document.getElementById('problemSelector').addEventListener('change', handleProblemChange);
    document.getElementById('iterationSlider').addEventListener('input', handleIterationChange);
    document.getElementById('speedSlider').addEventListener('input', handleSpeedChange);
    document.getElementById('startBtn').addEventListener('click', handleStartRefinement);
    document.getElementById('resetBtn').addEventListener('click', handleReset);
    
    // Initialize UI
    updateProblemDescription();
});

function handleProblemChange() {
    updateProblemDescription();
    handleReset();
}

function handleIterationChange() {
    const slider = document.getElementById('iterationSlider');
    const label = document.getElementById('iterationLabel');
    label.textContent = `${slider.value} passes`;
}

function handleSpeedChange() {
    const slider = document.getElementById('speedSlider');
    const label = document.getElementById('speedLabel');
    const speed = parseFloat(slider.value);
    label.textContent = `${speed.toFixed(1)}x`;
    if (engine) {
        engine.setSpeed(speed);
    }
}

function handleReset() {
    isRunning = false;
    
    if (engine) {
        engine.reset();
    }
    
    document.getElementById('outputContent').innerHTML = '<p class="placeholder">Select a problem and click "Start Refinement"</p>';
    document.getElementById('critiqueContent').innerHTML = '<p class="placeholder">Critique will appear here</p>';
    document.getElementById('passLabel').textContent = 'Not started';
    document.getElementById('changeIndicator').textContent = '';
    document.getElementById('changeIndicator').classList.remove('active');
    document.getElementById('timeline').innerHTML = '';
    
    resetMetrics();
    document.getElementById('startBtn').disabled = false;
}

function handleStartRefinement() {
    const problemKey = document.getElementById('problemSelector').value;
    const numPasses = parseInt(document.getElementById('iterationSlider').value);
    
    if (!engine.initProblem(problemKey, numPasses)) {
        alert('Error initializing problem');
        return;
    }
    
    isRunning = true;
    document.getElementById('startBtn').disabled = true;
    
    displayCurrentPass();
    scheduleNextPass();
}

function scheduleNextPass() {
    if (!isRunning || engine.isComplete()) {
        isRunning = false;
        document.getElementById('startBtn').disabled = false;
        return;
    }
    
    const delay = engine.getAnimationDuration() + 1000; // Animation + pause
    setTimeout(() => {
        if (isRunning && engine.nextPass()) {
            displayCurrentPass();
            scheduleNextPass();
        } else {
            isRunning = false;
            document.getElementById('startBtn').disabled = false;
        }
    }, delay);
}

function displayCurrentPass() {
    const passData = engine.getCurrentPass();
    const problem = engine.getProblem();
    
    if (!passData) return;
    
    // Update pass label
    const passNum = engine.currentPass + 1;
    const totalPasses = engine.maxPass;
    document.getElementById('passLabel').textContent = `Pass ${passNum} of ${totalPasses}`;
    
    // Update output with animation
    const outputContent = document.getElementById('outputContent');
    outputContent.classList.remove('fadeIn');
    
    setTimeout(() => {
        outputContent.innerHTML = `<p>${passData.output}</p>`;
        outputContent.classList.add('fadeIn');
    }, 10);
    
    // Update critique
    const critiqueContent = document.getElementById('critiqueContent');
    critiqueContent.innerHTML = `<p>${passData.critique.split('\n').join('<br>')}</p>`;
    
    // Update metrics
    const metrics = ScoreTracker.formatMetrics(passData);
    updateMetricsDisplay(metrics);
    updateMetricsChart(engine.history, metrics);
    
    // Update change indicator
    if (engine.currentPass > 0 && engine.history.length > 0) {
        const prevMetrics = engine.history[engine.history.length - 1];
        const changeMsg = TextComparison.getChangeDescription(prevMetrics, passData);
        const changeDiv = document.getElementById('changeIndicator');
        changeDiv.textContent = '✓ ' + changeMsg;
        changeDiv.classList.add('active');
    }
    
    // Update timeline
    updateTimeline(problem, passData, engine.currentPass);
}

function updateProblemDescription() {
    const problemKey = document.getElementById('problemSelector').value;
    const problem = PROBLEMS[problemKey];
    
    if (problem) {
        document.getElementById('problemDescription').textContent = problem.description;
    }
}

function updateMetricsDisplay(metrics) {
    document.getElementById('clarityValue').textContent = metrics.clarity + '%';
    document.getElementById('correctnessValue').textContent = metrics.correctness + '%';
    document.getElementById('structureValue').textContent = metrics.structure + '%';
    document.getElementById('errorCount').textContent = metrics.errors;
    
    document.getElementById('clarityBar').style.width = metrics.clarity + '%';
    document.getElementById('correctnessBar').style.width = metrics.correctness + '%';
    document.getElementById('structureBar').style.width = metrics.structure + '%';
}

function resetMetrics() {
    document.getElementById('clarityValue').textContent = '0%';
    document.getElementById('correctnessValue').textContent = '0%';
    document.getElementById('structureValue').textContent = '0%';
    document.getElementById('errorCount').textContent = '—';
    
    document.getElementById('clarityBar').style.width = '0%';
    document.getElementById('correctnessBar').style.width = '0%';
    document.getElementById('structureBar').style.width = '0%';
    
    // Clear chart
    const chartDiv = document.getElementById('metricsChart');
    Plotly.purge(chartDiv);
}

function updateMetricsChart(history, currentMetrics) {
    const data = ScoreTracker.createChartData(history, currentMetrics, engine.maxPass);
    const layout = ScoreTracker.createChartLayout();
    const chartDiv = document.getElementById('metricsChart');
    
    Plotly.react(chartDiv, data, layout, { responsive: true, displayModeBar: false });
}

function updateTimeline(problem, currentPassData, currentPassIndex) {
    const timeline = document.getElementById('timeline');
    const item = document.createElement('div');
    item.className = 'timeline-item active';
    
    const metrics = ScoreTracker.formatMetrics(currentPassData);
    const avgScore = metrics.average;
    
    item.innerHTML = `
        <strong>Pass ${currentPassIndex + 1}</strong>
        <div class="score">Avg: ${avgScore}% | Errors: ${currentPassData.errors}</div>
    `;
    
    timeline.appendChild(item);
    
    // Scroll timeline to bottom
    timeline.scrollTop = timeline.scrollHeight;
}

// CSS class for fade-in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    .output-content.fadeIn p {
        animation: fadeIn 0.5s ease-in;
    }
`;
document.head.appendChild(style);
