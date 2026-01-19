console.log('일일 스위밍 코치 앱 초기화됨');

// --- 0. Global State & Initialization ---
const LEVEL_KEY = 'swim_user_level';
const WORKOUT_KEY = 'swim_workouts';
const RECORDS_KEY = 'swim_competition_records';

document.addEventListener('DOMContentLoaded', () => {
    checkUserLevel();
    loadWorkouts();
    loadRecords();
    generateDailyPlan();
    initAnalysisControls();
});


// --- 1. User Level Onboarding ---
const onboardingOverlay = document.getElementById('onboarding-overlay');
const userLevelBadge = document.getElementById('user-level-badge');

function checkUserLevel() {
    const level = localStorage.getItem(LEVEL_KEY);
    if (!level) {
        // Show Onboarding
        if (onboardingOverlay) onboardingOverlay.classList.add('active');
    } else {
        updateLevelBadge(level);
    }
}

// Global scope to be called from HTML
window.selectLevel = function(level) {
    localStorage.setItem(LEVEL_KEY, level);
    if (onboardingOverlay) onboardingOverlay.classList.remove('active');
    updateLevelBadge(level);
    generateDailyPlan(); // Regenerate plan based on new level
    alert('레벨이 설정되었습니다!');
};

window.resetLevel = function() {
    localStorage.removeItem(LEVEL_KEY);
    location.reload();
};

function updateLevelBadge(level) {
    if (!userLevelBadge) return;
    
    const levelNames = {
        'beginner': '초급 (Beginner)',
        'intermediate': '중급 (Intermediate)',
        'advanced': '상급 (Advanced)',
        'masters': '마스터즈 (Masters)',
        'elite': '선수 (Elite)'
    };
    
    userLevelBadge.textContent = levelNames[level] || '레벨 미설정';
    userLevelBadge.classList.remove('pending');
    userLevelBadge.style.backgroundColor = '#e6fffa';
    userLevelBadge.style.color = '#2c7a7b';
}


// --- 2. Mobile Menu ---
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

// --- 3. Workout Logger ---
const workoutForm = document.getElementById('swim-log-form');
const recentActivityList = document.getElementById('recent-activity-list');
const totalDistanceDisplay = document.getElementById('total-distance-display');

function loadWorkouts() {
    const workouts = JSON.parse(localStorage.getItem(WORKOUT_KEY)) || [];
    renderActivityList(workouts);
    updateTotalDistance(workouts);
}

function renderActivityList(workouts) {
    if (!recentActivityList) return;
    recentActivityList.innerHTML = '';
    
    if (workouts.length === 0) {
        recentActivityList.innerHTML = '<li class="empty-state">아직 기록된 훈련이 없습니다.</li>';
        return;
    }

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
    const total = workouts.reduce((sum, w) => sum + parseInt(w.distance || 0), 0);
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
        const workouts = JSON.parse(localStorage.getItem(WORKOUT_KEY)) || [];
        workouts.push(newWorkout);
        localStorage.setItem(WORKOUT_KEY, JSON.stringify(workouts));

        loadWorkouts();
        generateDailyPlan();
        workoutForm.reset();
        alert('오늘의 훈련이 기록되었습니다!');
    });
}

// --- 4. Competition Records (Detailed) ---
const compForm = document.getElementById('competition-form');
const recordsList = document.getElementById('records-list');
const prDisplay = document.getElementById('pr-display');

