console.log('일일 스위밍 코치 앱 초기화 시작 (클럽 기능 강화 버전)');

// --- Global Error Handler ---
window.onerror = function(message, source, lineno, colno, error) {
    console.error("Global Error:", message, error);
    return false;
};

// --- Constants ---
const PROFILE_KEY = 'swim_user_profile'; 
const WORKOUT_KEY = 'swim_workouts';
const RECORDS_KEY = 'swim_competition_records';
const CLUB_KEY = 'swim_user_club';
const OLD_LEVEL_KEY = 'swim_user_level';
const CUSTOM_CLUBS_KEY = 'swim_custom_clubs'; // New Key for created clubs

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    try {
        initNavigation();
        safeExecute(checkUserProfile, "Profile Check");
        safeExecute(loadWorkouts, "Load Workouts");
        safeExecute(loadRecords, "Load Records");
        safeExecute(initAnalysisControls, "Init Analysis");
        safeExecute(initClubFeature, "Init Club");
        
        const dateInput = document.getElementById('date');
        if(dateInput) dateInput.valueAsDate = new Date();
    } catch (e) {
        console.error("Critical Initialization Error:", e);
    }
});

function safeExecute(func, name) {
    try { func(); } catch (e) { console.error(`Error in ${name}:`, e); }
}

// --- Navigation (SPA) ---
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link, .nav-item');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target.closest('[data-page]');
            if (target && target.dataset.page) navigateTo(target.dataset.page);
        });
    });
}

window.navigateTo = function(pageId) {
    const targetSection = document.getElementById(`${pageId}-page`);
    if (!targetSection) return;

    const sections = document.querySelectorAll('.page-section');
    sections.forEach(sec => {
        if (sec.id === `${pageId}-page`) {
            sec.classList.remove('hidden');
            sec.classList.add('active');
        } else {
            sec.classList.add('hidden');
            sec.classList.remove('active');
        }
    });

    const navItems = document.querySelectorAll('.mobile-bottom-nav .nav-item');
    const desktopLinks = document.querySelectorAll('.desktop-nav .nav-link');

    [navItems, desktopLinks].forEach(nodeList => {
        nodeList.forEach(item => {
            if (item.dataset.page === pageId) item.classList.add('active');
            else item.classList.remove('active');
        });
    });
    window.scrollTo(0, 0);
};

// --- User Profile ---
const onboardingOverlay = document.getElementById('onboarding-overlay');
const userLevelBadge = document.getElementById('user-level-badge');
const greetingText = document.getElementById('user-greeting');
const dashboardGoalText = document.getElementById('dashboard-goal');
const profileNicknameInput = document.getElementById('profile-nickname');
const profileLevelSelect = document.getElementById('profile-level');
const profileGoalSelect = document.getElementById('profile-goal');

function checkUserProfile() {
    let profile = null;
    try { profile = JSON.parse(localStorage.getItem(PROFILE_KEY)); } catch (e) { localStorage.removeItem(PROFILE_KEY); }

    const oldLevel = localStorage.getItem(OLD_LEVEL_KEY);
    if (oldLevel && !profile) {
        profile = { nickname: '수영인', level: oldLevel, goal: 'endurance' };
        localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
        localStorage.removeItem(OLD_LEVEL_KEY);
    }

    if (!profile || !profile.nickname) {
        if(onboardingOverlay) onboardingOverlay.classList.add('active');
    } else {
        applyUserProfile(profile);
    }
}

function applyUserProfile(profile) {
    if (!profile) return;
    if(greetingText) greetingText.textContent = `안녕하세요, ${profile.nickname}님! 🏊`;
    
    const goalNames = { 'endurance': '지구력 향상', 'speed': '스피드/기록', 'technique': '자세 교정', 'diet': '다이어트', 'competition': '대회 준비' };
    if(dashboardGoalText) dashboardGoalText.textContent = `목표: ${goalNames[profile.goal || 'endurance']}`;

    updateLevelBadge(profile.level);
    generateDailyPlan(profile.level, profile.goal);

    if(profileNicknameInput) profileNicknameInput.value = profile.nickname;
    if(profileLevelSelect) profileLevelSelect.value = profile.level;
    if(profileGoalSelect) profileGoalSelect.value = profile.goal || 'endurance';
}

