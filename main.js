console.log('Daily Swimming Coach App Initialized');

// --- Mobile Menu ---
const menuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.main-nav');

if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    const isHidden = getComputedStyle(nav).display === 'none';
    if (isHidden) {
        nav.style.display = 'block';
        nav.style.position = 'absolute';
        nav.style.top = '100%';
        nav.style.left = '0';
        nav.style.width = '100%';
        nav.style.background = 'white';
        nav.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        nav.style.padding = '1rem';
        nav.style.zIndex = '1000';
        
        const ul = nav.querySelector('ul');
        if (ul) {
            ul.style.flexDirection = 'column';
            ul.style.gap = '1rem';
        }
    } else {
        nav.style.display = ''; 
        nav.style.position = '';
        nav.style.zIndex = '';
        nav.style.top = '';
        nav.style.left = '';
        nav.style.width = '';
        nav.style.background = '';
        nav.style.boxShadow = '';
        nav.style.padding = '';
        const ul = nav.querySelector('ul');
        if (ul) {
            ul.style.flexDirection = '';
            ul.style.gap = '';
        }
    }
  });
}

// --- Data Persistence (LocalStorage) ---

// 1. Workout Logger
const workoutForm = document.getElementById('swim-log-form');
const recentActivityList = document.getElementById('recent-activity-list');
const totalDistanceDisplay = document.getElementById('total-distance-display');

function loadWorkouts() {
    const workouts = JSON.parse(localStorage.getItem('swim_workouts')) || [];
    renderActivityList(workouts);
    updateTotalDistance(workouts);
}

