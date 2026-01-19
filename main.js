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
  },
  jp: {
    appTitle: "スイミングコーチ",
    navDashboard: "ホーム", navLogger: "日誌", navAnalysis: "AI分析", navClub: "クラブ", navProfile: "記録",
    greeting: "今日も泳ぐ準備はできましたか？",
    dailyPlanTitle: "今日のプレミアムコーチング",
    termHint: "用語ガイドを見る",
    tapDetails: "詳細ガイドを見る →",
    weeklyDistTitle: "今週の距離",
    recentCompTitle: "最近の記録",
    btnAddRecord: "記録を追加",
    loggerTitle: "トレーニング日誌",
    dateLabel: "📅 日時",
    distLabel: "🏊 距離",
    btnSave: "保存する",
    profileTitle: "プロフィール編集",
    profileHeader: "👤 基本情報",
    labelNickname: "ニックネーム", labelAge: "年齢", labelGender: "性別", labelLevel: "レベル", labelGoal: "目標",
    genderMale: "男性", genderFemale: "女性",
    goalEndurance: "持久力", goalSpeed: "スピード", goalTechnique: "フォーム矯正", goalDiet: "ダイエット", goalComp: "大会",
    recordsHeader: "🏊‍♂️ 自己ベスト (50m)",
    btnUpdate: "変更を保存",
    uploadTitle: "動画アップロード",
    termTitle: "トレーニング用語",
    descEN1: "基礎持久力。楽な呼吸 (心拍数 60-70%)",
    descEN2: "有酸素閾値。ややきつい (心拍数 70-80%)",
    descEN3: "最大酸素摂取量。かなりきつい (心拍数 80-90%)",
    descSP1: "乳酸耐性。全力ダッシュ",
    descDrill: "フォーム矯正練習",
    ytDisclaimer: "⚠️ このガイドはYouTube動画を参考にしています。正しいフォームは動画で確認してください。"
  },
  cn: {
    appTitle: "游泳教练",
    navDashboard: "仪表盘", navLogger: "日志", navAnalysis: "AI分析", navClub: "俱乐部", navProfile: "记录",
    greeting: "准备好游泳了吗？",
    dailyPlanTitle: "今日高级指导",
    termHint: "查看术语指南",
    tapDetails: "查看详细指南 →",
    weeklyDistTitle: "本周距离",
    recentCompTitle: "近期记录",
    btnAddRecord: "添加记录",
    loggerTitle: "训练日志",
    dateLabel: "📅 日期和时间",
    distLabel: "🏊 距离",
    btnSave: "保存",
    profileTitle: "编辑个人资料",
    profileHeader: "👤 个人信息",
    labelNickname: "昵称", labelAge: "年龄", labelGender: "性别", labelLevel: "等级", labelGoal: "目标",
    genderMale: "男", genderFemale: "女",
    goalEndurance: "耐力", goalSpeed: "速度", goalTechnique: "技术", goalDiet: "减肥", goalComp: "比赛",
    recordsHeader: "🏊‍♂️ 个人最好成绩 (50m)",
    btnUpdate: "保存更改",
    uploadTitle: "上传视频",
    termTitle: "训练术语",
    descEN1: "基础耐力。呼吸轻松 (心率 60-70%)",
    descEN2: "有氧阈值。稍喘 (心率 70-80%)",
    descEN3: "最大摄氧量。很喘 (心率 80-90%)",
    descSP1: "乳酸耐受。全力冲刺",
    descDrill: "技术分解练习",
    ytDisclaimer: "⚠️ 本指南参考了YouTube视频。请观看链接视频以确认正确姿势。"
  }
};

let currentLang = 'ko';

function setLanguage(lang) {
    if (!TRANSLATIONS[lang]) return;
    currentLang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (TRANSLATIONS[lang][key]) {
            el.textContent = TRANSLATIONS[lang][key];
        }
    });
    // Re-generate plan to update text inside it
    const profile = JSON.parse(localStorage.getItem(PROFILE_KEY));
    if(profile) generateDailyPlan(profile.level, profile.goal, profile);
}