window.completeOnboarding = function(level) {
    const nicknameInput = document.getElementById('onboard-nickname');
    const nickname = nicknameInput ? nicknameInput.value.trim() : '수영인';
    if (!nickname) { alert('닉네임을 입력해주세요!'); return; }
    const profile = { nickname, level, goal: 'endurance' };
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    if(onboardingOverlay) onboardingOverlay.classList.remove('active');
    applyUserProfile(profile);
    alert(`${nickname}님, 환영합니다!`);
};

window.saveProfileChanges = function() {
    if(!profileNicknameInput) return;
    const nickname = profileNicknameInput.value.trim();
    const level = profileLevelSelect.value;
    const goal = profileGoalSelect.value;
    if (!nickname) { alert('닉네임을 입력해주세요.'); return; }
    const profile = { nickname, level, goal };
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    applyUserProfile(profile);
    alert('프로필이 수정되었습니다.');
};

function updateLevelBadge(level) {
    if (!userLevelBadge) return;
    const levelNames = { 'beginner': '초급', 'intermediate': '중급', 'advanced': '상급', 'masters': '마스터즈', 'elite': '선수' };
    userLevelBadge.textContent = levelNames[level] || '레벨 미설정';
}

// --- Daily Plan Logic ---
let currentDailyPlan = null;
function generateDailyPlan(level = 'beginner', goal = 'endurance') {
    const planText = document.getElementById('daily-plan-text');
    if (!planText) return;

    const validLevels = ['beginner', 'intermediate', 'advanced', 'masters', 'elite'];
    if (!validLevels.includes(level)) level = 'beginner';
    const validGoals = ['endurance', 'speed', 'technique', 'diet', 'competition'];
    if (!validGoals.includes(goal)) goal = 'endurance';

    const baseDist = { 'beginner': 800, 'intermediate': 1500, 'advanced': 2500, 'masters': 3000, 'elite': 4500 };
    let dist = baseDist[level];
    let plan = { title: "", desc: "", warmup: [], drill: [], main: [], cooldown: [] };

    if (goal === 'technique') {
        plan.title = "자세 교정 (Technique)"; plan.desc = "스트로크 효율성(DPS) 집중 훈련"; dist = Math.floor(dist * 0.8);
        plan.warmup = [{dist: `${Math.floor(dist*0.2)}m`, desc: '천천히 수영하며 몸 풀기'}];
        plan.drill = [{dist: `${Math.floor(dist*0.3)}m`, desc: '스컬링 및 한팔 접영'}];
        plan.main = [{dist: `${Math.floor(dist*0.4)}m`, desc: `50m x ${Math.max(1, Math.floor((dist*0.4)/50))} (스트로크 수 줄이기)`}];
        plan.cooldown = [{dist: `${Math.floor(dist*0.1)}m`, desc: '이지 스윔'}];
    } else if (goal === 'speed') {
        plan.title = "스피드 (Sprint)"; plan.desc = "짧고 강한 인터벌 훈련";
        plan.warmup = [{dist: `${Math.floor(dist*0.2)}m`, desc: '기본 웜업 + 대시 4회'}];
        plan.drill = [{dist: `${Math.floor(dist*0.1)}m`, desc: '스타트 및 턴 연습'}];
        plan.main = [{dist: `${Math.floor(dist*0.5)}m`, desc: `25m/50m 고강도 인터벌`}];
        plan.cooldown = [{dist: `${Math.floor(dist*0.2)}m`, desc: '회복 수영'}];
    } else if (goal === 'diet') {
        plan.title = "다이어트 (Burn)"; plan.desc = "휴식 시간을 줄인 지속 훈련";
        plan.warmup = [{dist: `${Math.floor(dist*0.2)}m`, desc: '자유형 콤비'}];
        plan.drill = [{dist: `${Math.floor(dist*0.1)}m`, desc: '킥판 발차기'}];
        plan.main = [{dist: `${Math.floor(dist*0.6)}m`, desc: `100m 반복 (휴식 10초)`}];
        plan.cooldown = [{dist: `${Math.floor(dist*0.1)}m`, desc: '걷기'}];
    } else if (goal === 'competition') {
        plan.title = "대회 준비 (Race)"; plan.desc = "실전 페이스 적응 훈련";
        plan.warmup = [{dist: `${Math.floor(dist*0.2)}m`, desc: '웜업 + 다이빙 2회'}];
        plan.drill = [{dist: `${Math.floor(dist*0.1)}m`, desc: '브레이크아웃 연습'}];
        plan.main = [{dist: `${Math.floor(dist*0.5)}m`, desc: `Broken Swim (대회 페이스)`}];
        plan.cooldown = [{dist: `${Math.floor(dist*0.2)}m`, desc: '젖산 제거'}];
    } else { 
        plan.title = "지구력 (Endurance)"; plan.desc = "일정한 페이스 유지 훈련"; dist = Math.floor(dist * 1.1);
        plan.warmup = [{dist: `${Math.floor(dist*0.15)}m`, desc: '조깅 페이스 수영'}];
        plan.drill = [{dist: `${Math.floor(dist*0.1)}m`, desc: '주먹 쥐고 수영'}];
        plan.main = [{dist: `${Math.floor(dist*0.6)}m`, desc: `LSD (Long Slow Distance)`}];
        plan.cooldown = [{dist: `${Math.floor(dist*0.15)}m`, desc: '스트레칭'}];
    }
    currentDailyPlan = plan; 
    planText.innerHTML = `<strong>[${level.toUpperCase()}] ${plan.title}</strong><br><span style="font-size:0.9rem; color:#718096">${plan.desc}</span>`;
}

