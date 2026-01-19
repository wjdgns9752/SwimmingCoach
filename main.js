console.log('일일 스위밍 코치 앱 초기화됨');

const PROFILE_KEY = 'swim_user_profile'; // New Key for Object { nickname, level }
const WORKOUT_KEY = 'swim_workouts';
const RECORDS_KEY = 'swim_competition_records';

// Backwards compatibility keys (will be migrated)
const OLD_LEVEL_KEY = 'swim_user_level';

document.addEventListener('DOMContentLoaded', () => {
    checkUserProfile();
    loadWorkouts();
    loadRecords();
    initAnalysisControls();
    initNavigation();
    
    // Set default date
    const dateInput = document.getElementById('date');
    if(dateInput) dateInput.valueAsDate = new Date();
});

// --- Navigation (SPA) ---
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link, .nav-item');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(link.dataset.page);
        });
    });
}

window.navigateTo = function(pageId) {
    const sections = document.querySelectorAll('.page-section');
    const navItems = document.querySelectorAll('.mobile-bottom-nav .nav-item');
    const desktopLinks = document.querySelectorAll('.desktop-nav .nav-link');

    sections.forEach(sec => {
        if (sec.id === `${pageId}-page`) {
            sec.classList.remove('hidden');
            sec.classList.add('active');
        } else {
            sec.classList.add('hidden');
            sec.classList.remove('active');
        }
    });

    [navItems, desktopLinks].forEach(nodeList => {
        nodeList.forEach(item => {
            if (item.dataset.page === pageId) item.classList.add('active');
            else item.classList.remove('active');
        });
    });
    window.scrollTo(0, 0);
};

// --- User Profile & Persistence ---
const onboardingOverlay = document.getElementById('onboarding-overlay');
const userLevelBadge = document.getElementById('user-level-badge');
const greetingText = document.getElementById('user-greeting');
const profileNicknameInput = document.getElementById('profile-nickname');
const profileLevelSelect = document.getElementById('profile-level');

function checkUserProfile() {
    // Migrate old level key if exists
    const oldLevel = localStorage.getItem(OLD_LEVEL_KEY);
    let profile = JSON.parse(localStorage.getItem(PROFILE_KEY));

    if (oldLevel && !profile) {
        profile = { nickname: '수영인', level: oldLevel };
        localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
        localStorage.removeItem(OLD_LEVEL_KEY);
    }

    if (!profile || !profile.nickname || !profile.level) {
        // Show Onboarding
        if (onboardingOverlay) onboardingOverlay.classList.add('active');
    } else {
        applyUserProfile(profile);
    }
}

function applyUserProfile(profile) {
    // 1. Update Greeting
    if (greetingText) greetingText.textContent = `안녕하세요, ${profile.nickname}님! 🏊`;
    
    // 2. Update Badge
    updateLevelBadge(profile.level);
    
    // 3. Generate Plan
    generateDailyPlan(profile.level);

    // 4. Update Profile Page Inputs
    if (profileNicknameInput) profileNicknameInput.value = profile.nickname;
    if (profileLevelSelect) profileLevelSelect.value = profile.level;
}

// Called from Onboarding HTML
window.completeOnboarding = function(level) {
    const nicknameInput = document.getElementById('onboard-nickname');
    const nickname = nicknameInput.value.trim();

    if (!nickname) {
        alert('닉네임을 입력해주세요!');
        nicknameInput.focus();
        return;
    }

    const profile = { nickname, level };
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    
    if (onboardingOverlay) onboardingOverlay.classList.remove('active');
    applyUserProfile(profile);
    alert(`${nickname}님, 환영합니다!`);
};

// Called from Profile Page
window.saveProfileChanges = function() {
    const nickname = profileNicknameInput.value.trim();
    const level = profileLevelSelect.value;

    if (!nickname) {
        alert('닉네임을 입력해주세요.');
        return;
    }

    const profile = { nickname, level };
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    applyUserProfile(profile);
    alert('프로필이 수정되었습니다.');
};

function updateLevelBadge(level) {
    if (!userLevelBadge) return;
    const levelNames = {
        'beginner': '초급', 'intermediate': '중급',
        'advanced': '상급', 'masters': '마스터즈', 'elite': '선수'
    };
    userLevelBadge.textContent = levelNames[level] || '레벨 미설정';
}


// --- Workout Logger & Others (No changes to logic, just context) ---
window.addDistance = function(amount) {
    const input = document.getElementById('distance');
    if(input) input.value = (parseInt(input.value)||0) + amount;
}

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
        const mood = document.querySelector('input[name="mood"]:checked')?.value || 'soso';

        if (!date || !distance) return;

        const newWorkout = { date, distance, duration, notes, mood, id: Date.now() };
        const workouts = JSON.parse(localStorage.getItem(WORKOUT_KEY)) || [];
        workouts.push(newWorkout);
        localStorage.setItem(WORKOUT_KEY, JSON.stringify(workouts));

        loadWorkouts();
        // Re-generate plan because volume changed, but need profile level first
        const profile = JSON.parse(localStorage.getItem(PROFILE_KEY));
        if (profile) generateDailyPlan(profile.level);

        workoutForm.reset();
        document.getElementById('date').valueAsDate = new Date();
        alert('오늘의 훈련이 저장되었습니다!');
        navigateTo('dashboard');
    });
}