// --- App Logic ---

console.log('App Initializing...');

// Constants
const PROFILE_KEY = 'swim_user_profile';
const WORKOUT_KEY = 'swim_workouts';
const RECORDS_KEY = 'swim_competition_records';
const CLUB_KEY = 'swim_user_club';
const CUSTOM_CLUBS_KEY = 'swim_custom_clubs';
const CLUB_POSTS_KEY = 'swim_club_posts';

// Drill Database with YouTube Links
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

// Init
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initLanguage();
    
    // Load Profile & Plan
    let profile = JSON.parse(localStorage.getItem(PROFILE_KEY));
    if (!profile) {
        // Default dummy profile if none exists
        profile = { nickname: 'Swimmer', level: 'intermediate', goal: 'endurance', age: 25, gender: 'm' };
    }
    applyUserProfile(profile);
    
    loadWorkouts();
    loadRecords();
    initClubFeature();
    initAnalysisControls();
    
    // Inputs Init
    const dateInput = document.getElementById('date');
    if(dateInput) dateInput.valueAsDate = new Date();
});

function initLanguage() {
    const sel = document.getElementById('language-selector');
    if(!sel) return;
    sel.addEventListener('change', (e) => {
        setLanguage(e.target.value);
    });
}

// Navigation
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

    // Update Nav Active State
    document.querySelectorAll('.nav-link, .nav-item').forEach(item => {
        if (item.dataset.page === pageId) item.classList.add('active');
        else item.classList.remove('active');
    });
    window.scrollTo(0,0);
};

// --- Profile & Logic ---

function applyUserProfile(profile) {
    if (!profile) return;
    
    // Greeting
    const greeting = document.getElementById('user-greeting');
    if(greeting) greeting.textContent = currentLang === 'ko' ? `${profile.nickname}님, 오늘도 파이팅!` : `Welcome back, ${profile.nickname}!`;

    // Fill Form
    if(document.getElementById('profile-nickname')) document.getElementById('profile-nickname').value = profile.nickname || '';
    if(document.getElementById('profile-age')) document.getElementById('profile-age').value = profile.age || '';
    if(document.getElementById('profile-gender')) document.getElementById('profile-gender').value = profile.gender || 'm';
    if(document.getElementById('profile-level')) document.getElementById('profile-level').value = profile.level || 'intermediate';
    if(document.getElementById('profile-goal')) document.getElementById('profile-goal').value = profile.goal || 'endurance';
    if(document.getElementById('record-free')) document.getElementById('record-free').value = profile.recFree || '';
    if(document.getElementById('record-breast')) document.getElementById('record-breast').value = profile.recBreast || '';

    updateLevelBadge(profile.level);
    generateDailyPlan(profile.level, profile.goal, profile);
}

window.saveProfileChanges = function() {
    const nickname = document.getElementById('profile-nickname').value;
    const age = document.getElementById('profile-age').value;
    const gender = document.getElementById('profile-gender').value;
    const level = document.getElementById('profile-level').value;
    const goal = document.getElementById('profile-goal').value;
    const recFree = document.getElementById('record-free').value;
    const recBreast = document.getElementById('record-breast').value;

    const profile = { nickname, age, gender, level, goal, recFree, recBreast };
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    
    applyUserProfile(profile);
    alert(currentLang === 'ko' ? '저장되었습니다.' : 'Saved!');
};

function updateLevelBadge(level) {
    const badge = document.getElementById('user-level-badge');
    if(badge) badge.textContent = level.toUpperCase();
}

// --- GENERATOR LOGIC (Enhanced) ---
let currentDailyPlan = null;

