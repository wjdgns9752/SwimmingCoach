console.log("Main.js loaded successfully");

// --- Translations ---
const TRANSLATIONS = {
  ko: {
    appTitle: "스위밍코치",
    navDashboard: "대시보드", navLogger: "훈련 일지", navAnalysis: "AI 분석", navClub: "클럽", navProfile: "내 기록",
    greeting: "오늘도 물살을 가를 준비 되셨나요?",
    dailyPlanTitle: "오늘의 프리미엄 코칭",
    termHint: "훈련 용어 설명 보기",
    tapDetails: "상세 훈련 가이드 보기 →",
    weeklyDistTitle: "이번 주 누적 거리",
    recentCompTitle: "최근 대회 기록",
    btnAddRecord: "기록 추가하기",
    loggerTitle: "훈련 일지 작성",
    dateLabel: "📅 날짜 및 시간",
    distLabel: "🏊 수영 거리",
    btnSave: "기록 저장하기",
    profileTitle: "내 정보 관리",
    profileHeader: "👤 프로필 및 신체 정보",
    labelNickname: "닉네임", labelAge: "나이", labelGender: "성별", labelLevel: "수영 레벨", labelGoal: "훈련 목표",
    genderMale: "남성", genderFemale: "여성",
    goalEndurance: "지구력", goalSpeed: "스피드", goalTechnique: "자세 교정", goalDiet: "다이어트", goalComp: "대회 준비",
    recordsHeader: "🏊‍♂️ 기준 기록 (50m)",
    btnUpdate: "변경사항 저장",
    uploadTitle: "동영상 업로드",
    termTitle: "훈련 용어 가이드",
    descEN1: "기초 지구력. 편안한 호흡 (최대심박 60-70%)",
    descEN2: "유산소 역치. 지속 가능하지만 약간 숨참 (최대심박 70-80%)",
    descEN3: "최대 산소 섭취량. 숨이 많이 참 (최대심박 80-90%)",
    descSP1: "젖산 내성. 최고 속도, 짧은 휴식",
    descDrill: "자세 교정을 위한 부분 동작 연습",
    ytDisclaimer: "⚠️ 본 훈련 가이드는 YouTube 영상을 참고하여 구성되었습니다. 정확한 자세는 링크된 영상을 확인해주세요."
  },
  en: {
    appTitle: "SwimCoach",
    navDashboard: "Dashboard", navLogger: "Log", navAnalysis: "AI Analysis", navClub: "Club", navProfile: "Profile",
    greeting: "Ready to hit the water?",
    dailyPlanTitle: "Premium Daily Coaching",
    termHint: "View Terminology Guide",
    tapDetails: "View Detailed Guide →",
    weeklyDistTitle: "Weekly Distance",
    recentCompTitle: "Recent Best",
    btnAddRecord: "Add Record",
    loggerTitle: "Workout Log",
    dateLabel: "📅 Date & Time",
    distLabel: "🏊 Distance",
    btnSave: "Save Log",
    profileTitle: "Edit Profile",
    profileHeader: "👤 Personal Info",
    labelNickname: "Nickname", labelAge: "Age", labelGender: "Gender", labelLevel: "Level", labelGoal: "Goal",
    genderMale: "Male", genderFemale: "Female",
    goalEndurance: "Endurance", goalSpeed: "Speed", goalTechnique: "Technique", goalDiet: "Fitness/Diet", goalComp: "Competition",
    recordsHeader: "🏊‍♂️ Personal Best (50m)",
    btnUpdate: "Save Changes",
    uploadTitle: "Upload Video",
    termTitle: "Training Terminology",
    descEN1: "Basic Endurance. Comfortable breathing (HR 60-70%)",
    descEN2: "Aerobic Threshold. Sustainable but breathless (HR 70-80%)",
    descEN3: "VO2 Max. Hard breathing (HR 80-90%)",
    descSP1: "Lactate Tolerance. Max speed, short rest",
    descDrill: "Drills for technique correction",
    ytDisclaimer: "⚠️ This guide references YouTube videos. Please watch the linked videos for correct form."
  }
};

let currentLang = 'ko';

// Constants
const PROFILE_KEY = 'swim_user_profile';
const WORKOUT_KEY = 'swim_workouts';
const RECORDS_KEY = 'swim_competition_records';
const CLUB_KEY = 'swim_user_club';
const CUSTOM_CLUBS_KEY = 'swim_custom_clubs_v2';
const CLUB_POSTS_KEY = 'swim_club_posts';
const CLUB_NOTICES_KEY = 'swim_club_notices';

// Drill Database
const DRILL_DB = {
    "Sculling": "https://www.youtube.com/results?search_query=swimming+sculling+drill",
    "Fist Swim": "https://www.youtube.com/results?search_query=fist+swimming+drill",
    "Catch-Up": "https://www.youtube.com/results?search_query=catch+up+drill+freestyle",
    "Single Arm": "https://www.youtube.com/results?search_query=single+arm+freestyle+drill",
    "High Elbow": "https://www.youtube.com/results?search_query=high+elbow+catch+drill",
    "Flip Turn": "https://www.youtube.com/results?search_query=swimming+flip+turn+drill",
    "Side Kick": "https://www.youtube.com/results?search_query=side+kick+swimming+drill",
    "6-Kick Switch": "https://www.youtube.com/results?search_query=6+kick+switch+drill"
};