// --- Competition Records ---
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
        compForm.reset();
        alert('기록이 추가되었습니다!');
    });
}

// --- Daily Plan Modal ---
const planCard = document.querySelector('.main-plan-card');
const workoutModal = document.getElementById('workout-modal');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
let currentDailyPlan = null;

if (planCard) planCard.addEventListener('click', openWorkoutModal);
window.closeWorkoutModal = () => { if(workoutModal) workoutModal.classList.add('hidden'); };

function openWorkoutModal() {
    if (!currentDailyPlan || !workoutModal) return;
    modalTitle.textContent = currentDailyPlan.title;
    let html = '';
    const sections = [{key:'warmup',title:'🔥 웜업'},{key:'drill',title:'🛠️ 드릴'},{key:'main',title:'🏊 메인 세트'},{key:'cooldown',title:'❄️ 쿨다운'}];
    sections.forEach(sec => {
        if(currentDailyPlan[sec.key]?.length > 0) {
            html += `<div class="workout-section"><h4>${sec.title}</h4>`;
            currentDailyPlan[sec.key].forEach(set => {
                html += `<div class="workout-item"><span class="set-dist">${set.dist}</span><span>${set.desc}</span></div>`;
            });
            html += `</div>`;
        }
    });
    modalBody.innerHTML = html;
    workoutModal.classList.remove('hidden');
}

function generateDailyPlan(level = 'beginner') { // Default to beginner if missing
    const planText = document.getElementById('daily-plan-text');
    if (!planText) return;

    const PLANS = {
        'beginner': {
            title: "초급: 기초 다지기 (1000m)",
            desc: "호흡 패턴 안정화 및 킥 밸런스",
            warmup: [{dist: '200m', desc: '자유형 천천히 (50m x 4)'}],
            drill: [{dist: '200m', desc: '킥판 잡고 발차기 (25m x 8)'}, {dist: '200m', desc: '사이드 킥'}],
            main: [{dist: '300m', desc: '자유형 50m x 6 (휴식 30초)'}],
            cooldown: [{dist: '100m', desc: '걷기 또는 배영'}]
        },
        'intermediate': {
            title: "중급: 유산소 지구력 (1800m)",
            desc: "스트로크 효율(DPS) 향상",
            warmup: [{dist: '300m', desc: '자유형 200m + 배영 100m'}],
            drill: [{dist: '300m', desc: '주먹 쥐고 자유형'}],
            main: [{dist: '1000m', desc: '100m x 10 @ 2:00 (일정한 페이스)'}],
            cooldown: [{dist: '200m', desc: '이지 스윔'}]
        },
        'advanced': {
            title: "상급: 역치 향상 (2800m)",
            desc: "고강도 인터벌 및 페이스 조절",
            warmup: [{dist: '600m', desc: 'SKPS 혼합'}],
            drill: [{dist: '400m', desc: '개인혼영 드릴'}],
            main: [{dist: '1500m', desc: '200m x 4 (Desc) + 100m x 7 (Hard)'}],
            cooldown: [{dist: '300m', desc: '부드럽게 풀기'}]
        },
        'masters': {
            title: "마스터즈: 실전 시뮬레이션 (3200m)",
            desc: "스타트, 턴, 피니시 집중",
            warmup: [{dist: '800m', desc: '믹스 웜업'}],
            drill: [],
            main: [{dist: '2000m', desc: 'Broken 200m x 4 + 50m x 8 Sprint'}],
            cooldown: [{dist: '400m', desc: '회복 수영'}]
        },
        'elite': {
            title: "선수: 파워 트레이닝 (5000m+)",
            desc: "젖산 내성 및 한계 돌파",
            warmup: [{dist: '1500m', desc: '에어로빅 베이스'}],
            drill: [{dist: '500m', desc: '테크닉 교정'}],
            main: [{dist: '2500m', desc: 'Threshold Set'}],
            cooldown: [{dist: '500m', desc: '정리 운동'}]
        }
    };
    const selectedPlan = PLANS[level] || PLANS['beginner'];
    currentDailyPlan = selectedPlan;
    planText.innerHTML = `<strong>${selectedPlan.title}</strong><br><span style="font-size:0.9rem; color:#718096">${selectedPlan.desc}</span>`;
}

// --- Analysis Controls (unchanged logic) ---
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

const EVENTS_25M = [
    { id: 'free50', name: '자유형 50m' },
    { id: 'free100', name: '자유형 100m' },
    { id: 'back50', name: '배영 50m' },
    { id: 'back100', name: '배영 100m' },
    { id: 'breast50', name: '평영 50m' },
    { id: 'breast100', name: '평영 100m' },
    { id: 'fly50', name: '접영 50m' },
    { id: 'fly100', name: '접영 100m' },
    { id: 'im100', name: '개인혼영 100m' },
    { id: 'relay200f', name: '계영 200m' },
    { id: 'relay200m', name: '혼계영 200m' }
];