function generateDailyPlan(level, goal, profile) {
    const planText = document.getElementById('daily-plan-text');
    if (!planText) return;

    // Logic based on Age/Gender/Records
    let baseDist = 1500;
    if (level === 'beginner') baseDist = 800;
    if (level === 'advanced') baseDist = 2500;
    if (level === 'masters') baseDist = 3200;
    if (level === 'elite') baseDist = 4500;

    // Age Factor
    if (profile.age && profile.age > 50 && level !== 'elite') baseDist *= 0.8;
    
    // Day-based Seed for Variety
    const today = new Date();
    const seed = today.getDate() + today.getMonth(); // Simple change every day
    const variety = seed % 3; // 0, 1, 2

    let plan = { title: "Generic Plan", desc: "General swim", warmup: [], drill: [], main: [], cooldown: [], totalDist: 0 };
    
    // Helper to format: Round to nearest 50m (min 50m)
    const round50 = (n) => Math.max(50, Math.round(n / 50) * 50);
    const distStr = (d) => `${round50(d)}m`;
    const parseDist = (str) => parseInt(str.replace('m', '')) || 0;
    
    const drillItem = (name, dist) => ({
        dist: dist,
        desc: name,
        ytLink: DRILL_DB[name] || null
    });

    if (goal === 'speed') {
        plan.title = "Sprint Power (SP1/SP2)";
        plan.desc = "Focus on lactate tolerance & High Elbow.";
        plan.warmup = [{dist: distStr(baseDist*0.2), desc: "Choice swim (EN1)"}];
        
        if (variety === 0) {
            plan.drill = [
                drillItem("High Elbow", distStr(baseDist*0.05)),
                drillItem("Catch-Up", distStr(baseDist*0.05))
            ];
            plan.main = [
                {dist: distStr(baseDist*0.1), desc: "4x25m Sprint (SP1) @ 1:30"},
                {dist: distStr(baseDist*0.4), desc: "Broken Swim 50m (SP2) - Race Pace"}
            ];
        } else if (variety === 1) {
            plan.drill = [drillItem("Fist Swim", distStr(baseDist*0.1))];
            plan.main = [
                {dist: distStr(baseDist*0.5), desc: "10x50m Fast/Easy (SP1) Interval"}
            ];
        } else {
            plan.drill = [drillItem("Single Arm", distStr(baseDist*0.1))];
            plan.main = [
                {dist: distStr(baseDist*0.2), desc: "Build up 25m"},
                {dist: distStr(baseDist*0.3), desc: "Max Effort 50m Time Trial"}
            ];
        }
        
        plan.cooldown = [{dist: distStr(baseDist*0.2), desc: "Easy Loosen (EN1)"}];
        
    } else if (goal === 'technique') {
        plan.title = "Advanced Technique";
        plan.desc = "Refining stroke mechanics & Efficiency.";
        baseDist *= 0.8; 
        plan.warmup = [{dist: distStr(baseDist*0.15), desc: "Easy Freestyle"}];
        
        if (variety === 0) {
            plan.drill = [
                drillItem("Sculling", distStr(baseDist*0.1)),
                drillItem("Single Arm", distStr(baseDist*0.1)),
                drillItem("Fist Swim", distStr(baseDist*0.1))
            ];
            plan.main = [
                {dist: distStr(baseDist*0.4), desc: "50m x N (Focus on DPS - Distance Per Stroke)"}
            ];
        } else {
            plan.drill = [drillItem("High Elbow", distStr(baseDist*0.2))];
            plan.main = [
                {dist: distStr(baseDist*0.2), desc: "Snorkel Swim (Head alignment)"},
                {dist: distStr(baseDist*0.2), desc: "Paddle & Pullbuoy (Power)"}
            ];
        }
        
        plan.cooldown = [{dist: distStr(baseDist*0.15), desc: "Easy (EN1)"}];
        
    } else if (goal === 'endurance') {
        plan.title = "Aerobic Capacity (EN1/EN2)";
        plan.desc = "Building aerobic base.";
        baseDist *= 1.1; 
        plan.warmup = [{dist: distStr(baseDist*0.15), desc: "Free/Back Mix (EN1)"}];
        plan.drill = [drillItem("Side Kick", distStr(baseDist*0.05))];
        
        if (variety === 0) {
            plan.main = [
                {dist: distStr(baseDist*0.6), desc: "Continuous Swim (EN2) HR 130-150"}
            ];
        } else if (variety === 1) {
            plan.main = [
                {dist: distStr(baseDist*0.3), desc: "Pullbuoy Swim"},
                {dist: distStr(baseDist*0.3), desc: "Swim with Paddles"}
            ];
        } else {
            plan.main = [
                {dist: distStr(baseDist*0.6), desc: "Pyramid: 100-200-300-200-100"}
            ];
        }
        
        plan.cooldown = [{dist: distStr(baseDist*0.2), desc: "Easy (EN1)"}];
        
    } else {
        // Default
        plan.title = "Balanced Swim (Mix)";
        plan.desc = "Technique and moderate aerobic work.";
        plan.warmup = [{dist: distStr(baseDist*0.2), desc: "Choice (EN1)"}];
        plan.drill = [drillItem("6-Kick Switch", distStr(baseDist*0.15))];
        plan.main = [{dist: distStr(baseDist*0.4), desc: "50m x 8 (EN2) Interval"}];
        plan.cooldown = [{dist: distStr(baseDist*0.25), desc: "Easy (EN1)"}];
    }

    // Calculate Total
    let total = 0;
    [plan.warmup, plan.drill, plan.main, plan.cooldown].forEach(section => {
        section.forEach(item => total += parseDist(item.dist));
    });
    plan.totalDist = total;

    currentDailyPlan = plan;
    planText.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:flex-end;">
            <strong>${plan.title}</strong>
            <span style="font-size:1.2rem; font-weight:800; color:#2b6cb0;">${total}m</span>
        </div>
        <span style="font-size:0.9rem; color:#718096">${plan.desc}</span>
    `;
}

// --- Terminology Modal ---
window.openTerminologyModal = () => document.getElementById('term-modal').classList.remove('hidden');
window.closeTermModal = () => document.getElementById('term-modal').classList.add('hidden');

// --- Logger Feature ---
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
window.addDistance = (amount) => { const el = document.getElementById('distance'); if(el) el.value = (parseInt(el.value)||0)+amount; };

const workoutForm = document.getElementById('swim-log-form');
if(workoutForm) {
    workoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const date = document.getElementById('date').value;
        const distance = document.getElementById('distance').value;
        const duration = document.getElementById('duration').value;
        const mood = document.querySelector('input[name="mood"]:checked')?.value || 'soso';
        if (!date || !distance) return;
        const newWorkout = { date, distance, duration, mood, id: Date.now() };
        const workouts = JSON.parse(localStorage.getItem(WORKOUT_KEY)) || [];
        workouts.push(newWorkout);
        localStorage.setItem(WORKOUT_KEY, JSON.stringify(workouts));
        loadWorkouts();
        alert('저장되었습니다.');
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
                li.innerHTML = `<div class="rec-meta"><span class="rec-event">${rec.event}</span><span class="rec-name">${rec.name} (${rec.date})</span></div><span class="rec-time">${rec.time}</span>`;
                recordsList.appendChild(li);
            });
        }
    }
    if (prDisplay && records.length > 0) {
        const recent = records[0];
        prDisplay.textContent = `${recent.event}: ${recent.time}`;
    } else if (prDisplay) {
        prDisplay.textContent = 'None';
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

// --- Analysis Feature ---
function initAnalysisControls() {
    const oldZone = document.getElementById('upload-zone');
    if (oldZone) {
        const fileInput = document.getElementById('video-upload');
        if (!fileInput) return;
        const newZone = oldZone.cloneNode(true);
        oldZone.parentNode.replaceChild(newZone, oldZone);
        
        const freshZone = document.getElementById('upload-zone');
        freshZone.addEventListener('click', () => fileInput.click());
        fileInput.onchange = (e) => { if (e.target.files.length > 0) handleFile(e.target.files[0]); };
    }
}

function handleFile(file) {
    const loader = document.getElementById('analysis-loader');
    const res = document.getElementById('analysis-results');
    const zone = document.getElementById('upload-zone');
    
    if(zone) zone.classList.add('hidden');
    if(res) res.classList.remove('hidden');
    if(loader) loader.classList.remove('hidden');
    
    setTimeout(() => {
        if(loader) loader.classList.add('hidden');
        const totalTime = document.getElementById('res-total-time');
        if(totalTime) totalTime.textContent = "32.45s";
    }, 2000);
}

// --- Club Feature ---
const DEFAULT_CLUBS = [
    { id: 'seoul_dolphins', name: '서울 돌핀스', desc: '서울 지역 직장인 수영 모임', icon: '🐬', type: 'public' },
    { id: 'busan_marine', name: '부산 마린보이', desc: '해운대 바다수영 & 실내수영', icon: '🌊', type: 'public' }
];

function updateDashboardClubCard() {
    const clubId = localStorage.getItem(CLUB_KEY);
    const contentDiv = document.getElementById('dash-club-content');
    const iconDiv = document.getElementById('dash-club-icon');
    
    if (!contentDiv || !iconDiv) return;

    if (clubId) {
        const clubs = getClubs();
        const club = clubs.find(c => c.id === clubId);
        if (club) {
            if(club.icon.startsWith('data:image')) {
                iconDiv.innerHTML = `<img src="${club.icon}" style="width:100%; height:100%; border-radius:50%; object-fit:cover;">`;
                iconDiv.style.padding = '0';
                iconDiv.style.overflow = 'hidden';
            } else {
                iconDiv.textContent = club.icon;
                iconDiv.style.padding = '0.75rem';
            }
            contentDiv.innerHTML = `
                <div style="margin-bottom:0.5rem;">
                    <strong style="font-size:1.1rem; color:#2d3748;">${club.name}</strong>
                    <span style="display:block; font-size:0.85rem; color:#718096;">${club.desc}</span>
                </div>
                <span class="status-badge" style="background:#e2e8f0; color:#4a5568; font-weight:normal;">가입됨</span>
            `;
        }
    } else {
        iconDiv.textContent = '🤝';
        contentDiv.innerHTML = `
            <p style="color:#718096; margin-bottom:0.5rem;">아직 소속된 클럽이 없습니다.</p>
            <span class="link-btn">클럽 찾기 &rarr;</span>
        `;
    }
}

function getClubs() {
    const customClubs = JSON.parse(localStorage.getItem(CUSTOM_CLUBS_KEY)) || [];
    return [...DEFAULT_CLUBS, ...customClubs];
}

function initClubFeature() {
    const savedClubId = localStorage.getItem(CLUB_KEY);
    if (savedClubId) showClubDashboard(savedClubId);
    else showClubSelection();
    
    updateDashboardClubCard();
}

function showClubSelection() {
    const selectionView = document.getElementById('club-selection-view');
    const dashboardView = document.getElementById('club-dashboard-view');
    const clubList = document.getElementById('club-list');
    if(!selectionView || !dashboardView || !clubList) return;

    selectionView.classList.remove('hidden');
    dashboardView.classList.add('hidden');
    
    const allClubs = getClubs();
    clubList.innerHTML = allClubs.map(club => {
        const iconHtml = club.icon.startsWith('data:image') 
            ? `<img src="${club.icon}" class="club-logo-img" alt="logo">` 
            : `<div class="club-icon">${club.icon}</div>`;
            
        return `
        <div class="club-card" onclick="joinClub('${club.id}')">
            ${iconHtml}
            <div class="club-details">
                <h3>${club.name} ${club.type==='private'?'🔒':''}</h3>
                <p>${club.desc}</p>
            </div>
        </div>
        `;
    }).join('');
}

window.joinClub = function(clubId) {
    const allClubs = getClubs();
    const club = allClubs.find(c => c.id === clubId);
    if(!club) return;
    
    if(club.type === 'private') {
        const pw = prompt('비밀번호를 입력하세요:');
        if(pw !== club.password) { alert('비밀번호가 일치하지 않습니다.'); return; }
    } else {
        if(!confirm(`${club.name}에 가입하시겠습니까?`)) return;
    }
    
    localStorage.setItem(CLUB_KEY, clubId);
    showClubDashboard(clubId);
    updateDashboardClubCard();
};

window.leaveClub = function() {
    if(confirm('탈퇴하시겠습니까?')) {
        localStorage.removeItem(CLUB_KEY);
        showClubSelection();
        updateDashboardClubCard();
    }
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
    
    const iconContainer = document.getElementById('my-club-icon');
    if(club.icon.startsWith('data:image')) {
        iconContainer.innerHTML = `<img src="${club.icon}" class="club-logo-img-large" alt="logo">`;
        iconContainer.className = '';
    } else {
        iconContainer.textContent = club.icon;
        iconContainer.className = 'club-icon-large';
    }

    loadClubPosts(clubId);
}

// --- Club Posts (Feed) ---
function loadClubPosts(clubId) {
    const feed = document.getElementById('club-feed');
    if(!feed) return;
    
    const allPosts = JSON.parse(localStorage.getItem(CLUB_POSTS_KEY)) || {};
    const clubPosts = allPosts[clubId] || [];
    
    if(clubPosts.length === 0 && clubId.startsWith('custom_') === false) {
         feed.innerHTML = `
            <div class="feed-item">
                <div class="feed-head"><span class="feed-user">Coach</span><span class="feed-time">Yesterday</span></div>
                <p class="feed-content">Welcome to the club! Share your workouts here.</p>
            </div>
         `;
    } else if (clubPosts.length === 0) {
        feed.innerHTML = '<p style="text-align:center; color:#a0aec0; padding:1rem;">아직 게시글이 없습니다. 첫 글을 남겨보세요!</p>';
    } else {
        feed.innerHTML = clubPosts.map(p => `
            <div class="feed-item">
                <div class="feed-head">
                    <span class="feed-user">${p.author}</span>
                    <span class="feed-time">${new Date(p.date).toLocaleString()}</span>
                </div>
                <p class="feed-content">${p.content}</p>
            </div>
        `).join('');
    }
}

window.postToBoard = function() { document.getElementById('write-post-modal').classList.remove('hidden'); };
window.closeWritePostModal = () => document.getElementById('write-post-modal').classList.add('hidden');

const writePostForm = document.getElementById('write-post-form');
if(writePostForm) {
    writePostForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const content = document.getElementById('post-content').value;
        const clubId = localStorage.getItem(CLUB_KEY);
        const profile = JSON.parse(localStorage.getItem(PROFILE_KEY)) || { nickname: 'Anonymous' };
        
        if(!content || !clubId) return;
        
        const newPost = { id: Date.now(), author: profile.nickname, content: content, date: new Date().toISOString() };
        const allPosts = JSON.parse(localStorage.getItem(CLUB_POSTS_KEY)) || {};
        if(!allPosts[clubId]) allPosts[clubId] = [];
        allPosts[clubId].unshift(newPost);
        localStorage.setItem(CLUB_POSTS_KEY, JSON.stringify(allPosts));
        document.getElementById('post-content').value = '';
        closeWritePostModal();
        loadClubPosts(clubId);
    });
}

// --- Create Club Logic ---
window.openCreateClubModal = () => document.getElementById('create-club-modal').classList.remove('hidden');
window.closeCreateClubModal = () => document.getElementById('create-club-modal').classList.add('hidden');

const createClubForm = document.getElementById('create-club-form');
if(createClubForm) {
    createClubForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('new-club-name').value;
        const desc = document.getElementById('new-club-desc').value;
        const emoji = document.getElementById('new-club-icon-emoji').value;
        const type = document.getElementById('new-club-type').value;
        const password = document.getElementById('new-club-password').value;
        const fileInput = document.getElementById('new-club-logo-file');
        
        if(type === 'private' && !password) { alert('비밀번호를 설정해주세요.'); return; }

        let icon = emoji;
        if(fileInput.files && fileInput.files[0]) {
            try { icon = await readFileAsDataURL(fileInput.files[0]); } catch(err) { alert("Error reading image"); return; }
        }
        
        const newClub = { id: 'custom_' + Date.now(), name, desc, icon, type, password };
        const customClubs = JSON.parse(localStorage.getItem(CUSTOM_CLUBS_KEY)) || [];
        customClubs.push(newClub);
        localStorage.setItem(CUSTOM_CLUBS_KEY, JSON.stringify(customClubs));

        alert('클럽이 생성되었습니다!');
        createClubForm.reset();
        closeCreateClubModal();
        joinClub(newClub.id); 
    });
}

function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// Modal Logic for Plan Details
window.openWorkoutModal = () => {
    const modal = document.getElementById('workout-modal');
    if (!modal || !currentDailyPlan) return;
    
    // Set Title
    const titleEl = document.getElementById('modal-title');
    if(titleEl) titleEl.textContent = currentDailyPlan.title;
    
    // Set Body
    const bodyEl = document.getElementById('modal-body');
    if(bodyEl) {
        let html = '';
        const sections = [
            {key:'warmup', title:'🔥 Warm Up'},
            {key:'drill', title:'🛠️ Drill'},
            {key:'main', title:'🏊 Main Set'},
            {key:'cooldown', title:'❄️ Cool Down'}
        ];
        
        sections.forEach(sec => {
            if(currentDailyPlan[sec.key] && currentDailyPlan[sec.key].length > 0) {
                html += `<div class="workout-section"><h4>${sec.title}</h4>`;
                currentDailyPlan[sec.key].forEach(set => {
                    const ytBtn = set.ytLink 
                        ? `<a href="${set.ytLink}" target="_blank" class="yt-link-btn" title="Watch on YouTube">
                             ▶ YouTube
                           </a>` 
                        : '';
                        
                    html += `<div class="workout-item">
                                <strong>${set.dist}</strong>
                                <div class="workout-desc-row">
                                    <span>${set.desc}</span>
                                    ${ytBtn}
                                </div>
                             </div>`;
                });
                html += `</div>`;
            }
        });
        
        // Total Summary
        html += `<div style="text-align:right; margin-top:1rem; font-size:1.1rem; font-weight:700; color:#2c5282;">
                    Total: ${currentDailyPlan.totalDist}m
                 </div>`;

        // Complete Button
        html += `<button onclick="completeDailyWorkout()" class="primary-btn" style="margin-top:1.5rem; width:100%;">
                    ✅ 훈련 완료 및 기록 저장
                 </button>`;
        
        // Add Disclaimer
        const disclaimer = TRANSLATIONS[currentLang].ytDisclaimer || "Please watch linked videos for proper form.";
        html += `<div class="yt-disclaimer" style="margin-top:1rem;">${disclaimer}</div>`;
        
        bodyEl.innerHTML = html;
    }
    
    modal.classList.remove('hidden');
};

window.completeDailyWorkout = function() {
    if (!currentDailyPlan) return;
    
    const newWorkout = {
        date: new Date().toISOString().split('T')[0],
        distance: currentDailyPlan.totalDist,
        duration: Math.floor(currentDailyPlan.totalDist / 25), // Approx estimation
        mood: 'good',
        notes: `[Auto-Log] ${currentDailyPlan.title}`,
        id: Date.now()
    };
    
    const workouts = JSON.parse(localStorage.getItem(WORKOUT_KEY)) || [];
    workouts.push(newWorkout);
    localStorage.setItem(WORKOUT_KEY, JSON.stringify(workouts));
    
    loadWorkouts(); // Refresh Dashboard
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

window.closeWorkoutModal = () => {
    const modal = document.getElementById('workout-modal');
    if(modal) modal.classList.add('hidden');
};

// Attach listener to card
document.addEventListener('DOMContentLoaded', () => {
    const planCard = document.querySelector('.main-plan-card');
    if(planCard) {
        planCard.addEventListener('click', (e) => {
            if(e.target.dataset.i18n === 'termHint') return; 
            if(e.target.classList.contains('tap-hint') && e.target.onclick) return;
            openWorkoutModal();
        });
    }
});