// --- Workout Data ---
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
window.addDistance = (amount) => { const el = document.getElementById('distance'); if(el) el.value = (parseInt(el.value)||0)+amount; };
const workoutForm = document.getElementById('swim-log-form');
if(workoutForm) {
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
        alert('저장되었습니다.');
        navigateTo('dashboard');
    });
}

// --- Records ---
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
                li.innerHTML = `<div class="rec-meta"><span class="rec-event">${rec.event}</span><span class="rec-name">${rec.name} (${rec.date})</span></div><span class="rec-time">${rec.time}</span>`;
                recordsList.appendChild(li);
            });
        }
    }
    if (prDisplay && records.length > 0) {
        const recent = records[0];
        prDisplay.textContent = `${recent.event}: ${recent.time}`;
    } else if (prDisplay) {
        prDisplay.textContent = '기록 없음';
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
        alert('기록이 추가되었습니다!');
        compForm.reset();
    });
}

// --- Analysis ---
function initAnalysisControls() {
    const poolSelect = document.getElementById('ana-pool-length');
    const eventSelect = document.getElementById('ana-event-type');
    if(!poolSelect || !eventSelect) return;
    poolSelect.removeEventListener('change', updateEventOptions);
    poolSelect.addEventListener('change', updateEventOptions);
    updateEventOptions();
    const oldZone = document.getElementById('upload-zone');
    if (oldZone) {
        const fileInput = document.getElementById('video-upload');
        if (!fileInput) return;
        const newZone = oldZone.cloneNode(true);
        oldZone.parentNode.replaceChild(newZone, oldZone);
        const freshZone = document.getElementById('upload-zone');
        freshZone.addEventListener('click', () => fileInput.click());
        fileInput.onchange = (e) => { if (e.target.files.length > 0) handleFile(e.target.files[0]); };
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            freshZone.addEventListener(eventName, (e) => { e.preventDefault(); e.stopPropagation(); }, false);
        });
        freshZone.addEventListener('drop', (e) => { if (e.dataTransfer.files.length > 0) handleFile(e.dataTransfer.files[0]); });
    }
}
const EVENTS_25M = [{id:'free50',name:'자유형 50m'},{id:'free100',name:'자유형 100m'},{id:'back50',name:'배영 50m'},{id:'back100',name:'배영 100m'},{id:'breast50',name:'평영 50m'},{id:'breast100',name:'평영 100m'},{id:'fly50',name:'접영 50m'},{id:'fly100',name:'접영 100m'},{id:'im100',name:'개인혼영 100m'},{id:'relay200f',name:'계영 200m'}];
const EVENTS_50M = [{id:'free50',name:'자유형 50m'},{id:'free100',name:'자유형 100m'},{id:'back50',name:'배영 50m'},{id:'back100',name:'배영 100m'},{id:'breast50',name:'평영 50m'},{id:'breast100',name:'평영 100m'},{id:'fly50',name:'접영 50m'},{id:'fly100',name:'접영 100m'},{id:'im200',name:'개인혼영 200m'},{id:'relay400f',name:'계영 400m'}];
function updateEventOptions() {
    const poolSelect = document.getElementById('ana-pool-length');
    const eventSelect = document.getElementById('ana-event-type');
    if(!poolSelect || !eventSelect) return;
    const events = poolSelect.value === '25' ? EVENTS_25M : EVENTS_50M;
    eventSelect.innerHTML = events.map(ev => `<option value="${ev.id}">${ev.name}</option>`).join('');
}
function handleFile(file) {
    if (!file.type.startsWith('video/')) { alert('동영상 파일만 업로드 가능합니다.'); return; }
    startAnalysisSimulation(file);
}
function startAnalysisSimulation(file) {
    const zone = document.getElementById('upload-zone');
    const res = document.getElementById('analysis-results');
    const loader = document.getElementById('analysis-loader');
    const card = document.querySelector('.result-card');
    if(zone) zone.classList.add('hidden');
    if(res) res.classList.remove('hidden');
    if(loader) loader.classList.remove('hidden');
    if(card) card.classList.add('hidden');
    setTimeout(() => {
        if(loader) loader.classList.add('hidden');
        if(card) card.classList.remove('hidden');
        setupLaneTabs();
        generateAdvancedMockData(1);
    }, 2500);
}
function setupLaneTabs() {
    const container = document.getElementById('lane-tabs');
    if(!container) return;
    container.innerHTML = '';
    for(let i=1; i<=8; i++) {
        const tab = document.createElement('div');
        tab.className = `lane-tab ${i===1?'active':''}`;
        tab.textContent = `레인 ${i}`;
        tab.onclick = () => {
            document.querySelectorAll('.lane-tab').forEach(t=>t.classList.remove('active'));
            tab.classList.add('active');
            generateAdvancedMockData(i);
        };
        container.appendChild(tab);
    }
}
function generateAdvancedMockData(laneNum) {
    const resLane = document.getElementById('res-badge-lane');
    const resPool = document.getElementById('res-badge-pool');
    const resEvent = document.getElementById('res-badge-event');
    const resTotal = document.getElementById('res-total-time');
    const resEff = document.getElementById('res-efficiency');
    const resReact = document.getElementById('res-reaction');
    const aiText = document.getElementById('ai-solution-text');
    const splitsHead = document.getElementById('splits-head');
    const splitsBody = document.getElementById('splits-body');
    if(resLane) resLane.textContent = `Lane ${laneNum}`;
    
    const poolSelect = document.getElementById('ana-pool-length');
    const eventSelect = document.getElementById('ana-event-type');
    const pool = poolSelect ? poolSelect.value : '25';
    const eventName = eventSelect && eventSelect.options.length > 0 ? eventSelect.options[eventSelect.selectedIndex].text : '자유형 50m';
    if(resPool) resPool.textContent = `${pool}m 풀`;
    if(resEvent) resEvent.textContent = eventName;

    const totalTime = (30 + Math.random() * 10).toFixed(2);
    const efficiency = Math.floor(60 + Math.random() * 35);
    const reaction = (0.5 + Math.random() * 0.4).toFixed(2);
    if(resTotal) resTotal.textContent = `${totalTime}초`;
    if(resEff) resEff.textContent = `${efficiency}점`;
    if(resReact) resReact.textContent = `${reaction}초`;

    let solution = "";
    if (parseFloat(reaction) > 0.75) solution = "🚀 <strong>스타트 반응 개선:</strong> 반응속도가 느립니다. 점프 훈련이 필요합니다.";
    else if (efficiency < 70) solution = "🌊 <strong>효율성 저하:</strong> 물을 잡는 힘이 부족합니다. 스컬링 드릴을 추천합니다.";
    else solution = "✨ <strong>좋은 퍼포먼스:</strong> 기록 단축을 위해 돌핀킥 거리를 늘려보세요.";
    if(aiText) aiText.innerHTML = solution;

    let headerHtml = `<tr><th>구간</th><th>스트로크</th><th>호흡</th><th>기록</th></tr>`;
    let bodyHtml = `<tr><td>전체</td><td>${Math.floor(Math.random()*15+30)}</td><td>12</td><td>${totalTime}s</td></tr>`;
    const eventId = eventSelect ? eventSelect.value : 'free50';
    if (eventId.includes('relay')) {
        headerHtml = `<tr><th>주자</th><th>반응(RT)</th><th>구간</th><th>누적</th></tr>`;
        let cum = 0;
        bodyHtml = ['1번', '2번', '3번', '4번'].map((s, idx) => {
            const split = (parseFloat(totalTime)/4).toFixed(2);
            cum += parseFloat(split);
            return `<tr><td>${s}</td><td>${idx===0?reaction:'0.23'}s</td><td>${split}s</td><td>${cum.toFixed(2)}s</td></tr>`;
        }).join('');
    } else if (eventId.includes('im')) {
        headerHtml = `<tr><th>영법</th><th>스트로크</th><th>턴</th><th>기록</th></tr>`;
        const strokes = ['접영', '배영', '평영', '자유형'];
        bodyHtml = strokes.map(s => {
            return `<tr><td>${s}</td><td>${Math.floor(Math.random()*10+5)}</td><td>${(Math.random()+0.5).toFixed(2)}s</td><td>${(parseFloat(totalTime)/4).toFixed(2)}s</td></tr>`;
        }).join('');
    }
    if(splitsHead) splitsHead.innerHTML = headerHtml;
    if(splitsBody) splitsBody.innerHTML = bodyHtml;
}

