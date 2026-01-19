console.log('일일 스위밍 코치 앱 초기화됨');

const PROFILE_KEY = 'swim_user_profile'; 
const WORKOUT_KEY = 'swim_workouts';
const RECORDS_KEY = 'swim_competition_records';
const CLUB_KEY = 'swim_user_club'; // New Key for Club ID

// --- 1. Initialization (Fixing the blocking issue) ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Init Navigation FIRST so UI is responsive even if data fails
    initNavigation(); 
    
    // 2. Load Data & Logic
    try {
        checkUserProfile();
        loadWorkouts();
        loadRecords();
        initAnalysisControls();
        initClubFeature(); // Initialize Club Logic
        
        // Set default date
        const dateInput = document.getElementById('date');
        if(dateInput) dateInput.valueAsDate = new Date();
    } catch (e) {
        console.error("Initialization Error:", e);
        // Fallback: Ensure critical UI parts are at least hidden/shown correctly
    }
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

// --- User Profile & Persistence (Robust) ---
const onboardingOverlay = document.getElementById('onboarding-overlay');
const userLevelBadge = document.getElementById('user-level-badge');
const greetingText = document.getElementById('user-greeting');
const dashboardGoalText = document.getElementById('dashboard-goal');
const profileNicknameInput = document.getElementById('profile-nickname');
const profileLevelSelect = document.getElementById('profile-level');
const profileGoalSelect = document.getElementById('profile-goal');

// Migrate old key if exists
const OLD_LEVEL_KEY = 'swim_user_level';

function checkUserProfile() {
    const oldLevel = localStorage.getItem(OLD_LEVEL_KEY);
    let profile = null;
    
    try {
        profile = JSON.parse(localStorage.getItem(PROFILE_KEY));
    } catch(e) {
        console.warn("Profile parse error, resetting");
    }

    if (oldLevel && !profile) {
        profile = { nickname: '수영인', level: oldLevel, goal: 'endurance' };
        localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
        localStorage.removeItem(OLD_LEVEL_KEY);
    }

    if (!profile || !profile.nickname) {
        if (onboardingOverlay) onboardingOverlay.classList.add('active');
    } else {
        applyUserProfile(profile);
    }
}

function applyUserProfile(profile) {
    if(!profile) return;

    if (greetingText) greetingText.textContent = `안녕하세요, ${profile.nickname}님! 🏊`;
    
    const goalNames = {
        'endurance': '지구력 향상', 'speed': '스피드/기록', 'technique': '자세 교정',
        'diet': '다이어트', 'competition': '대회 준비'
    };
    if (dashboardGoalText) dashboardGoalText.textContent = `목표: ${goalNames[profile.goal || 'endurance']}`;

    updateLevelBadge(profile.level);
    generateDailyPlan(profile.level, profile.goal);

    if (profileNicknameInput) profileNicknameInput.value = profile.nickname;
    if (profileLevelSelect) profileLevelSelect.value = profile.level;
    if (profileGoalSelect) profileGoalSelect.value = profile.goal || 'endurance';
}

window.completeOnboarding = function(level) {
    const nicknameInput = document.getElementById('onboard-nickname');
    const nickname = nicknameInput.value.trim();
    if (!nickname) { alert('닉네임을 입력해주세요!'); nicknameInput.focus(); return; }

    const profile = { nickname, level, goal: 'endurance' };
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    
    if (onboardingOverlay) onboardingOverlay.classList.remove('active');
    applyUserProfile(profile);
    alert(`${nickname}님, 환영합니다!`);
};

window.saveProfileChanges = function() {
    const nickname = profileNicknameInput.value.trim();
    const level = profileLevelSelect.value;
    const goal = profileGoalSelect.value;

    if (!nickname) { alert('닉네임을 입력해주세요.'); return; }

    const profile = { nickname, level, goal };
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    applyUserProfile(profile);
    alert('프로필 및 목표가 수정되었습니다.');
};

function updateLevelBadge(level) {
    if (!userLevelBadge) return;
    const levelNames = {
        'beginner': '초급', 'intermediate': '중급',
        'advanced': '상급', 'masters': '마스터즈', 'elite': '선수'
    };
    userLevelBadge.textContent = levelNames[level] || '레벨 미설정';
}

// --- Club Feature (New) ---
const CLUB_DATA = [
    { id: 'seoul_dolphins', name: '서울 돌핀스', desc: '서울 지역 직장인 수영 모임', icon: '🐬' },
    { id: 'busan_marine', name: '부산 마린보이', desc: '해운대 바다수영 & 실내수영', icon: '🌊' },
    { id: 'gangnam_sharks', name: '강남 샤크', desc: '새벽반 마스터즈 훈련 팀', icon: '🦈' },
    { id: 'mapo_turtles', name: '마포 거북이', desc: '천천히 오래 수영하는 모임', icon: '🐢' }
];

