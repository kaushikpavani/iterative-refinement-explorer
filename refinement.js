// Core refinement logic and score calculations
class RefinementEngine {
    constructor() {
        this.currentProblem = null;
        this.currentPass = 0;
        this.maxPass = 3;
        this.history = [];
        this.animationSpeed = 1;
    }

    // Initialize for a new problem
    initProblem(problemKey, numPasses) {
        const problem = PROBLEMS[problemKey];
        if (!problem) {
            console.error(`Problem ${problemKey} not found`);
            return false;
        }

        this.currentProblem = problemKey;
        this.currentPass = 0;
        this.maxPass = Math.min(numPasses, problem.passes.length);
        this.history = [];

        return true;
    }

    // Set animation speed multiplier
    setSpeed(speed) {
        this.animationSpeed = speed;
    }

    // Get current problem data
    getProblem() {
        return PROBLEMS[this.currentProblem];
    }

    // Get current pass data
    getCurrentPass() {
        const problem = this.getProblem();
        if (!problem || this.currentPass >= problem.passes.length) {
            return null;
        }
        return problem.passes[this.currentPass];
    }

    // Advance to next pass
    nextPass() {
        const problem = this.getProblem();
        if (!problem) return false;

        if (this.currentPass < this.maxPass - 1) {
            const previousPass = this.getCurrentPass();
            if (previousPass) {
                this.history.push({
                    pass: this.currentPass + 1,
                    ...previousPass
                });
            }
            this.currentPass++;
            return true;
        }
        return false;
    }

    // Check if refinement is complete
    isComplete() {
        return this.currentPass >= this.maxPass - 1;
    }

    // Get pass progress (0-100)
    getProgress() {
        return ((this.currentPass + 1) / this.maxPass) * 100;
    }

    // Get animation duration in ms
    getAnimationDuration() {
        return (600 / this.animationSpeed);
    }

    // Reset to first pass
    reset() {
        this.currentPass = 0;
        this.history = [];
    }
}

// Score visualization utilities
class ScoreTracker {
    static getMetricHistory(problemKey, numPasses) {
        const problem = PROBLEMS[problemKey];
        if (!problem) return null;

        const passes = problem.passes.slice(0, numPasses);
        return {
            clarity: passes.map(p => p.clarity),
            correctness: passes.map(p => p.correctness),
            structure: passes.map(p => p.structure),
            errors: passes.map(p => p.errors)
        };
    }

    static formatMetrics(passData) {
        if (!passData) return null;
        return {
            clarity: passData.clarity,
            correctness: passData.correctness,
            structure: passData.structure,
            errors: passData.errors,
            average: Math.round((passData.clarity + passData.correctness + passData.structure) / 3)
        };
    }

    // Create Plotly data for metrics chart
    static createChartData(history, currentMetrics, maxPass) {
        const passNumbers = Array.from({length: history.length + 1}, (_, i) => `Pass ${i + 1}`);

        const clarityData = history.map(h => h.clarity);
        clarityData.push(currentMetrics.clarity);

        const correctnessData = history.map(h => h.correctness);
        correctnessData.push(currentMetrics.correctness);

        const structureData = history.map(h => h.structure);
        structureData.push(currentMetrics.structure);

        return [
            {
                x: passNumbers,
                y: clarityData,
                name: 'Clarity',
                mode: 'lines+markers',
                line: { color: '#14b8a6', width: 2 },
                marker: { size: 8 }
            },
            {
                x: passNumbers,
                y: correctnessData,
                name: 'Correctness',
                mode: 'lines+markers',
                line: { color: '#22c55e', width: 2 },
                marker: { size: 8 }
            },
            {
                x: passNumbers,
                y: structureData,
                name: 'Structure',
                mode: 'lines+markers',
                line: { color: '#f59e0b', width: 2 },
                marker: { size: 8 }
            }
        ];
    }

    static createChartLayout() {
        return {
            title: 'Quality Metrics Across Passes',
            xaxis: { title: 'Refinement Pass' },
            yaxis: { title: 'Score (0-100)', range: [0, 105] },
            plot_bgcolor: 'rgba(30, 41, 59, 0.5)',
            paper_bgcolor: 'rgba(15, 23, 42, 0)',
            font: { color: '#f1f5f9', family: 'system-ui' },
            margin: { l: 50, r: 50, t: 40, b: 40 },
            hovermode: 'x unified',
            legend: { x: 0.02, y: 0.98, bgcolor: 'rgba(15, 23, 42, 0.8)' }
        };
    }
}

// Text comparison for highlighting changes
class TextComparison {
    static highlightChanges(previousText, currentText) {
        // Simple approach: mark clearly different sections
        // In a real implementation, you'd use a diff library

        if (!previousText || !currentText) {
            return currentText;
        }

        // For now, return the text as-is
        // The UI layer will handle diff visualization
        return currentText;
    }

    static getChangeDescription(previousMetrics, currentMetrics) {
        const improvements = [];
        const declines = [];

        if (currentMetrics.clarity > previousMetrics.clarity) {
            improvements.push(`clarity +${currentMetrics.clarity - previousMetrics.clarity}%`);
        }
        if (currentMetrics.correctness > previousMetrics.correctness) {
            improvements.push(`correctness +${currentMetrics.correctness - previousMetrics.correctness}%`);
        }
        if (currentMetrics.structure > previousMetrics.structure) {
            improvements.push(`structure +${currentMetrics.structure - previousMetrics.structure}%`);
        }
        if (currentMetrics.errors < previousMetrics.errors) {
            improvements.push(`errors -${previousMetrics.errors - currentMetrics.errors}`);
        }

        if (improvements.length === 0) {
            return "No significant changes detected";
        }

        return `Improved: ${improvements.join(', ')}`;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { RefinementEngine, ScoreTracker, TextComparison };
}