// --- Club Feature (Creation & Sharing) ---
const DEFAULT_CLUBS = [
    { id: 'seoul_dolphins', name: '서울 돌핀스', desc: '서울 지역 직장인 수영 모임', icon: '🐬', type: 'public' },
    { id: 'busan_marine', name: '부산 마린보이', desc: '해운대 바다수영 & 실내수영', icon: '🌊', type: 'public' },
    { id: 'gangnam_sharks', name: '강남 샤크', desc: '새벽반 마스터즈 훈련 팀', icon: '🦈', type: 'public' }
];

function getClubs() {
    const customClubs = JSON.parse(localStorage.getItem(CUSTOM_CLUBS_KEY)) || [];
    return [...DEFAULT_CLUBS, ...customClubs];
}

function initClubFeature() {
    const savedClubId = localStorage.getItem(CLUB_KEY);
    if (savedClubId) showClubDashboard(savedClubId);
    else showClubSelection();
}

// Create Club Modal Logic
const createClubModal = document.getElementById('create-club-modal');
const createClubForm = document.getElementById('create-club-form');
window.openCreateClubModal = () => createClubModal.classList.remove('hidden');
window.closeCreateClubModal = () => createClubModal.classList.add('hidden');
window.toggleClubPassword = () => {
    const type = document.getElementById('new-club-type').value;
    const group = document.getElementById('club-password-group');
    if(type === 'private') group.classList.remove('hidden');
    else group.classList.add('hidden');
};