const MOCK_MEMBERS = [
    { name: '박수영', level: 'masters', record: '26.54' },
    { name: '김물개', level: 'advanced', record: '28.12' },
    { name: '이인어', level: 'elite', record: '24.88' },
    { name: '최초보', level: 'beginner', record: '45.20' },
    { name: '정배영', level: 'intermediate', record: '32.40' }
];

function initClubFeature() {
    const savedClubId = localStorage.getItem(CLUB_KEY);
    if (savedClubId) {
        showClubDashboard(savedClubId);
    } else {
        showClubSelection();
    }
}

function showClubSelection() {
    const selectionView = document.getElementById('club-selection-view');
    const dashboardView = document.getElementById('club-dashboard-view');
    const clubList = document.getElementById('club-list');
    
    selectionView.classList.remove('hidden');
    dashboardView.classList.add('hidden');
    
    clubList.innerHTML = CLUB_DATA.map(club => `
        <div class="club-card" onclick="joinClub('${club.id}')">
            <div class="club-icon">${club.icon}</div>
            <div class="club-details">
                <h3>${club.name}</h3>
                <p>${club.desc}</p>
            </div>
        </div>
    `).join('');
}

window.joinClub = function(clubId) {
    if(confirm('이 클럽에 가입하시겠습니까?')) {
        localStorage.setItem(CLUB_KEY, clubId);
        showClubDashboard(clubId);
    }
};

window.leaveClub = function() {
    if(confirm('정말 탈퇴하시겠습니까?')) {
        localStorage.removeItem(CLUB_KEY);
        showClubSelection();
    }
};

function showClubDashboard(clubId) {
    const selectionView = document.getElementById('club-selection-view');
    const dashboardView = document.getElementById('club-dashboard-view');
    
    const club = CLUB_DATA.find(c => c.id === clubId);
    if (!club) { // Error handling if club id invalid
        localStorage.removeItem(CLUB_KEY);
        showClubSelection();
        return;
    }

    selectionView.classList.add('hidden');
    dashboardView.classList.remove('hidden');

    // Update Header
    document.getElementById('my-club-name').textContent = club.name;
    document.getElementById('my-club-desc').textContent = club.desc;
    document.getElementById('my-club-icon').textContent = club.icon;

    // Generate Leaderboard
    const leaderboardList = document.getElementById('team-leaderboard');
    
    // Get User Info for Ranking
    const profile = JSON.parse(localStorage.getItem(PROFILE_KEY)) || { nickname: '나', level: 'beginner' };
    const myRecord = "00:00.00"; // Placeholder, real logic would fetch from records

    // Create a combined list and sort
    const members = [...MOCK_MEMBERS, { name: `${profile.nickname} (나)`, level: profile.level, record: '30.00', isMe: true }];
    
    // Simple sort by record string (mock logic)
    members.sort((a, b) => parseFloat(a.record) - parseFloat(b.record));

    leaderboardList.innerHTML = members.map((m, index) => `
        <li class="leaderboard-item">
            <span class="rank ${index < 3 ? 'top-3' : ''}">${index + 1}</span>
            <div class="member-info">
                <span class="member-name ${m.isMe ? 'me' : ''}">${m.name}</span>
                <span class="member-level">${m.level}</span>
            </div>
            <span class="member-record">${m.record}</span>
        </li>
    `).join('');
}


