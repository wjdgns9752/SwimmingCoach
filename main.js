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
        if (onboardingOverlay) onboardingOverlay.classList.add('active');
    } else {
        updateLevelBadge(level);
    }
}

window.selectLevel = function(level) {
    localStorage.setItem(LEVEL_KEY, level);
    if (onboardingOverlay) onboardingOverlay.classList.remove('active');
    updateLevelBadge(level);
    generateDailyPlan(); 
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
        li.innerHTML = `<span>${w.date}</span><strong>${w.distance}m</strong>`;
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

// --- 4. Competition Records ---
const compForm = document.getElementById('competition-form');
const recordsList = document.getElementById('records-list');
const prDisplay = document.getElementById('pr-display');

function loadRecords() {
    const records = JSON.parse(localStorage.getItem(RECORDS_KEY)) || [];
    records.sort((a, b) => new Date(b.date) - new Date(a.date));

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
    if (prDisplay && records.length > 0) {
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


// --- 5. Smart Daily Schedule (Interactive Modal) ---
const planCard = document.querySelector('#dashboard .feature-card:first-child');
const workoutModal = document.getElementById('workout-modal');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');

let currentDailyPlan = null; // Store calculated plan

if (planCard) {
    planCard.addEventListener('click', openWorkoutModal);
}

function closeWorkoutModal() {
    if (workoutModal) workoutModal.classList.add('hidden');
}

window.closeWorkoutModal = closeWorkoutModal; // Export to global

function openWorkoutModal() {
    if (!currentDailyPlan || !workoutModal) return;
    
    // Populate Modal
    modalTitle.textContent = currentDailyPlan.title;
    
    let html = '';
    
    // Warm Up
    html += `<div class="workout-section"><h4>🔥 웜업 (Warm Up)</h4>`;
    currentDailyPlan.warmup.forEach(set => {
        html += `<div class="workout-item"><span class="set-dist">${set.dist}</span><span>${set.desc}</span></div>`;
    });
    html += `</div>`;

    // Drill
    if (currentDailyPlan.drill.length > 0) {
        html += `<div class="workout-section"><h4>🛠️ 드릴 (Drill)</h4>`;
        currentDailyPlan.drill.forEach(set => {
            html += `<div class="workout-item"><span class="set-dist">${set.dist}</span><span>${set.desc}</span></div>`;
        });
        html += `</div>`;
    }

    // Main Set
    html += `<div class="workout-section"><h4>🏊 메인 세트 (Main Set)</h4>`;
    currentDailyPlan.main.forEach(set => {
        html += `<div class="workout-item"><span class="set-dist">${set.dist}</span><span>${set.desc}</span></div>`;
    });
    html += `</div>`;

    // Cool Down
    html += `<div class="workout-section"><h4>❄️ 쿨다운 (Cool Down)</h4>`;
    currentDailyPlan.cooldown.forEach(set => {
        html += `<div class="workout-item"><span class="set-dist">${set.dist}</span><span>${set.desc}</span></div>`;
    });
    html += `</div>`;

    modalBody.innerHTML = html;
    workoutModal.classList.remove('hidden');
}

function generateDailyPlan() {
    const planText = document.getElementById('daily-plan-text');
    if (!planText) return;

    const level = localStorage.getItem(LEVEL_KEY);
    
    // Define Plan Structures
    const PLANS = {
        'beginner': {
            title: "초급: 기초 다지기 (1000m)",
            desc: "호흡 패턴 안정화 및 킥 밸런스 훈련",
            warmup: [{dist: '200m', desc: '자유형 천천히 (50m x 4)'}],
            drill: [{dist: '200m', desc: '킥판 잡고 발차기 (25m x 8)'}, {dist: '200m', desc: '사이드 킥 (좌/우 번갈아)'}],
            main: [{dist: '300m', desc: '자유형 50m x 6 (휴식 30초, 자세 집중)'}],
            cooldown: [{dist: '100m', desc: '배영 또는 걷기'}]
        },
        'intermediate': {
            title: "중급: 유산소 지구력 (1800m)",
            desc: "스트로크 효율(DPS) 향상",
            warmup: [{dist: '300m', desc: '자유형 200m + 배영 100m'}],
            drill: [{dist: '300m', desc: '주먹 쥐고 자유형 (감각 익히기)'}],
            main: [{dist: '1000m', desc: '100m x 10 @ 2:00 (일정한 페이스 유지)'}],
            cooldown: [{dist: '200m', desc: '이지 스윔'}]
        },
        'advanced': {
            title: "상급: 역치 향상 (2800m)",
            desc: "고강도 인터벌 및 페이스 조절",
            warmup: [{dist: '600m', desc: 'SKPS (Swim-Kick-Pull-Swim) 각각 150m'}],
            drill: [{dist: '400m', desc: '개인혼영 드릴'}],
            main: [{dist: '1500m', desc: '200m x 4 (Descending) + 100m x 7 (Hard)'}],
            cooldown: [{dist: '300m', desc: '부드럽게 풀기'}]
        },
        'masters': {
            title: "마스터즈: 대회 시뮬레이션 (3200m)",
            desc: "스타트, 턴, 피니시 실전 훈련",
            warmup: [{dist: '800m', desc: '믹스 웜업 (자유형/혼영)'}],
            drill: [],
            main: [{dist: '2000m', desc: 'Broken 200m x 4 (대회 페이스) + 50m x 8 (All-out)'}],
            cooldown: [{dist: '400m', desc: '회복 수영'}]
        },
        'elite': {
            title: "선수: 파워 트레이닝 (5000m+)",
            desc: "젖산 내성 및 한계 돌파",
            warmup: [{dist: '1500m', desc: '에어로빅 베이스'}],
            drill: [{dist: '500m', desc: '테크닉 교정'}],
            main: [{dist: '2500m', desc: 'Threshold Set: 400m x 3 + 200m x 4 + 100m x 5'}],
            cooldown: [{dist: '500m', desc: '완벽한 정리 운동'}]
        }
    };

    const selectedPlan = PLANS[level] || PLANS['beginner'];
    currentDailyPlan = selectedPlan; // Save for modal

    planText.innerHTML = `<strong>${selectedPlan.title}</strong><br><span style="font-size:0.9rem; color:#718096">${selectedPlan.desc}</span><br><span style="font-size:0.8rem; text-decoration:underline; color:var(--color-primary)">클릭하여 상세 보기 &rarr;</span>`;
}


// --- 6. Advanced Video Analysis (Multi-Lane & AI Solution) ---
const uploadZone = document.getElementById('upload-zone');
const fileInput = document.getElementById('video-upload');
const analysisResults = document.getElementById('analysis-results');
const loader = document.getElementById('analysis-loader');
const splitsHead = document.getElementById('splits-head');
const splitsBody = document.getElementById('splits-body');
const laneTabsContainer = document.getElementById('lane-tabs');
const aiSolutionText = document.getElementById('ai-solution-text');

const resTotalTime = document.getElementById('res-total-time');
const resReaction = document.getElementById('res-reaction');
const resEfficiency = document.getElementById('res-efficiency');
const resBadgePool = document.getElementById('res-badge-pool');
const resBadgeEvent = document.getElementById('res-badge-event');
const resBadgeLane = document.getElementById('res-badge-lane');

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

let currentLane = 1; // Default Lane

function initAnalysisControls() {
    if(!poolSelect || !eventSelect) return;
    poolSelect.addEventListener('change', updateEventOptions);
    updateEventOptions();

    // Setup Upload
    if (uploadZone && fileInput) {
        uploadZone.addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', (e) => { if (e.target.files.length > 0) handleFile(e.target.files[0]); });
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            uploadZone.addEventListener(eventName, (e) => { e.preventDefault(); e.stopPropagation(); }, false);
        });
        uploadZone.addEventListener('drop', (e) => { if (e.dataTransfer.files.length > 0) handleFile(e.dataTransfer.files[0]); });
    }
}

function updateEventOptions() {
    const pool = poolSelect.value;
    const events = pool === '25' ? EVENTS_25M : EVENTS_50M;
    eventSelect.innerHTML = events.map(ev => `<option value="${ev.id}">${ev.name}</option>`).join('');
}

function handleFile(file) {
    const maxSize = 500 * 1024 * 1024;
    if (!file.type.startsWith('video/')) { alert('동영상 파일만 업로드 가능합니다.'); return; }
    if (file.size > maxSize) { alert('파일 크기가 너무 큽니다. (최대 500MB)'); return; }
    startAnalysisSimulation(file);
}

function startAnalysisSimulation(file) {
    uploadZone.classList.add('hidden');
    analysisResults.classList.remove('hidden');
    loader.classList.remove('hidden');
    document.querySelector('.result-card').classList.add('hidden');

    setTimeout(() => {
        loader.classList.add('hidden');
        document.querySelector('.result-card').classList.remove('hidden');
        setupLaneTabs(); // Init Tabs
        generateAdvancedMockData(1); // Default Lane 1
    }, 2500);
}

function setupLaneTabs() {
    laneTabsContainer.innerHTML = '';
    for(let i=1; i<=8; i++) {
        const tab = document.createElement('div');
        tab.className = `lane-tab ${i === 1 ? 'active' : ''}`;
        tab.textContent = `레인 ${i}`;
        tab.onclick = () => {
            // UI Toggle
            document.querySelectorAll('.lane-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            // Data Update
            generateAdvancedMockData(i);
        };
        laneTabsContainer.appendChild(tab);
    }
}

function generateAdvancedMockData(laneNum) {
    currentLane = laneNum;
    resBadgeLane.textContent = `Lane ${laneNum}`;

    const pool = poolSelect.value;
    const eventId = eventSelect.value;
    const eventName = eventSelect.options[eventSelect.selectedIndex].text;

    resBadgePool.textContent = `${pool}m 풀`;
    resBadgeEvent.textContent = eventName;

    // Randomize Stats slightly based on lane number (Simulator feel)
    const baseTime = 30 + (laneNum * 0.5); 
    const totalTime = (Math.random() * 5 + baseTime).toFixed(2);
    const efficiency = Math.floor(Math.random() * (95 - 60) + 60);
    const reaction = (Math.random() * (0.9 - 0.5) + 0.5).toFixed(2);

    resTotalTime.textContent = totalTime;
    resEfficiency.textContent = efficiency;
    resReaction.textContent = reaction;

    // AI Coaching Solution Logic
    let solution = "";
    if (parseFloat(reaction) > 0.75) {
        solution = "🚀 <strong>스타트 반응 속도 개선 필요:</strong> 블록에서의 반응이 0.75초 이상으로 느립니다. '제자리 점프' 훈련과 신호 반응 훈련을 병행하세요.";
    } else if (efficiency < 70) {
        solution = "🌊 <strong>스트로크 효율 저하:</strong> 물을 잡는 느낌(Catch)이 부족하여 스트로크 수가 많습니다. '스컬링(Sculling)' 드릴을 추천합니다.";
    } else {
        solution = "✨ <strong>훌륭한 퍼포먼스:</strong> 전반적인 밸런스가 좋습니다. 이제 턴 이후 '돌핀킥' 거리를 늘려 기록을 단축해보세요.";
    }
    aiSolutionText.innerHTML = solution;


    // Table Generation
    let headerHtml = '';
    let bodyHtml = '';

    if (eventId.includes('relay')) {
        headerHtml = `<tr><th>주자</th><th>반응속도 (RT)</th><th>구간 기록</th><th>누적 기록</th></tr>`;
        let cumulative = 0;
        const swimmers = ['1번 주자', '2번 주자', '3번 주자', '4번 주자'];
        bodyHtml = swimmers.map((s, idx) => {
            const split = (parseFloat(totalTime) / 4 + (Math.random() - 0.5)).toFixed(2);
            cumulative += parseFloat(split);
            const rt = idx === 0 ? reaction : (Math.random() * 0.4 - 0.1).toFixed(2);
            return `<tr><td>${s}</td><td style="color:${parseFloat(rt)<0?'red':'inherit'}">${rt}s</td><td>${split}s</td><td>${cumulative.toFixed(2)}s</td></tr>`;
        }).join('');
    } else if (eventId.includes('im')) {
        headerHtml = `<tr><th>영법</th><th>스트로크 수</th><th>턴 타임</th><th>구간 기록</th></tr>`;
        const strokes = ['접영', '배영', '평영', '자유형'];
        bodyHtml = strokes.map(s => {
            const split = (parseFloat(totalTime) / 4).toFixed(2);
            return `<tr><td>${s}</td><td>${Math.floor(Math.random()*15+10)}</td><td>${(Math.random()+0.8).toFixed(2)}s</td><td>${split}s</td></tr>`;
        }).join('');
    } else {
        headerHtml = `<tr><th>구간 (Distance)</th><th>스트로크</th><th>호흡</th><th>구간 기록</th></tr>`;
        bodyHtml = `<tr><td>전체 구간</td><td>${Math.floor(Math.random()*40+30)}</td><td>12</td><td>${totalTime}s</td></tr>`;
    }

    splitsHead.innerHTML = headerHtml;
    splitsBody.innerHTML = bodyHtml;
}