const EVENTS_50M = [
    { id: 'free50', name: '자유형 50m' },
    { id: 'free100', name: '자유형 100m' },
    { id: 'back50', name: '배영 50m' },
    { id: 'back100', name: '배영 100m' },
    { id: 'breast50', name: '평영 50m' },
    { id: 'breast100', name: '평영 100m' },
    { id: 'fly50', name: '접영 50m' },
    { id: 'fly100', name: '접영 100m' },
    { id: 'im200', name: '개인혼영 200m' },
    { id: 'relay400f', name: '계영 400m' },
    { id: 'relay200m', name: '혼계영 200m' }
];

function initAnalysisControls() {
    if(!poolSelect || !eventSelect) return;
    poolSelect.addEventListener('change', updateEventOptions);
    updateEventOptions();

    // Re-attach event listeners robustly
    if (uploadZone && fileInput) {
        // Remove existing listeners to prevent duplicates (clean slate approach)
        const newUploadZone = uploadZone.cloneNode(true);
        uploadZone.parentNode.replaceChild(newUploadZone, uploadZone);
        
        // Re-select fresh element
        const freshUploadZone = document.getElementById('upload-zone');
        
        freshUploadZone.addEventListener('click', () => fileInput.click());
        
        fileInput.onchange = (e) => { 
            if (e.target.files.length > 0) handleFile(e.target.files[0]); 
        };

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(ev => {
            freshUploadZone.addEventListener(ev, (e) => {
                e.preventDefault(); 
                e.stopPropagation();
            }, false);
        });

        freshUploadZone.addEventListener('drop', (e) => { 
            if (e.dataTransfer.files.length > 0) handleFile(e.dataTransfer.files[0]); 
        });
    }
}
function updateEventOptions() {
    const pool = poolSelect.value;
    const events = pool === '25' ? EVENTS_25M : EVENTS_50M;
    eventSelect.innerHTML = events.map(ev => `<option value="${ev.id}">${ev.name}</option>`).join('');
}
function handleFile(file) {
    if (!file.type.startsWith('video/')) { alert('동영상 파일만 업로드 가능합니다.'); return; }
    if (file.size > 500 * 1024 * 1024) { alert('파일 크기가 너무 큽니다. (최대 500MB)'); return; }
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
        setupLaneTabs();
        generateAdvancedMockData(1);
    }, 2500);
}
function setupLaneTabs() {
    laneTabsContainer.innerHTML = '';
    for(let i=1; i<=8; i++) {
        const tab = document.createElement('div');
        tab.className = `lane-tab ${i === 1 ? 'active' : ''}`;
        tab.textContent = `레인 ${i}`;
        tab.onclick = () => {
            document.querySelectorAll('.lane-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            generateAdvancedMockData(i);
        };
        laneTabsContainer.appendChild(tab);
    }
}
function generateAdvancedMockData(laneNum) {
    resBadgeLane.textContent = `Lane ${laneNum}`;
    const pool = poolSelect.value;
    const eventId = eventSelect.value;
    const eventName = eventSelect.options[eventSelect.selectedIndex].text;
    resBadgePool.textContent = `${pool}m 풀`;
    resBadgeEvent.textContent = eventName;
    const totalTime = (Math.random() * 5 + 30).toFixed(2);
    const efficiency = Math.floor(Math.random() * 35 + 60);
    const reaction = (Math.random() * 0.4 + 0.5).toFixed(2);
    resTotalTime.textContent = `${totalTime}초`;
    resEfficiency.textContent = `${efficiency}점`;
    resReaction.textContent = `${reaction}초`;
    let solution = "";
    if (parseFloat(reaction) > 0.75) solution = "🚀 <strong>스타트 반응 개선:</strong> 반응속도가 느립니다.";
    else if (efficiency < 70) solution = "🌊 <strong>효율성 저하:</strong> 스컬링 드릴을 추천합니다.";
    else solution = "✨ <strong>좋은 퍼포먼스:</strong> 기록 단축을 위해 돌핀킥을 강화하세요.";
    aiSolutionText.innerHTML = solution;
    let headerHtml = '', bodyHtml = '';
    if (eventId.includes('relay')) {
        headerHtml = `<tr><th>주자</th><th>반응(RT)</th><th>구간</th><th>누적</th></tr>`;
        let cum = 0;
        bodyHtml = ['1번', '2번', '3번', '4번'].map((s, idx) => {
            const split = (parseFloat(totalTime)/4).toFixed(2);
            cum += parseFloat(split);
            return `<tr><td>${s}</td><td>${idx===0?reaction:'0.23'}s</td><td>${split}s</td><td>${cum.toFixed(2)}s</td></tr>`;
        }).join('');
    } else {
        headerHtml = `<tr><th>구간</th><th>스트로크</th><th>호흡</th><th>기록</th></tr>`;
        bodyHtml = `<tr><td>전체</td><td>${Math.floor(Math.random()*10+30)}</td><td>12</td><td>${totalTime}s</td></tr>`;
    }
    splitsHead.innerHTML = headerHtml;
    splitsBody.innerHTML = bodyHtml;
}