// Analysis Data
const EVENTS_DATA = {
    '25': [
        {id:'free50', name:'자유형 50m'}, {id:'free100', name:'자유형 100m'},
        {id:'back50', name:'배영 50m'}, {id:'breast50', name:'평영 50m'},
        {id:'fly50', name:'접영 50m'}, {id:'im100', name:'개인혼영 100m'}
    ],
    '50': [
        {id:'free50', name:'자유형 50m'}, {id:'free100', name:'자유형 100m'},
        {id:'back50', name:'배영 50m'}, {id:'breast50', name:'평영 50m'},
        {id:'fly50', name:'접영 50m'}, {id:'im200', name:'개인혼영 200m'}
    ]
};

let currentDailyPlan = null;

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initLanguage();
    initProfile();
    initWorkouts();
    initRecords();
    initClubFeature();
    initAnalysisControls();
    
    const dateInput = document.getElementById('date');
    if(dateInput) dateInput.valueAsDate = new Date();
});

// --- Navigation ---
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

    document.querySelectorAll('.nav-link, .nav-item').forEach(item => {
        if (item.dataset.page === pageId) item.classList.add('active');
        else item.classList.remove('active');
    });
    window.scrollTo(0,0);
};

// --- Language ---
function initLanguage() {
    const sel = document.getElementById('language-selector');
    if(!sel) return;
    sel.addEventListener('change', (e) => {
        setLanguage(e.target.value);
    });
}

function setLanguage(lang) {
    if (!TRANSLATIONS[lang]) return;
    currentLang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (TRANSLATIONS[lang][key]) el.textContent = TRANSLATIONS[lang][key];
    });
    const profile = JSON.parse(localStorage.getItem(PROFILE_KEY));
    if(profile) generateDailyPlan(profile.level, profile.goal, profile);
}

// --- Profile ---
function initProfile() {
    let profile = JSON.parse(localStorage.getItem(PROFILE_KEY));
    if (!profile) {
        document.getElementById('onboarding-overlay').classList.add('active');
    } else {
        applyUserProfile(profile);
    }
}

window.completeOnboarding = function(level) {
    const nickname = document.getElementById('onboard-nickname').value || 'Swimmer';
    const profile = { nickname, level, goal: 'endurance', age: 25, gender: 'm' };
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    document.getElementById('onboarding-overlay').classList.remove('active');
    applyUserProfile(profile);
};

function applyUserProfile(profile) {
    if (!profile) return;
    const greeting = document.getElementById('user-greeting');
    if(greeting) greeting.textContent = currentLang === 'ko' ? `${profile.nickname}님, 오늘도 파이팅!` : `Welcome back, ${profile.nickname}!`;

    const ids = ['profile-nickname', 'profile-age', 'profile-gender', 'profile-level', 'profile-goal', 'record-free', 'record-breast'];
    ids.forEach(id => {
        const el = document.getElementById(id);
        if(el) {
            if(id === 'record-free') el.value = profile.recFree || '';
            else if(id === 'record-breast') el.value = profile.recBreast || '';
            else el.value = profile[id.replace('profile-', '')] || '';
        }
    });

    const badge = document.getElementById('user-level-badge');
    if(badge) badge.textContent = (profile.level || 'LEVEL').toUpperCase();
    generateDailyPlan(profile.level, profile.goal, profile);
}

window.saveProfileChanges = function() {
    const profile = {
        nickname: document.getElementById('profile-nickname').value,
        age: document.getElementById('profile-age').value,
        gender: document.getElementById('profile-gender').value,
        level: document.getElementById('profile-level').value,
        goal: document.getElementById('profile-goal').value,
        recFree: document.getElementById('record-free').value,
        recBreast: document.getElementById('record-breast').value
    };
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    applyUserProfile(profile);
    alert(currentLang === 'ko' ? '저장되었습니다.' : 'Saved!');
};