function loadRecords() {
    const records = JSON.parse(localStorage.getItem(RECORDS_KEY)) || [];
    records.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date desc

    if (recordsList) {
        recordsList.innerHTML = '';
        if (records.length === 0) {
            recordsList.innerHTML = '<li class="empty-state">등록된 대회 기록이 없습니다.</li>';
        } else {
            records.forEach(rec => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <div class="rec-meta">
                        <span class="rec-event">${rec.event}</span>
                        <span class="rec-name">${rec.name} (${rec.date})</span>
                    </div>
                    <span class="rec-time">${rec.time}</span>
                `;
                recordsList.appendChild(li);
            });
        }
    }

    // Update Dashboard PR Display (Find best free record as example)
    if (prDisplay && records.length > 0) {
        // Find most recent record
        const recent = records[0];
        prDisplay.textContent = `${recent.event}: ${recent.time}`;
    }
}

if (compForm) {
    compForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('comp-name').value;
        const date = document.getElementById('comp-date').value;
        const event = document.getElementById('comp-event').value;
        const time = document.getElementById('comp-time').value;

        const newRecord = { id: Date.now(), name, date, event, time };
        const records = JSON.parse(localStorage.getItem(RECORDS_KEY)) || [];
        records.push(newRecord);
        localStorage.setItem(RECORDS_KEY, JSON.stringify(records));

        loadRecords();
        generateDailyPlan();
        compForm.reset();
        alert('대회 기록이 추가되었습니다!');
    });
}


// --- 5. Smart Daily Schedule (Level Based) ---
function generateDailyPlan() {
    const planText = document.getElementById('daily-plan-text');
    if (!planText) return;

    const level = localStorage.getItem(LEVEL_KEY);
    const workouts = JSON.parse(localStorage.getItem(WORKOUT_KEY)) || [];
    
    // Calculate Volume
    let avgDist = 0;
    if (workouts.length > 0) {
        const recent = workouts.slice(-3);
        const totalRecent = recent.reduce((sum, w) => sum + parseInt(w.distance || 0), 0);
        avgDist = totalRecent / recent.length;
    }

    let plan = "";
    let focus = "";

    // Strategy: Combine Level + Recent Volume
    if (!level || level === 'beginner') {
        plan = "기초 다지기 (800m - 1200m)";
        focus = "호흡 패턴 안정화 및 킥 밸런스 훈련";
    } else if (level === 'intermediate') {
        plan = "유산소 지구력 (1500m - 2000m)";
        focus = "스트로크 당 거리(DPS) 늘리기 및 턴 연습";
    } else if (level === 'advanced') {
        plan = "역치 향상 훈련 (2500m+)";
        focus = "인터벌 훈련 (10x100m @ 1:30) 및 페이스 조절";
    } else if (level === 'masters') {
        plan = "대회 실전 시뮬레이션 (3000m+)";
        focus = "스타트, 브레이크아웃, 피니시 집중 훈련";
    } else if (level === 'elite') {
        plan = "고강도 파워 트레이닝 (5000m+)";
        focus = "젖산 내성 훈련 및 한계 돌파";
    }

    // Dynamic Override based on low volume
    if (workouts.length > 0 && avgDist < 500 && level !== 'beginner') {
        focus += "<br>(최근 운동량이 부족합니다. 가벼운 웜업부터 시작하세요.)";
    }

    planText.innerHTML = `<strong>${plan}</strong><br><span style="font-size:0.9rem; color:#718096">${focus}</span>`;
}

// --- 6. Advanced Video Analysis (Dynamic) ---
const uploadZone = document.getElementById('upload-zone');
const fileInput = document.getElementById('video-upload');
const analysisResults = document.getElementById('analysis-results');
const loader = document.getElementById('analysis-loader');
const splitsHead = document.getElementById('splits-head');
const splitsBody = document.getElementById('splits-body');

const resTotalTime = document.getElementById('res-total-time');
const resReaction = document.getElementById('res-reaction');
const resEfficiency = document.getElementById('res-efficiency');
const resBadgePool = document.getElementById('res-badge-pool');
const resBadgeEvent = document.getElementById('res-badge-event');

const poolSelect = document.getElementById('ana-pool-length');
const eventSelect = document.getElementById('ana-event-type');

// Event Definitions
const EVENTS_25M = [
    { id: 'free50', name: '자유형 50m' },
    { id: 'im100', name: '개인혼영 100m' },
    { id: 'relay200f', name: '계영 200m' },
    { id: 'relay200m', name: '혼계영 200m' }
];

const EVENTS_50M = [
    { id: 'free50', name: '자유형 50m' },
    { id: 'free100', name: '자유형 100m' },
    { id: 'im200', name: '개인혼영 200m' },
    { id: 'relay400f', name: '계영 400m' },
    { id: 'relay200m', name: '혼계영 200m' }
];

function initAnalysisControls() {
    if(!poolSelect || !eventSelect) return;

    // Populate events based on pool selection
    poolSelect.addEventListener('change', updateEventOptions);
    updateEventOptions(); // Initial load

    // File Upload Listeners
    if (uploadZone && fileInput) {
        uploadZone.addEventListener('click', () => fileInput.click());

        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) handleFile(e.target.files[0]);
        });

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            uploadZone.addEventListener(eventName, preventDefaults, false);
        });

        function preventDefaults(e) { e.preventDefault(); e.stopPropagation(); }

        ['dragenter', 'dragover'].forEach(eventName => {
            uploadZone.addEventListener(eventName, () => uploadZone.style.borderColor = '#006994', false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            uploadZone.addEventListener(eventName, () => uploadZone.style.borderColor = '#cbd5e0', false);
        });

        uploadZone.addEventListener('drop', (e) => {
            const dt = e.dataTransfer;
            if (dt.files.length > 0) handleFile(dt.files[0]);
        });
    }
}

function updateEventOptions() {
    const pool = poolSelect.value;
    const events = pool === '25' ? EVENTS_25M : EVENTS_50M;
    
    eventSelect.innerHTML = events.map(ev => 
        `<option value="${ev.id}">${ev.name}</option>`
    ).join('');
}

function handleFile(file) {
    const maxSize = 500 * 1024 * 1024; // 500MB
    if (!file.type.startsWith('video/')) {
        alert('동영상 파일만 업로드 가능합니다.');
        return;
    }
    if (file.size > maxSize) {
        alert('파일 크기가 너무 큽니다. (최대 500MB)');
        return;
    }
    startAnalysisSimulation(file);
}

function startAnalysisSimulation(file) {
    uploadZone.classList.add('hidden');
    analysisResults.classList.remove('hidden');
    loader.classList.remove('hidden');
    document.querySelector('.result-card').classList.add('hidden');

    // Simulate Delay
    setTimeout(() => {
        loader.classList.add('hidden');
        document.querySelector('.result-card').classList.remove('hidden');
        generateAdvancedMockData();
    }, 2500);
}

function generateAdvancedMockData() {
    const pool = poolSelect.value;
    const eventId = eventSelect.value;
    const eventName = eventSelect.options[eventSelect.selectedIndex].text;

    resBadgePool.textContent = `${pool}m 풀`;
    resBadgeEvent.textContent = eventName;

    // Default Random Stats
    const totalTime = (Math.random() * (120 - 25) + 25).toFixed(2);
    const efficiency = Math.floor(Math.random() * (95 - 70) + 70);
    const reaction = (Math.random() * (0.8 - 0.6) + 0.6).toFixed(2);

    resTotalTime.textContent = totalTime;
    resEfficiency.textContent = efficiency;
    resReaction.textContent = reaction;

    // Dynamic Table Generation based on Event Type
    let headerHtml = '';
    let bodyHtml = '';

    if (eventId.includes('relay')) {
        // Relay Logic (4 Swimmers)
        headerHtml = `
            <tr>
                <th>주자</th>
                <th>반응속도 (RT)</th>
                <th>구간 기록</th>
                <th>누적 기록</th>
            </tr>
        `;
        let cumulative = 0;
        const swimmers = ['1번 주자', '2번 주자', '3번 주자', '4번 주자'];
        
        bodyHtml = swimmers.map((s, idx) => {
            const split = (parseFloat(totalTime) / 4 + (Math.random() - 0.5)).toFixed(2);
            cumulative += parseFloat(split);
            const rt = idx === 0 ? reaction : (Math.random() * 0.4 - 0.1).toFixed(2); // 1st swimmer RT is block time, others are relay takeover
            
            return `
            <tr>
                <td>${s}</td>
                <td style="color: ${parseFloat(rt) < 0 ? 'red' : 'inherit'}">${rt}s</td>
                <td>${split}s</td>
                <td>${cumulative.toFixed(2)}s</td>
            </tr>`;
        }).join('');

    } else if (eventId.includes('im')) {
        // IM Logic (Fly-Back-Breast-Free)
        headerHtml = `
            <tr>
                <th>영법</th>
                <th>스트로크 수</th>
                <th>턴 타임</th>
                <th>구간 기록</th>
            </tr>
        `;
        const strokes = ['접영', '배영', '평영', '자유형'];
        bodyHtml = strokes.map(s => {
            const split = (parseFloat(totalTime) / 4).toFixed(2);
            return `
            <tr>
                <td>${s}</td>
                <td>${Math.floor(Math.random() * 15 + 10)}</td>
                <td>${(Math.random() + 0.8).toFixed(2)}s</td>
                <td>${split}s</td>
            </tr>`;
        }).join('');

    } else {
        // Single Event (Splits by Length)
        headerHtml = `
            <tr>
                <th>구간 (Distance)</th>
                <th>스트로크</th>
                <th>호흡</th>
                <th>구간 기록</th>
            </tr>
        `;
        const laps = pool === '25' && eventId === 'free50' ? 2 : 1; 
        // Simplified: Just showing 2 splits for demo if multiple laps
        if (laps > 1 || eventId === 'free100') {
             bodyHtml = `
                <tr>
                    <td>0 - ${pool}m</td>
                    <td>${Math.floor(Math.random() * 20 + 15)}</td>
                    <td>4</td>
                    <td>${(parseFloat(totalTime)/2).toFixed(2)}s</td>
                </tr>
                <tr>
                    <td>${pool}m - ${parseInt(pool)*2}m</td>
                    <td>${Math.floor(Math.random() * 20 + 15)}</td>
                    <td>5</td>
                    <td>${(parseFloat(totalTime)/2).toFixed(2)}s</td>
                </tr>
             `;
        } else {
            // Single Lap
            bodyHtml = `
                <tr>
                    <td>전체 구간</td>
                    <td>${Math.floor(Math.random() * 40 + 30)}</td>
                    <td>12</td>
                    <td>${totalTime}s</td>
                </tr>
             `;
        }
    }

    splitsHead.innerHTML = headerHtml;
    splitsBody.innerHTML = bodyHtml;
}