// --- Daily Plan Logic (Fixed & Robust) ---
function generateDailyPlan(level = 'beginner', goal = 'endurance') {
    const planText = document.getElementById('daily-plan-text');
    if (!planText) return;

    // Ensure valid inputs
    const validLevels = ['beginner', 'intermediate', 'advanced', 'masters', 'elite'];
    if (!validLevels.includes(level)) level = 'beginner';
    
    const validGoals = ['endurance', 'speed', 'technique', 'diet', 'competition'];
    if (!validGoals.includes(goal)) goal = 'endurance';

    const baseDist = { 'beginner': 800, 'intermediate': 1500, 'advanced': 2500, 'masters': 3000, 'elite': 4500 };
    let dist = baseDist[level];

    let plan = { title: "", desc: "", warmup: [], drill: [], main: [], cooldown: [] };

    // --- Logic based on GOAL ---
    if (goal === 'technique') {
        plan.title = "자세 교정 (Technique)";
        plan.desc = "스트로크 효율성(DPS) 집중 훈련";
        dist = Math.floor(dist * 0.8);
        plan.warmup = [{dist: `${Math.floor(dist*0.2)}m`, desc: '천천히 수영하며 몸 풀기'}];
        plan.drill = [{dist: `${Math.floor(dist*0.3)}m`, desc: '스컬링 및 한팔 접영'}];
        plan.main = [{dist: `${Math.floor(dist*0.4)}m`, desc: `50m x ${Math.floor((dist*0.4)/50)} (스트로크 수 줄이기)`}];
        plan.cooldown = [{dist: `${Math.floor(dist*0.1)}m`, desc: '이지 스윔'}];
    } else if (goal === 'speed') {
        plan.title = "스피드 (Sprint)";
        plan.desc = "짧고 강한 인터벌 훈련";
        plan.warmup = [{dist: `${Math.floor(dist*0.2)}m`, desc: '기본 웜업 + 대시 4회'}];
        plan.drill = [{dist: `${Math.floor(dist*0.1)}m`, desc: '스타트 및 턴 연습'}];
        plan.main = [{dist: `${Math.floor(dist*0.5)}m`, desc: `25m/50m 고강도 인터벌`}];
        plan.cooldown = [{dist: `${Math.floor(dist*0.2)}m`, desc: '회복 수영'}];
    } else if (goal === 'diet') {
        plan.title = "다이어트 (Burn)";
        plan.desc = "휴식 시간을 줄인 지속 훈련";
        plan.warmup = [{dist: `${Math.floor(dist*0.2)}m`, desc: '자유형 콤비'}];
        plan.drill = [{dist: `${Math.floor(dist*0.1)}m`, desc: '킥판 발차기'}];
        plan.main = [{dist: `${Math.floor(dist*0.6)}m`, desc: `100m 반복 (휴식 10초)`}];
        plan.cooldown = [{dist: `${Math.floor(dist*0.1)}m`, desc: '걷기'}];
    } else if (goal === 'competition') {
        plan.title = "대회 준비 (Race)";
        plan.desc = "실전 페이스 적응 훈련";
        plan.warmup = [{dist: `${Math.floor(dist*0.2)}m`, desc: '웜업 + 다이빙 2회'}];
        plan.drill = [{dist: `${Math.floor(dist*0.1)}m`, desc: '브레이크아웃 연습'}];
        plan.main = [{dist: `${Math.floor(dist*0.5)}m`, desc: `Broken Swim (대회 페이스)`}];
        plan.cooldown = [{dist: `${Math.floor(dist*0.2)}m`, desc: '젖산 제거'}];
    } else { // endurance (default)
        plan.title = "지구력 (Endurance)";
        plan.desc = "일정한 페이스 유지 훈련";
        dist = Math.floor(dist * 1.1);
        plan.warmup = [{dist: `${Math.floor(dist*0.15)}m`, desc: '조깅 페이스 수영'}];
        plan.drill = [{dist: `${Math.floor(dist*0.1)}m`, desc: '주먹 쥐고 수영'}];
        plan.main = [{dist: `${Math.floor(dist*0.6)}m`, desc: `LSD (Long Slow Distance)`}];
        plan.cooldown = [{dist: `${Math.floor(dist*0.15)}m`, desc: '스트레칭'}];
    }

    currentDailyPlan = plan; 
    planText.innerHTML = `<strong>[${level.toUpperCase()}] ${plan.title}</strong><br><span style="font-size:0.9rem; color:#718096">${plan.desc}</span>`;
}

// ... (Other functions mostly unchanged, kept for context) ...
// Ensure Modal and Logger logic is still valid
const planCard = document.querySelector('.main-plan-card');
const workoutModal = document.getElementById('workout-modal');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
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

// Analysis & Upload (Kept consistent with previous fixes)
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

const EVENTS_25M = [{ id: 'free50', name: '자유형 50m' }, { id: 'im100', name: '개인혼영 100m' }, { id: 'relay200f', name: '계영 200m' }];
const EVENTS_50M = [{ id: 'free50', name: '자유형 50m' }, { id: 'im200', name: '개인혼영 200m' }, { id: 'relay400f', name: '계영 400m' }];

function initAnalysisControls() {
    if(!poolSelect || !eventSelect) return;
    poolSelect.addEventListener('change', updateEventOptions);
    updateEventOptions();
    if (uploadZone && fileInput) {
        // Clear old listeners
        const newZone = uploadZone.cloneNode(true);
        uploadZone.parentNode.replaceChild(newZone, uploadZone);
        const freshZone = document.getElementById('upload-zone');
        
        freshZone.addEventListener('click', () => fileInput.click());
        fileInput.onchange = (e) => { if (e.target.files.length > 0) handleFile(e.target.files[0]); };
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(ev => freshZone.addEventListener(ev, e => {e.preventDefault(); e.stopPropagation()}, false));
        freshZone.addEventListener('drop', (e) => { if (e.dataTransfer.files.length > 0) handleFile(e.dataTransfer.files[0]); });
    }
}
function updateEventOptions() {
    const pool = poolSelect.value;
    const events = pool === '25' ? EVENTS_25M : EVENTS_50M;
    eventSelect.innerHTML = events.map(ev => `<option value="${ev.id}">${ev.name}</option>`).join('');
}
function handleFile(file) {
    if (!file.type.startsWith('video/')) { alert('동영상 파일만 업로드 가능합니다.'); return; }
    startAnalysisSimulation(file);
}
function startAnalysisSimulation(file) {
    const zone = document.getElementById('upload-zone');
    if(zone) zone.classList.add('hidden');
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