if(createClubForm) {
    createClubForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('new-club-name').value;
        const desc = document.getElementById('new-club-desc').value;
        const icon = document.getElementById('new-club-icon').value;
        const type = document.getElementById('new-club-type').value;
        const password = document.getElementById('new-club-password').value;

        if(type === 'private' && password.length < 1) {
            alert('비공개 클럽은 비밀번호가 필요합니다.');
            return;
        }

        const newClub = { id: 'custom_' + Date.now(), name, desc, icon, type, password };
        const customClubs = JSON.parse(localStorage.getItem(CUSTOM_CLUBS_KEY)) || [];
        customClubs.push(newClub);
        localStorage.setItem(CUSTOM_CLUBS_KEY, JSON.stringify(customClubs));

        alert('클럽이 생성되었습니다!');
        closeCreateClubModal();
        joinClub(newClub.id, true); // Auto join as leader
    });
}

function showClubSelection() {
    const selectionView = document.getElementById('club-selection-view');
    const dashboardView = document.getElementById('club-dashboard-view');
    const clubList = document.getElementById('club-list');
    if(!selectionView || !dashboardView || !clubList) return;

    selectionView.classList.remove('hidden');
    dashboardView.classList.add('hidden');
    
    const allClubs = getClubs();
    clubList.innerHTML = allClubs.map(club => `
        <div class="club-card" onclick="joinClub('${club.id}')">
            <div class="club-icon">${club.icon}</div>
            <div class="club-details">
                <h3>${club.name} ${club.type==='private'?'🔒':''}</h3>
                <p>${club.desc}</p>
            </div>
        </div>
    `).join('');
}