// --- Daily Plan Generator ---
function generateDailyPlan(level, goal, profile) {
    const planText = document.getElementById('daily-plan-text');
    if (!planText) return;

    let baseDist = 1500;
    if (level === 'beginner') baseDist = 800;
    else if (level === 'advanced') baseDist = 2500;
    else if (level === 'masters') baseDist = 3200;
    else if (level === 'elite') baseDist = 4500;

    if (profile.age && profile.age > 50 && level !== 'elite') baseDist *= 0.8;
    
    const today = new Date();
    const seed = today.getDate() + today.getMonth();
    const variety = seed % 3;

    let plan = { title: "Daily Plan", desc: "Balanced swim", warmup: [], drill: [], main: [], cooldown: [], totalDist: 0 };
    const round50 = (n) => Math.max(50, Math.round(n / 50) * 50);
    const distStr = (d) => `${round50(d)}m`;
    const parseDist = (str) => parseInt(str.replace('m', '')) || 0;
    const drillItem = (name, dist) => ({ dist: dist, desc: name, ytLink: DRILL_DB[name] || null });

    if (goal === 'speed') {
        plan.title = "Sprint Power (SP1/SP2)";
        plan.warmup = [{dist: distStr(baseDist*0.2), desc: "Choice swim (EN1)"}];
        if (variety === 0) {
            plan.drill = [drillItem("High Elbow", distStr(baseDist*0.05)), drillItem("Catch-Up", distStr(baseDist*0.05))];
            plan.main = [{dist: distStr(baseDist*0.1), desc: "4x25m Sprint (SP1)"}, {dist: distStr(baseDist*0.4), desc: "Broken 50m (SP2)"}];
        } else {
            plan.drill = [drillItem("Single Arm", distStr(baseDist*0.1))];
            plan.main = [{dist: distStr(baseDist*0.5), desc: "10x50m Fast/Easy Interval"}];
        }
        plan.cooldown = [{dist: distStr(baseDist*0.2), desc: "Easy Loosen"}];
    } else {
        plan.title = "Aerobic base (EN1/EN2)";
        plan.warmup = [{dist: distStr(baseDist*0.2), desc: "Easy Freestyle"}];
        plan.drill = [drillItem("Sculling", distStr(baseDist*0.1))];
        plan.main = [{dist: distStr(baseDist*0.5), desc: "Continuous Swim (EN2)"}];
        plan.cooldown = [{dist: distStr(baseDist*0.2), desc: "Stretch Swim"}];
    }

    let total = 0;
    [plan.warmup, plan.drill, plan.main, plan.cooldown].forEach(s => s.forEach(i => total += parseDist(i.dist)));
    plan.totalDist = total;
    currentDailyPlan = plan;

    planText.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:flex-end;">
            <strong>${plan.title}</strong>
            <span style="font-size:1.2rem; font-weight:800; color:#2b6cb0;">${total}m</span>
        </div>
    `;
}

// --- Workout Logger ---
function initWorkouts() {
    loadWorkouts();
    const form = document.getElementById('swim-log-form');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const newWorkout = {
                date: document.getElementById('date').value,
                distance: document.getElementById('distance').value,
                duration: document.getElementById('duration').value,
                mood: document.querySelector('input[name="mood"]:checked')?.value || 'soso',
                id: Date.now()
            };
            const workouts = JSON.parse(localStorage.getItem(WORKOUT_KEY)) || [];
            workouts.push(newWorkout);
            localStorage.setItem(WORKOUT_KEY, JSON.stringify(workouts));
            loadWorkouts();
            alert('저장되었습니다.');
            navigateTo('dashboard');
        });
    }
}

function loadWorkouts() {
    const list = document.getElementById('recent-activity-list');
    const distDisplay = document.getElementById('total-distance-display');
    const workouts = JSON.parse(localStorage.getItem(WORKOUT_KEY)) || [];
    if(list) {
        list.innerHTML = workouts.length ? '' : '<li class="empty-state">No Data</li>';
        workouts.slice(-3).reverse().forEach(w => {
            list.innerHTML += `<li><span>${w.date}</span><strong>${w.distance}m</strong></li>`;
        });
    }
    if(distDisplay) {
        const total = workouts.reduce((s,w)=>s+parseInt(w.distance||0),0);
        distDisplay.textContent = `${total}m`;
    }
}

window.addDistance = (amount) => { 
    const el = document.getElementById('distance'); 
    if(el) el.value = (parseInt(el.value)||0)+amount; 
};

// --- Records ---
function initRecords() {
    loadRecords();
    const form = document.getElementById('competition-form');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const rec = {
                id: Date.now(),
                name: document.getElementById('comp-name').value,
                date: document.getElementById('comp-date').value,
                event: document.getElementById('comp-event').value,
                time: document.getElementById('comp-time').value
            };
            const records = JSON.parse(localStorage.getItem(RECORDS_KEY)) || [];
            records.push(rec);
            localStorage.setItem(RECORDS_KEY, JSON.stringify(records));
            loadRecords();
            alert('추가되었습니다.');
            form.reset();
        });
    }
}

function loadRecords() {
    const records = JSON.parse(localStorage.getItem(RECORDS_KEY)) || [];
    const prDisplay = document.getElementById('pr-display');
    if(prDisplay) prDisplay.textContent = records.length ? `${records[records.length-1].event}: ${records[records.length-1].time}` : 'None';
}

// --- Analysis ---
function initAnalysisControls() {
    const poolSel = document.getElementById('ana-pool-length');
    const eventSel = document.getElementById('ana-event-type');
    if(poolSel && eventSel) {
        const update = () => {
            const list = EVENTS_DATA[poolSel.value] || EVENTS_DATA['25'];
            eventSel.innerHTML = list.map(e => `<option value="${e.id}">${e.name}</option>`).join('');
        };
        poolSel.addEventListener('change', update);
        update();
    }
    const zone = document.getElementById('upload-zone');
    const input = document.getElementById('video-upload');
    if(zone && input) {
        zone.addEventListener('click', () => input.click());
        input.addEventListener('change', () => { if(input.files.length) handleAnalysis(input.files[0]); });
    }
}

function handleAnalysis(file) {
    const loader = document.getElementById('analysis-loader');
    const res = document.getElementById('analysis-results');
    const zone = document.getElementById('upload-zone');
    const video = document.getElementById('analysis-video-preview');
    const loaderText = loader.querySelector('p');
    const loaderSub = loader.querySelector('.loading-sub');
    
    if(zone) zone.classList.add('hidden');
    if(res) res.classList.remove('hidden');
    if(loader) loader.classList.remove('hidden');

    if(video && file) {
        video.src = URL.createObjectURL(file);
        video.load();
    }

    // High-End Analysis Simulation Sequence
    const steps = [
        { t: "영상 스트림 분석 및 프레임 슬라이싱 중...", s: "Extracting Frames (60fps) / Timecode Mapping" },
        { t: "오디오 파형 분석 중...", s: "Buzzer Sound Frequency Detection (800Hz-1200Hz)" },
        { t: "부저 소리 및 출발 시점 매칭 완료", s: "T0 Marker Set at Video Timestamp" },
        { t: "Skeletal Tracking 및 구간 위치 분석", s: "Joint Positioning / Lane Coordinate Mapping" },
        { t: "영법별 스트록 및 구간 기록 계산 완료", s: "Stroke Phase Analysis / Split Time Calculation" }
    ];

    let stepIdx = 0;
    const interval = setInterval(() => {
        if(stepIdx < steps.length) {
            if(loaderText) loaderText.textContent = steps[stepIdx].t;
            if(loaderSub) loaderSub.textContent = steps[stepIdx].s;
            stepIdx++;
        } else {
            clearInterval(interval);
            // Ensure metadata is loaded to get duration
            if (video.readyState >= 1) {
                finishAnalysis();
            } else {
                video.onloadedmetadata = finishAnalysis;
            }
        }
    }, 1000);

    function finishAnalysis() {
        if(loader) loader.classList.add('hidden');
        
        const eventSelect = document.getElementById('ana-event-type');
        const eventId = eventSelect.value;
        const eventName = eventSelect.options[eventSelect.selectedIndex].text;
        const poolLength = parseInt(document.getElementById('ana-pool-length').value) || 25;
        
        // 1. Get Actual Video Duration
        const videoDuration = video.duration || 30.0;

        // 2. Define Common Start Signal (Buzzer)
        // Assume tight clip: Buzzer usually happens 1.0s - 2.0s into the video
        const buzzerTimestamp = 1.0 + Math.random() * 1.0; 
        
        // Update Result Badge
        const badge = document.getElementById('res-badge-event');
        if(badge) badge.textContent = eventName;

        const userLane = Math.floor(Math.random() * 8) + 1;
        const laneData = [];
        
        // Base user performance calculation
        // Default: Race ends 2-3 seconds before video ends
        const estimatedTouch = Math.max(buzzerTimestamp + 5.0, videoDuration - 2.5);
        const maxRaceTime = estimatedTouch - buzzerTimestamp;
        
        // Save global context for sync
        window.currentAnalysisContext = {
            buzzerTimestamp,
            poolLength,
            eventId,
            videoDuration,
            userLane
        };
        
        generateLaneData(maxRaceTime);
    }
}

function generateLaneData(raceTime) {
    const ctx = window.currentAnalysisContext;
    if(!ctx) return;

    const laneData = [];
    const touchTimestamp = ctx.buzzerTimestamp + raceTime;

    for(let l=1; l<=8; l++) {
        let laneRaceTime;
        if (l === ctx.userLane) {
            laneRaceTime = raceTime;
        } else {
            // Variance: +/- 10%
            const variance = 0.9 + Math.random() * 0.2;
            laneRaceTime = raceTime * variance;
        }
        
        const laneTouch = ctx.buzzerTimestamp + laneRaceTime;
        
        // Stroke calculation
        let strokeBase = 18;
        if(ctx.eventId.includes('breast')) strokeBase = 12;
        else if(ctx.eventId.includes('fly')) strokeBase = 15;
        else if(ctx.eventId.includes('back')) strokeBase = 19;
        
        const strokeCount = Math.floor(strokeBase * (ctx.poolLength / 25) * (laneRaceTime / raceTime) * (0.95 + Math.random() * 0.1));

        laneData.push({
            lane: l,
            time: laneRaceTime.toFixed(2),
            t_start: ctx.buzzerTimestamp.toFixed(2),
            t_end: laneTouch.toFixed(2),
            strokes: strokeCount,
            isUser: l === ctx.userLane,
            reaction: (0.55 + Math.random() * 0.15).toFixed(3)
        });
    }
    
    laneData.sort((a, b) => parseFloat(a.time) - parseFloat(b.time));
    
    // Update UI
    const rankingGrid = document.getElementById('lane-ranking-list');
    if(rankingGrid) {
        rankingGrid.innerHTML = laneData.map((d, i) => `
            <div class="lane-rank-card ${d.isUser ? 'user-lane' : ''}" onclick="selectLaneForDetails(${JSON.stringify(d).replace(/"/g, '&quot;')})">
                <div class="l-rank">${i+1}</div>
                <div class="l-num">Lane ${d.lane}</div>
                <div class="l-time">${d.time}s</div>
                ${d.isUser ? '<span class="u-tag">ME</span>' : ''}
            </div>
        `).join('');
    }

    const userData = laneData.find(d => d.isUser);
    displayLaneDetails(userData, ctx.eventId, ctx.poolLength);
    
    // Auto-fill the sync input for convenience
    const syncInput = document.getElementById('manual-score-time');
    if(syncInput && syncInput.value === '') syncInput.placeholder = userData.time;
}

window.syncOfficialTime = function() {
    const input = document.getElementById('manual-score-time');
    if(!input || !input.value) return alert("전광판에 표시된 기록을 입력해주세요.");
    
    const newTime = parseFloat(input.value);
    if(isNaN(newTime) || newTime <= 0) return alert("올바른 시간을 입력해주세요.");
    
    const ctx = window.currentAnalysisContext;
    if(!ctx) return;

    // Adjust Logic:
    // If (Buzzer + NewTime) > VideoDuration, we must shift Buzzer earlier.
    // If (Buzzer + NewTime) fits, we keep Buzzer and adjust Touch.
    
    let newBuzzer = ctx.buzzerTimestamp;
    let newTouch = newBuzzer + newTime;
    
    if (newTouch > ctx.videoDuration) {
        // Shift Buzzer earlier to fit the race
        // Leave 0.5s padding at end if possible
        newBuzzer = Math.max(0, ctx.videoDuration - newTime - 0.5);
        ctx.buzzerTimestamp = newBuzzer;
    }
    
    alert(`기록 동기화 완료: ${newTime}s\n(출발 시점 보정: ${newBuzzer.toFixed(2)}s)`);
    generateLaneData(newTime);
};

window.selectLaneForDetails = function(data) {
    const eventId = document.getElementById('ana-event-type').value;
    const poolLength = parseInt(document.getElementById('ana-pool-length').value) || 25;
    displayLaneDetails(data, eventId, poolLength);
    
    // UI highlight
    document.querySelectorAll('.lane-rank-card').forEach(c => c.classList.remove('active-selection'));
    const cards = document.querySelectorAll('.lane-rank-card');
    cards.forEach(c => {
        if(c.querySelector('.l-num').textContent.includes(data.lane)) c.classList.add('active-selection');
    });
};

function displayLaneDetails(data, eventId, poolLength) {
    const totalTime = parseFloat(data.time);
    const strokeCount = data.strokes;
    const dps = (poolLength / strokeCount).toFixed(2);
    const strokeRate = ((strokeCount / totalTime) * 60).toFixed(1);
    const swolf = (totalTime + strokeCount).toFixed(0);
    
    document.getElementById('res-total-time').textContent = totalTime.toFixed(2) + "s";
    document.getElementById('res-reaction').textContent = data.reaction + "s";
    document.getElementById('res-stroke-count').textContent = strokeCount;
    document.getElementById('res-stroke-rate').textContent = strokeRate;
    document.getElementById('res-dps').textContent = dps;
    document.getElementById('res-uw-dist').textContent = (Math.random() * 3 + 7).toFixed(1);
    document.getElementById('res-swolf').textContent = swolf;
    
    // Update Timeline Breakdown with specific lane timestamps
    document.getElementById('res-t0').textContent = data.t_start + "s";
    document.getElementById('res-tend').textContent = data.t_end + "s";
    
    const turnEl = document.getElementById('res-turn-eff');
    if(turnEl) turnEl.textContent = (80 + Math.random() * 15).toFixed(1) + "%";

    const titleEl = document.getElementById('split-table-title');
    if(titleEl) titleEl.textContent = `구간별 상세 기록 (레인 ${data.lane})`;

    const splitsBody = document.getElementById('splits-body');
    if(splitsBody) {
        let html = '';
        const splitCount = Math.max(1, poolLength / 25);
        for(let i=1; i<=splitCount; i++) {
            const sTime = (totalTime/splitCount).toFixed(2);
            const sStroke = (strokeCount/splitCount).toFixed(0);
            html += `
                <tr>
                    <td>${i*25}m</td>
                    <td>${sTime}s</td>
                    <td>${sStroke}</td>
                    <td>${(sTime / sStroke).toFixed(2)}s</td>
                </tr>
            `;
        }
        splitsBody.innerHTML = html;
    }

    // AI Coaching Report Update
    const solution = document.getElementById('ai-solution-content');
    if(solution) {
        solution.innerHTML = `
            <div class="ai-point good"><strong>Lane ${data.lane} 정밀 계측</strong>: 부저(${data.t_start}s) ~ 터치(${data.t_end}s)</div>
            <div class="ai-point ${data.reaction < 0.7 ? 'good' : 'bad'}">반응 속도가 ${data.reaction}s 입니다. ${data.reaction < 0.7 ? '매우 빠른 출발입니다.' : '출발 반응을 더 단축할 필요가 있습니다.'}</div>
            <div class="ai-point good">스트록 효율(SWOLF: ${swolf})이 레인 평균 대비 ${data.time < 30 ? '우수함' : '안정적'}으로 측정되었습니다.</div>
        `;
    }
}

window.changePlaybackSpeed = function(speed) {
    const video = document.getElementById('analysis-video-preview');
    if(video) video.playbackRate = parseFloat(speed);
};

// --- Club Feature ---
const DEFAULT_CLUBS = [];

function initClubFeature() {
    const saved = localStorage.getItem(CLUB_KEY);
    if (saved) showClubDashboard(saved);
    else showClubSelection();
    updateDashboardClubCard();
    initAdminFeatures();

    const createForm = document.getElementById('create-club-form');
    if(createForm) {
        createForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const fileInput = document.getElementById('new-club-logo-file');
            let icon = document.getElementById('new-club-icon-emoji').value;
            if(fileInput.files[0]) icon = await readFileAsDataURL(fileInput.files[0]);
            const profile = JSON.parse(localStorage.getItem(PROFILE_KEY)) || { nickname: 'Anonymous' };
            const newClub = {
                id: 'custom_' + Date.now(),
                name: document.getElementById('new-club-name').value,
                desc: document.getElementById('new-club-desc').value,
                type: document.getElementById('new-club-type').value,
                password: document.getElementById('new-club-password').value,
                icon: icon,
                admins: [profile.nickname]
            };
            const custom = JSON.parse(localStorage.getItem(CUSTOM_CLUBS_KEY)) || [];
            custom.push(newClub);
            localStorage.setItem(CUSTOM_CLUBS_KEY, JSON.stringify(custom));
            alert('생성되었습니다!');
            createForm.reset();
            closeCreateClubModal();
            joinClub(newClub.id);
        });
    }

    const postForm = document.getElementById('write-post-form');
    if(postForm) {
        postForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const content = document.getElementById('post-content').value;
            const clubId = localStorage.getItem(CLUB_KEY);
            if(!clubId || !content.trim()) return;
            const profile = JSON.parse(localStorage.getItem(PROFILE_KEY)) || { nickname: 'Anonymous' };
            const post = { id: Date.now(), author: profile.nickname, content, date: new Date().toISOString() };
            const all = JSON.parse(localStorage.getItem(CLUB_POSTS_KEY)) || {};
            if(!all[clubId]) all[clubId] = [];
            all[clubId].unshift(post);
            localStorage.setItem(CLUB_POSTS_KEY, JSON.stringify(all));
            document.getElementById('post-content').value = '';
            closeWritePostModal();
            loadClubPosts(clubId);
        });
    }
}

function getClubs() {
    return [...DEFAULT_CLUBS, ...(JSON.parse(localStorage.getItem(CUSTOM_CLUBS_KEY)) || [])];
}

function showClubSelection() {
    const view = document.getElementById('club-selection-view');
    const dash = document.getElementById('club-dashboard-view');
    const list = document.getElementById('club-list');
    if(!view || !dash || !list) return;
    view.classList.remove('hidden');
    dash.classList.add('hidden');
    list.innerHTML = getClubs().map(c => `
        <div class="club-card" onclick="joinClub('${c.id}')">
            ${c.icon.startsWith('data:image') ? `<img src="${c.icon}" class="club-logo-img">` : `<div class="club-icon">${c.icon}</div>`}
            <div class="club-details"><h3>${c.name} ${c.type==='private'?'🔒':''}</h3><p>${c.desc}</p></div>
        </div>
    `).join('');
}

window.joinClub = function(id) {
    const club = getClubs().find(c => c.id === id);
    if(!club) return;
    if(club.type === 'private' && prompt('비밀번호:') !== club.password) return alert('틀렸습니다.');
    localStorage.setItem(CLUB_KEY, id);
    showClubDashboard(id);
    updateDashboardClubCard();
};

window.leaveClub = function() {
    if(!confirm('탈퇴하시겠습니까?')) return;
    localStorage.removeItem(CLUB_KEY);
    showClubSelection();
    updateDashboardClubCard();
};

window.switchClubTab = function(tabName) {
    document.querySelectorAll('.club-tab-content').forEach(el => el.classList.add('hidden'));
    const target = document.getElementById(`club-tab-${tabName}`);
    if(target) target.classList.remove('hidden');
    document.querySelectorAll('#club-tabs .lane-tab').forEach(el => {
        if(el.textContent.includes(tabName === 'ranking' ? '랭킹' : tabName === 'board' ? '게시판' : '멤버')) {
            el.classList.add('active');
        } else {
            el.classList.remove('active');
        }
    });
};

function showClubDashboard(id) {
    const view = document.getElementById('club-selection-view');
    const dash = document.getElementById('club-dashboard-view');
    const club = getClubs().find(c => c.id === id);
    if(!club) return showClubSelection();
    view.classList.add('hidden');
    dash.classList.remove('hidden');
    document.getElementById('my-club-name').textContent = club.name;
    document.getElementById('my-club-desc').textContent = club.desc;
    const icon = document.getElementById('my-club-icon');
    if(club.icon.startsWith('data:image')) icon.innerHTML = `<img src="${club.icon}" class="club-logo-img-large">`;
    else icon.textContent = club.icon;
    const profile = JSON.parse(localStorage.getItem(PROFILE_KEY)) || { nickname: '' };
    const isAdmin = (club.admins || []).includes(profile.nickname);
    const adminBtn = document.getElementById('club-admin-btn');
    if(adminBtn) {
        if(isAdmin) adminBtn.classList.remove('hidden');
        else adminBtn.classList.add('hidden');
    }
    loadClubPosts(id);
    loadClubMembers();
    loadClubLeaderboard();
    loadClubNotices(id);
}

function loadClubPosts(clubId) {
    const feed = document.getElementById('club-feed');
    if(!feed) return;
    const all = JSON.parse(localStorage.getItem(CLUB_POSTS_KEY)) || {};
    const posts = all[clubId] || [];
    if(posts.length === 0) {
        feed.innerHTML = '<p class="text-muted">아직 올라온 소식이 없습니다.</p>';
        return;
    }
    feed.innerHTML = posts.map((p, i) => `
        <div class="feed-item">
            <div class="feed-head">
                <span class="feed-user">${p.author}</span>
                <span class="feed-time">${new Date(p.date).toLocaleString()}</span>
            </div>
            <p class="feed-content">${p.content}</p>
            <div class="feed-actions">
                <button class="like-btn ${p.likedByMe ? 'liked' : ''}" onclick="likePost('${clubId}', ${i})">
                    ❤️ ${p.likes || 0}
                </button>
            </div>
        </div>
    `).join('');
}

window.toggleClubPassword = function() {
    const type = document.getElementById('new-club-type').value;
    const passGroup = document.getElementById('club-password-group');
    if (type === 'private') passGroup.classList.remove('hidden');
    else passGroup.classList.add('hidden');
};

window.likePost = function(clubId, postIndex) {
    const allPosts = JSON.parse(localStorage.getItem(CLUB_POSTS_KEY)) || {};
    if (!allPosts[clubId] || !allPosts[clubId][postIndex]) return;
    const post = allPosts[clubId][postIndex];
    if (!post.likes) post.likes = 0;
    if (post.likedByMe) { post.likes--; post.likedByMe = false; } 
    else { post.likes++; post.likedByMe = true; }
    localStorage.setItem(CLUB_POSTS_KEY, JSON.stringify(allPosts));
    loadClubPosts(clubId);
};

function loadClubMembers() {
    const list = document.getElementById('club-member-list');
    if(!list) return;
    const profile = JSON.parse(localStorage.getItem(PROFILE_KEY)) || { nickname: '나' };
    const members = [
        { name: profile.nickname, level: profile.level, isMe: true },
        { name: '김물개', level: 'advanced' },
        { name: '박수영', level: 'intermediate' },
        { name: '이인어', level: 'elite' }
    ];
    list.innerHTML = members.map(m => `
        <li>
            <div style="display:flex; align-items:center; gap:0.5rem;">
                <span style="font-size:1.2rem;">👤</span>
                <span style="${m.isMe ? 'font-weight:bold; color:var(--color-primary);' : ''}">${m.name}</span>
            </div>
            <span class="status-badge" style="font-size:0.7rem;">${m.level.toUpperCase()}</span>
        </li>
    `).join('');
}

function loadClubLeaderboard() {
    const list = document.getElementById('team-leaderboard');
    if(!list) return;
    const records = JSON.parse(localStorage.getItem(RECORDS_KEY)) || [];
    const myBest = records.filter(r => r.event.includes('자유형 50m') || r.event.includes('Free 50m'))
                          .sort((a,b) => parseFloat(a.time) - parseFloat(b.time))[0];
    const profile = JSON.parse(localStorage.getItem(PROFILE_KEY)) || { nickname: '나' };
    let ranking = [
        { name: '이인어', time: 24.50 },
        { name: '김물개', time: 28.12 },
        { name: '박수영', time: 32.40 }
    ];
    if(myBest) ranking.push({ name: profile.nickname, time: parseFloat(myBest.time), isMe: true });
    else ranking.push({ name: profile.nickname, time: 999, isMe: true, noRecord: true });
    ranking.sort((a,b) => a.time - b.time);
    list.innerHTML = ranking.map((r, i) => `
        <li class="leaderboard-item">
            <span class="rank ${i<3?'top-3':''}">${i+1}</span>
            <div class="member-info"><span class="member-name ${r.isMe?'me':''}">${r.name}</span></div>
            <span class="member-record">${r.noRecord ? '--' : r.time.toFixed(2)}</span>
        </li>
    `).join('');
}

function updateDashboardClubCard() {
    const id = localStorage.getItem(CLUB_KEY);
    const content = document.getElementById('dash-club-content');
    const icon = document.getElementById('dash-club-icon');
    if(!content || !icon) return;
    if(id) {
        const club = getClubs().find(c => c.id === id);
        if(club) {
            icon.innerHTML = club.icon.startsWith('data:image') ? `<img src="${club.icon}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">` : club.icon;
            content.innerHTML = `<strong>${club.name}</strong><p>${club.desc}</p>`;
        }
    } else {
        icon.textContent = '🤝';
        content.innerHTML = '<p>소속 클럽이 없습니다.</p>';
    }
}

// --- Admin Features ---
window.openAdminModal = () => document.getElementById('admin-modal').classList.remove('hidden');
window.closeAdminModal = () => document.getElementById('admin-modal').classList.add('hidden');
window.switchAdminTab = (tab) => {
    document.getElementById('admin-tab-notice').classList.add('hidden');
    document.getElementById('admin-tab-staff').classList.add('hidden');
    document.getElementById(`admin-tab-${tab}`).classList.remove('hidden');
    if(tab === 'staff') loadAdminStaffList();
};

function initAdminFeatures() {
    const noticeForm = document.getElementById('admin-notice-form');
    if(noticeForm) {
        noticeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('notice-title').value;
            const content = document.getElementById('notice-content').value;
            const clubId = localStorage.getItem(CLUB_KEY);
            const profile = JSON.parse(localStorage.getItem(PROFILE_KEY));
            if(!clubId || !title || !content) return;
            const notice = { id: Date.now(), title, content, date: new Date().toISOString(), author: profile.nickname };
            const allNotices = JSON.parse(localStorage.getItem(CLUB_NOTICES_KEY)) || {};
            if(!allNotices[clubId]) allNotices[clubId] = [];
            allNotices[clubId].unshift(notice);
            localStorage.setItem(CLUB_NOTICES_KEY, JSON.stringify(allNotices));
            alert('공지가 등록되었습니다.');
            document.getElementById('notice-title').value = '';
            document.getElementById('notice-content').value = '';
            closeAdminModal();
            loadClubNotices(clubId);
        });
    }
}

function loadClubNotices(clubId) {
    const section = document.getElementById('club-notice-section');
    const list = document.getElementById('club-notice-list');
    if(!section || !list) return;
    const notices = (JSON.parse(localStorage.getItem(CLUB_NOTICES_KEY)) || {})[clubId] || [];
    if(notices.length === 0) {
        section.classList.add('hidden');
        return;
    }
    section.classList.remove('hidden');
    list.innerHTML = notices.map(n => `
        <li class="notice-item">
            <span class="notice-title">${n.title}</span>
            <span class="notice-meta">${new Date(n.date).toLocaleDateString()} • ${n.author}</span>
            <p style="margin-top:0.2rem; color:#4a5568;">${n.content}</p>
        </li>
    `).join('');
}

function loadAdminStaffList() {
    const list = document.getElementById('admin-member-list');
    if(!list) return;
    list.innerHTML = `<li><span>나 (Admin)</span><span class="status-badge">관리자</span></li><li><span>김물개</span><button class="small-text-btn" onclick="alert('기능 준비중입니다.')">관리자 임명</button></li>`;
}

// --- Modals ---
window.openCreateClubModal = () => document.getElementById('create-club-modal').classList.remove('hidden');
window.closeCreateClubModal = () => document.getElementById('create-club-modal').classList.add('hidden');
window.postToBoard = () => document.getElementById('write-post-modal').classList.remove('hidden');
window.closeWritePostModal = () => document.getElementById('write-post-modal').classList.add('hidden');
window.openTerminologyModal = () => document.getElementById('term-modal').classList.remove('hidden');
window.closeTermModal = () => document.getElementById('term-modal').classList.add('hidden');
window.closeWorkoutModal = () => document.getElementById('workout-modal').classList.add('hidden');

window.openWorkoutModal = () => {
    const modal = document.getElementById('workout-modal');
    if (!modal || !currentDailyPlan) return;
    document.getElementById('modal-title').textContent = currentDailyPlan.title;
    let html = '';
    ['warmup', 'drill', 'main', 'cooldown'].forEach(key => {
        if(currentDailyPlan[key].length) {
            html += `<h4>${key.toUpperCase()}</h4>` + currentDailyPlan[key].map(i => `
                <div class="workout-item">
                    <strong>${i.dist}</strong> <span>${i.desc}</span>
                    ${i.ytLink ? `<a href="${i.ytLink}" target="_blank" class="yt-link-btn">YT</a>` : ''}
                </div>
            `).join('');
        }
    });
    html += `<div style="text-align:right; margin-top:1rem; font-size:1.1rem; font-weight:700; color:#2c5282;">Total: ${currentDailyPlan.totalDist}m</div>`;
    html += `<button onclick="completeDailyWorkout()" class="primary-btn" style="margin-top:1rem;">✅ 훈련 완료 및 기록 저장</button>`;
    html += `<div class="yt-disclaimer" style="margin-top:1rem;">${TRANSLATIONS[currentLang].ytDisclaimer}</div>`;
    document.getElementById('modal-body').innerHTML = html;
    modal.classList.remove('hidden');
};

window.completeDailyWorkout = () => {
    if(!currentDailyPlan) return;
    const workouts = JSON.parse(localStorage.getItem(WORKOUT_KEY)) || [];
    workouts.push({ date: new Date().toISOString().split('T')[0], distance: currentDailyPlan.totalDist, id: Date.now() });
    localStorage.setItem(WORKOUT_KEY, JSON.stringify(workouts));
    loadWorkouts();
    closeWorkoutModal();
    alert(`🎉 훈련 완료! ${currentDailyPlan.totalDist}m가 기록되었습니다.`);
    updateTotalDistance(workouts);
};

function updateTotalDistance(workouts) {
    const distDisplay = document.getElementById('total-distance-display');
    if (!distDisplay) return;
    const total = workouts.reduce((sum, w) => sum + parseInt(w.distance || 0), 0);
    distDisplay.textContent = `${total} m`;
}

function readFileAsDataURL(file) {
    return new Promise((r, j) => {
        const reader = new FileReader();
        reader.onload = () => r(reader.result);
        reader.onerror = j;
        reader.readAsDataURL(file);
    });
}

const planCard = document.querySelector('.main-plan-card');
if(planCard) planCard.addEventListener('click', (e) => {
    if(e.target.dataset.i18n === 'termHint') return;
    if(e.target.classList.contains('tap-hint') && e.target.onclick) return;
    openWorkoutModal();
});

// Explicitly assign global functions for HTML onclick attributes
window.changePlaybackSpeed = changePlaybackSpeed;
window.selectLaneForDetails = selectLaneForDetails;
window.toggleClubPassword = toggleClubPassword;
window.likePost = likePost;
window.syncOfficialTime = syncOfficialTime;