function renderActivityList(workouts) {
    if (!recentActivityList) return;
    recentActivityList.innerHTML = '';
    
    if (workouts.length === 0) {
        recentActivityList.innerHTML = '<li class="empty-state">No swims logged yet.</li>';
        return;
    }

    // Show last 3 workouts
    const recent = workouts.slice(-3).reverse();
    recent.forEach(w => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${w.date}</span>
            <strong>${w.distance}m</strong>
        `;
        recentActivityList.appendChild(li);
    });
}

function updateTotalDistance(workouts) {
    if (!totalDistanceDisplay) return;
    // Sum distance from current week (simplified: just total for now)
    const total = workouts.reduce((sum, w) => sum + parseInt(w.distance), 0);
    totalDistanceDisplay.textContent = `${total} m`;
}

if (workoutForm) {
    workoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const date = document.getElementById('date').value;
        const distance = document.getElementById('distance').value;
        const duration = document.getElementById('duration').value;
        const notes = document.getElementById('notes').value;

        if (!date || !distance) return;

        const newWorkout = { date, distance, duration, notes, id: Date.now() };
        const workouts = JSON.parse(localStorage.getItem('swim_workouts')) || [];
        workouts.push(newWorkout);
        localStorage.setItem('swim_workouts', JSON.stringify(workouts));

        loadWorkouts();
        workoutForm.reset();
        alert('Workout logged successfully!');
    });
}

// 2. Personal Records (PR)
const prForm = document.getElementById('pr-form');
const prInputs = document.querySelectorAll('.pr-input');
const prDisplay = document.getElementById('pr-display');

function loadPRs() {
    const prs = JSON.parse(localStorage.getItem('swim_prs')) || {};
    prInputs.forEach(input => {
        const event = input.dataset.event;
        if (prs[event]) input.value = prs[event];
    });
    
    // Update Dashboard Display
    if (prDisplay && prs['100free']) {
        prDisplay.textContent = prs['100free'];
    }
}

if (prForm) {
    prForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const prs = {};
        prInputs.forEach(input => {
            if (input.value) prs[input.dataset.event] = input.value;
        });
        localStorage.setItem('swim_prs', JSON.stringify(prs));
        loadPRs();
        alert('Records updated!');
    });
}

// --- Video Analysis Simulation ---
const uploadZone = document.getElementById('upload-zone');
const fileInput = document.getElementById('video-upload');
const analysisResults = document.getElementById('analysis-results');
const loader = document.getElementById('analysis-loader');
const splitsBody = document.getElementById('splits-body');

// UI Elements for Data
const resBreakout = document.getElementById('res-breakout');
const resDps = document.getElementById('res-dps');
const resTime = document.getElementById('res-time');

if (uploadZone && fileInput) {
    uploadZone.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            startAnalysisSimulation(file);
        }
    });
}

function startAnalysisSimulation(file) {
    // 1. UI Reset
    uploadZone.classList.add('hidden');
    analysisResults.classList.remove('hidden');
    loader.classList.remove('hidden');
    document.querySelector('.result-card').classList.add('hidden');

    // 2. Simulate Delay (Network/Processing)
    setTimeout(() => {
        loader.classList.add('hidden');
        document.querySelector('.result-card').classList.remove('hidden');
        generateMockData();
    }, 2500); // 2.5s simulated delay
}

function generateMockData() {
    // Generate realistic random swimming data
    const breakoutTime = (Math.random() * (7 - 4) + 4).toFixed(2); // 4s - 7s
    const totalTime = (Math.random() * (35 - 28) + 28).toFixed(2); // 28s - 35s (50m free)
    const dps = (Math.random() * (1.8 - 1.2) + 1.2).toFixed(2); // Distance per stroke

    resBreakout.textContent = breakoutTime;
    resTime.textContent = totalTime;
    resDps.textContent = dps;

    // Generate Splits Table (Breakout + Segments)
    // Assume 50m pool, split into roughly 10m segments + breakout
    const segments = [
        { name: 'Breakout (0-15m)', strokes: 6, breaths: 1, time: breakoutTime },
        { name: 'Mid-Swim (15-35m)', strokes: 18, breaths: 6, time: (parseFloat(totalTime) * 0.4).toFixed(2) },
        { name: 'Finish (35-50m)', strokes: 14, breaths: 4, time: (parseFloat(totalTime) - parseFloat(breakoutTime) - (parseFloat(totalTime) * 0.4)).toFixed(2) }
    ];

    splitsBody.innerHTML = segments.map(seg => `
        <tr>
            <td>${seg.name}</td>
            <td>${seg.strokes}</td>
            <td>${seg.breaths}</td>
            <td>${seg.time}s</td>
        </tr>
    `).join('');
}

// Initialize

document.addEventListener('DOMContentLoaded', () => {

    loadWorkouts();

    loadPRs();

    generateDailyPlan();

});



// --- Smart Daily Schedule Generation ---

function generateDailyPlan() {

    const planText = document.getElementById('daily-plan-text');

    if (!planText) return;



    const workouts = JSON.parse(localStorage.getItem('swim_workouts')) || [];

    const prs = JSON.parse(localStorage.getItem('swim_prs')) || {};

    

    // 1. Calculate Average Recent Volume (Last 3 sessions)

    let avgDist = 0;

    if (workouts.length > 0) {

        const recent = workouts.slice(-3);

        const totalRecent = recent.reduce((sum, w) => sum + parseInt(w.distance), 0);

        avgDist = totalRecent / recent.length;

    }



    // 2. Determine Focus based on Volume & PR

    let plan = "";

    let focus = "";

    

    // Default / Beginner

    if (avgDist < 1000) {

        plan = "Technical Drill Set (1200m)";

        focus = "Focus on body position & rotation.";

    } 

    // Intermediate

    else if (avgDist < 2500) {

        plan = "Aerobic Endurance (2000m)";

        focus = "Maintain consistent pace.";

        

        // If they have a 100m PR, suggest a pace

        if (prs['100free']) {

            focus = `Main Set: 10x100m @ Pace (based on ${prs['100free']})`;

        }

    } 

    // Advanced

    else {

        plan = "Threshold Power (3000m+)";

        focus = "High intensity intervals.";

        if (prs['100free']) {

             focus = `Target: Sprint sets beating ${prs['100free']}`;

        }

    }



    planText.innerHTML = `<strong>${plan}</strong><br><span style="font-size:0.9em; color:#718096">${focus}</span>`;

}



// --- Video Analysis Simulation ---

const uploadZone = document.getElementById('upload-zone');

const fileInput = document.getElementById('video-upload');

const analysisResults = document.getElementById('analysis-results');

const loader = document.getElementById('analysis-loader');

const splitsBody = document.getElementById('splits-body');



// UI Elements for Data

const resBreakout = document.getElementById('res-breakout');

const resDps = document.getElementById('res-dps');

const resTime = document.getElementById('res-time');



if (uploadZone && fileInput) {

    uploadZone.addEventListener('click', () => fileInput.click());



    fileInput.addEventListener('change', (e) => {

        if (e.target.files.length > 0) {

            const file = e.target.files[0];

            

            // File Size Check (500MB = 500 * 1024 * 1024 bytes)

            const maxSize = 500 * 1024 * 1024;

            if (file.size > maxSize) {

                alert('File is too large. Max size is 500MB.');

                return;

            }



            startAnalysisSimulation(file);

        }

    });

}



function startAnalysisSimulation(file) {