window.joinClub = function(clubId, skipConfirm = false) {
    const allClubs = getClubs();
    const club = allClubs.find(c => c.id === clubId);
    if(!club) return;

    if(club.type === 'private' && !skipConfirm) {
        const input = prompt('클럽 비밀번호를 입력하세요:');
        if(input !== club.password) { alert('비밀번호가 틀렸습니다.'); return; }
    } else if (!skipConfirm && !confirm(`${club.name}에 가입하시겠습니까?`)) {
        return;
    }

    localStorage.setItem(CLUB_KEY, clubId);
    showClubDashboard(clubId);
};

window.leaveClub = function() {
    if(confirm('정말 탈퇴하시겠습니까?')) {
        localStorage.removeItem(CLUB_KEY);
        showClubSelection();
    }
};

window.switchClubTab = function(tabName) {
    document.querySelectorAll('.club-tab-content').forEach(el => el.classList.add('hidden'));
    document.getElementById(`club-tab-${tabName}`).classList.remove('hidden');
    
    document.querySelectorAll('#club-tabs .lane-tab').forEach(el => el.classList.remove('active'));
    // Simple way to active class - relying on order or text would be brittle, so just visual toggle for now
    // Ideally add IDs to tabs
};

function showClubDashboard(clubId) {
    const selectionView = document.getElementById('club-selection-view');
    const dashboardView = document.getElementById('club-dashboard-view');
    const allClubs = getClubs();
    const club = allClubs.find(c => c.id === clubId);
    
    if (!club) { localStorage.removeItem(CLUB_KEY); showClubSelection(); return; }

    selectionView.classList.add('hidden');
    dashboardView.classList.remove('hidden');

    document.getElementById('my-club-name').textContent = club.name;
    document.getElementById('my-club-desc').textContent = club.desc;
    document.getElementById('my-club-icon').textContent = club.icon;
    const typeBadge = document.getElementById('my-club-type');
    if(typeBadge) typeBadge.textContent = club.type === 'private' ? 'Private' : 'Public';

    // Mock Leaderboard
    const leaderboardList = document.getElementById('team-leaderboard');
    if(leaderboardList) {
        const MOCK = [
            { name: '김물개', level: 'advanced', record: '28.12' },
            { name: '이인어', level: 'elite', record: '24.88' },
            { name: '박수영', level: 'masters', record: '26.54' }
        ];
        const profile = JSON.parse(localStorage.getItem(PROFILE_KEY)) || { nickname: '나' };
        MOCK.push({ name: `${profile.nickname} (나)`, level: profile.level, record: '30.00', isMe: true });
        MOCK.sort((a,b) => parseFloat(a.record) - parseFloat(b.record));
        
        leaderboardList.innerHTML = MOCK.map((m, i) => `
            <li class="leaderboard-item">
                <span class="rank ${i<3?'top-3':''}">${i+1}</span>
                <div class="member-info"><span class="member-name ${m.isMe?'me':''}">${m.name}</span></div>
                <span class="member-record">${m.record}</span>
            </li>
        `).join('');
    }
}

// Post to Board (Simulation)
window.postToBoard = function() {
    const feed = document.getElementById('club-feed');
    const profile = JSON.parse(localStorage.getItem(PROFILE_KEY)) || { nickname: '나' };
    const html = `
        <div class="feed-item">
            <div class="feed-head">
                <span class="feed-user">${profile.nickname}</span>
                <span class="feed-time">방금 전</span>
            </div>
            <p class="feed-content">오늘 기록 측정 완료! 기록이 좋아졌어요 🔥</p>
        </div>
    `;
    feed.insertAdjacentHTML('afterbegin', html);
    alert('게시글이 등록되었습니다.');
};

// --- Daily Plan Modal ---
const workoutModal = document.getElementById('workout-modal');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
if(planCard) planCard.addEventListener('click', openWorkoutModal);
window.closeWorkoutModal = () => { if(workoutModal) workoutModal.classList.add('hidden'); };

function openWorkoutModal() {
    if (!currentDailyPlan || !workoutModal) return;
    modalTitle.textContent = currentDailyPlan.title;
    let html = '';
    const sections = [{key:'warmup',title:'🔥 웜업'},{key:'drill',title:'🛠️ 드릴'},{key:'main',title:'🏊 메인 세트'},{key:'cooldown',title:'❄️ 쿨다운'}];
    sections.forEach(sec => {
        if(currentDailyPlan[sec.key] && currentDailyPlan[sec.key].length > 0) {
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