// ================================
// Selection Sort Visualizer
// Part 1
// ================================

const arrayContainer = document.getElementById("arrayContainer");

const generateBtn = document.getElementById("generateBtn");
const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

const comparisonCount = document.getElementById("comparisonCount");
const swapCount = document.getElementById("swapCount");
const pauseCount = document.getElementById("pauseCount");

const statusText = document.getElementById("statusText");
const speedRange = document.getElementById("speedRange");

let array = [];
let originalArray = [];

let comparisons = 0;
let swaps = 0;
let pauses = 0;

let sorting = false;
let paused = false;

let speed = 500;

speedRange.addEventListener("input",() => {
    speed = parseInt(speedRange.value);
});

// ----------------------------
// Utility Delay Function
// ----------------------------

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ----------------------------
// Generate Random Array
// ----------------------------

function generateArray(size = 15) {

    array = [];

    for (let i = 0; i < size; i++) {
        array.push(
            Math.floor(Math.random() * 90) + 10
        );
    }

    originalArray = [array];

    resetStats();

    renderArray();

    statusText.textContent =
        "New random array generated.";
}

// ----------------------------
// Render Bars
// ----------------------------

function renderArray() {

    arrayContainer.innerHTML = "";

    array.forEach(value => {

        const bar = document.createElement("div");

        bar.classList.add("bar");

        bar.style.height = `${value * 3}px`;

        bar.textContent = value;

        arrayContainer.appendChild(bar);
    });
}

// ----------------------------
// Reset Counters
// ----------------------------

function resetStats() {

    comparisons = 0;
    swaps = 0;
    passes = 0;

    comparisonCount.textContent = 0;
    swapCount.textContent = 0;
    passCount.textContent = 0;
}

// ----------------------------
// Update Statistics
// ----------------------------

function updateStats() {

    comparisonCount.textContent =
        comparisons;

    swapCount.textContent =
        swaps;

    passCount.textContent =
        passes;
}

// ----------------------------
// Highlight Bars
// ----------------------------

function clearHighlights() {

    const bars =
        document.querySelectorAll(".bar");

    bars.forEach(bar => {

        bar.classList.remove(
            "current",
            "minimum",
            "comparing"
        );
    });
}

function markSorted(index) {

    const bars =
        document.querySelectorAll(".bar");

    if (bars[index]) {
        bars[index].classList.add("sorted");
    }
}

// ----------------------------
// Pause Controller
// ----------------------------

async function waitWhilePaused() {

    while (paused) {
        await sleep(100);
    }
}

// ----------------------------
// Reset Array
// ----------------------------

function resetArray() {

    array = [...originalArray];

    sorting = false;
    paused = false;

    pauseBtn.textContent = "Pause";

    resetStats();

    renderArray();

    statusText.textContent =
        "Array reset successfully.";
}

// ============================
// Selection Sort Function
// ============================

async function selectionSort() {

    sorting = true;

    const bars = document.querySelectorAll(".bar");

    for (let i = 0; i < array.length - 1; i++) {

        await waitWhilePaused();

        let minIndex = i;

        passes++;
        updateStats();

        statusText.textContent =
            `Pass ${passes}: Finding the smallest element from index ${i} onward.`;

        bars[minIndex].classList.add("minimum");

        for (let j = i + 1; j < array.length; j++) {

            await waitWhilePaused();

            clearHighlights();

            // Keep sorted bars green
            for (let k = 0; k < i; k++) {
                bars[k].classList.add("sorted");
            }

            bars[minIndex].classList.add("minimum");
            bars[j].classList.add("current");

            comparisons++;
            updateStats();

            statusText.textContent =
                `Comparing ${array[j]} with current minimum ${array[minIndex]}`;

            await sleep(speed);

            if (array[j] < array[minIndex]) {

                bars[minIndex].classList.remove("minimum");

                minIndex = j;

                bars[minIndex].classList.add("minimum");

                statusText.textContent =
                    `${array[minIndex]} becomes the new minimum.`;

                await sleep(speed);
            }
        }

        if (minIndex !== i) {

            statusText.textContent =
                `Swapping ${array[i]} and ${array[minIndex]}`;

            [array[i], array[minIndex]] =
            [array[minIndex], array[i]];

            swaps++;
            updateStats();

            renderArray();

            await sleep(speed);
        }

        renderArray();

        const newBars =
            document.querySelectorAll(".bar");

        for (let k = 0; k <= i; k++) {
            newBars[k].classList.add("sorted");
        }

        await sleep(speed / 2);
    }

    renderArray();

    document
        .querySelectorAll(".bar")
        .forEach(bar => {
            bar.classList.add("sorted");
        });

    sorting = false;

    statusText.textContent =
        "🎉 Selection Sort Completed Successfully!";
}

// ============================
// Start Button
// ============================

startBtn.addEventListener("click", async () => {

    if (sorting) return;

    await selectionSort();
});

// ============================
// Pause / Resume
// ============================

pauseBtn.addEventListener("click", () => {

    if (!sorting) return;

    paused = !paused;

    pauseBtn.textContent =
        paused ? "Resume" : "Pause";

    statusText.textContent =
        paused
            ? "Sorting Paused..."
            : "Sorting Resumed...";
});

// ============================
// Generate New Array
// ============================

generateBtn.addEventListener("click", () => {

    if (sorting) return;

    generateArray();
});

// ============================
// Reset
// ============================

resetBtn.addEventListener("click", () => {

    resetArray();
});

// ============================
// Next Step
// ============================

nextBtn.addEventListener("click", () => {

    alert(
        "The Next Step feature will be added in the advanced version.\n\nFor now, use Start + Pause/Resume to observe each step."
    );
});

// ============================
// Initial Load
// ============================

generateArray();