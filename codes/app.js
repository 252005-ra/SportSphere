const TEAMS = [
  { id: 1, name: "Lahore Qalandars", short:"LQ", logo: "https://via.placeholder.com/140x140/0e7eb5/fff?text=LQ", played:8, w:6, l:2, points:12, nrr:"+0.82" },
  { id: 2, name: "Karachi Kings", short:"KK", logo: "https://via.placeholder.com/140x140/13a17a/041717?text=KK", played:8, w:4, l:4, points:8, nrr:"-0.10" },
  { id: 3, name: "Islamabad United", short:"IU", logo: "https://via.placeholder.com/140x140/ffd166/041717?text=IU", played:8, w:5, l:3, points:10, nrr:"+0.12" },
  { id: 4, name: "Peshawar Zalmi", short:"PZ", logo: "https://via.placeholder.com/140x140/0b3a5a/fff?text=PZ", played:8, w:3, l:5, points:6, nrr:"-0.60" },
  { id: 5, name: "Quetta Gladiators", short:"QG", logo: "https://via.placeholder.com/140x140/1b9aa0/fff?text=QG", played:8, w:2, l:6, points:4, nrr:"-1.20" },
  { id: 6, name: "Multan Sultans", short:"MS", logo: "https://via.placeholder.com/140x140/0b5f8a/fff?text=MS", played:8, w:5, l:3, points:10, nrr:"+0.40" }
];

const FIXTURES = [
  { id: 201, t1: 1, t2: 2, date: '2025-03-10', time: '19:30', venue:'Gaddafi Stadium', status: 'upcoming', score: '' },
  { id: 202, t1: 3, t2: 4, date: '2025-03-12', time: '16:00', venue:'Pindi Stadium', status: 'upcoming', score: '' },
  { id: 203, t1: 5, t2: 6, date: '2025-03-14', time: '19:30', venue:'Multan Cricket Stadium', status: 'completed', score: 'QG 142/9 (20) • MS 145/6 (19.2)' }
];


function isAdminLoggedIn() {
    return sessionStorage.getItem('isAdminLoggedIn') === 'true';
}

function checkAdminAccess() {
    const isLoggedIn = isAdminLoggedIn();
    
    const navAuthBtn = document.getElementById('navAuthBtn');
    if (navAuthBtn) {
        if (isLoggedIn) {
            navAuthBtn.innerText = 'Logout';
            navAuthBtn.classList.remove('btn-primary-custom');
            navAuthBtn.classList.add('btn-accent');
            navAuthBtn.onclick = handleLogout; 
            navAuthBtn.href = "#";
        } else {
            navAuthBtn.innerText = 'Login';
            navAuthBtn.classList.remove('btn-accent');
            navAuthBtn.classList.add('btn-primary-custom');
            navAuthBtn.onclick = null; 
            navAuthBtn.href = "login.html"; 
        }
    }
    
    const visibility = isLoggedIn ? 'block' : 'none';

    const addTeamBtn = document.getElementById('addTeamBtn');
    if (addTeamBtn) addTeamBtn.style.display = visibility;
    
    const addFixtureBtn = document.getElementById('addFixtureBtn');
    if (addFixtureBtn) addFixtureBtn.style.display = visibility;

    const simScoreBtn = document.getElementById('simScoreBtn');
    if (simScoreBtn) {
        const parentDiv = simScoreBtn.closest('div');
        if (parentDiv) parentDiv.style.display = visibility;
    }
}

function handleAdminLogin(e){
    e.preventDefault(); 
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorEl = document.getElementById('loginError');

    if (username && password) {
        sessionStorage.setItem('isAdminLoggedIn', 'true');

        window.location.href = 'index.html'; 
    } else {
        errorEl.style.display = 'block';
    }
}

function handleLogout() {
    sessionStorage.removeItem('isAdminLoggedIn');
    window.location.href = 'login.html'; 
}


function getTeamById(id){ return TEAMS.find(t => t.id === id) || null; }

function renderTeamsList(teamsToRender = TEAMS){
  const grid = document.getElementById('teamGrid');
  if(!grid) return;
  grid.innerHTML = '';
  teamsToRender.forEach(t => { 
    const div = document.createElement('div');
    div.className = 'team-card';
    div.innerHTML = `<img class="team-logo" src="${t.logo}" alt="${t.name}" />
      <div style="flex:1">
        <div style="font-weight:700">${t.name}</div>
        <div class="muted small-note">${t.played} matches • ${t.w} wins</div>
      </div>
      <div style="text-align:right">
        <div class="muted" style="font-size:0.9rem">Points</div>
        <div style="font-weight:800; font-size:1.05rem">${t.points}</div>
        <div class="mt-2"><button class="btn btn-outline-custom" onclick="openTeamModal(${t.id})">Details</button></div>
      </div>`;
    grid.appendChild(div);
  });
}

function filterTopTeams(){
  const topTeams = [...TEAMS].sort((a,b)=>b.points - a.points).slice(0, 3); 
  renderTeamsList(topTeams);
}

function openTeamModal(id){
  const team = getTeamById(id);
  if(!team) return console.error('Team not found');
  const modalTitle = document.getElementById('teamModalLabel');
  const modalBody = document.getElementById('teamModalBody');
  modalTitle.innerText = team.name;
  modalBody.innerHTML = `<div style="display:flex;gap:12px;align-items:center">
      <img src="${team.logo}" style="width:90px;height:90px;border-radius:8px;object-fit:cover"/>
      <div>
        <div style="font-weight:700">${team.short}</div>
        <div class="muted small-note">${team.played} matches • ${team.w} W • ${team.l} L</div>
        <div class="mt-2 small-note">Captain: Demo Player</div>
      </div>
    </div>
    <hr style="margin:12px 0;border-color:var(--color-border)" />
    <div>
      <div class="small-note">Top batsmen (demo):</div>
      <ul class="small-note">
        <li>Player A — 423 runs</li>
        <li>Player B — 311 runs</li>
      </ul>
    </div>`;
  const modal = new bootstrap.Modal(document.getElementById('teamModal'));
  modal.show();
}

function filterTeamsByQuery(){
  const qEl = document.getElementById('teamSearch');
  if(!qEl) return;
  const q = qEl.value.trim().toLowerCase();
  const grid = document.getElementById('teamGrid');
  Array.from(grid.children).forEach(card => {
    const name = card.querySelector('div').innerText.toLowerCase();
    card.style.display = name.includes(q) ? '' : 'none';
  });
}

function renderFixturesList(){
  const list = document.getElementById('fixturesList');
  if(!list) return;
  list.innerHTML = '';
  FIXTURES.forEach(f=>{
    const t1 = getTeamById(f.t1), t2 = getTeamById(f.t2);
    if (!t1 || !t2) return; 
    const el = document.createElement('div');
    el.className = 'card-surface';
    el.style.marginBottom = '10px';
    el.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center">
        <div>
          <div style="font-weight:700">${t1.short} vs ${t2.short} • ${f.date}</div>
          <div class="muted small-note">${f.time} • ${f.venue}</div>
        </div>
        <div style="text-align:right">
          <div class="muted small-note">${f.status === 'completed' ? 'Completed' : 'Upcoming'}</div>
          <div style="font-weight:700">${f.status === 'completed' ? f.score : ''}</div>
        </div>
      </div>`;
    list.appendChild(el);
  });
}

let CURRENT_SCORE = { matchId: 101, teamA: 'LQ', teamB: 'KK', scoreText: 'LQ 156/6 (20)' };
function renderScoreboard(){
  const header = document.getElementById('scoreboardHeader');
  if(header) header.innerText = `${CURRENT_SCORE.teamA} vs ${CURRENT_SCORE.teamB}`;
  const scoreTextEl = document.getElementById('scoreNow');
  if(scoreTextEl) scoreTextEl.innerText = CURRENT_SCORE.scoreText;
  const batsmenList = document.getElementById('batsmenList');
  const bowlersList = document.getElementById('bowlersList');

  if(batsmenList){
    batsmenList.innerHTML = `
      <li>Player X - 24 (25)</li>
      <li>Player Y - 9 (12)</li>
    `;
  }
  if(bowlersList){
    bowlersList.innerHTML = `
      <li>Bowler A - 2-24</li>
      <li>Bowler B - 1-32</li>
    `;
  }
}

function simulateScoreUpdate(){
  if (!isAdminLoggedIn()) return console.warn("Access Denied: Must be logged in to update score.");
  CURRENT_SCORE.scoreText = "LQ 172/7 (19.3)";
  renderScoreboard();
  const toast = document.getElementById('simToast');
  if(toast) {
    toast.style.display='block';
    setTimeout(()=>{ toast.style.display='none'; }, 1800);
  }
}

function renderLeaderboard(sortBy = 'points'){
  const tbody = document.getElementById('lbBody');
  if(!tbody) return;
  let arr = [...TEAMS];
  if(sortBy === 'points') arr.sort((a,b)=>b.points - a.points);
  if(sortBy === 'wins') arr.sort((a,b)=>b.w - a.w);
  if(sortBy === 'nrr') arr.sort((a,b)=> parseFloat(b.nrr) - parseFloat(a.nrr));
  tbody.innerHTML = '';
  arr.forEach((t, idx)=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td style="padding:10px">${idx+1}</td>
      <td style="padding:10px"><div style="display:flex;align-items:center;gap:8px"><img src="${t.logo}" style="width:36px;height:36px;border-radius:6px"/> <div>${t.name}</div></div></td>
      <td style="padding:10px">${t.played}</td>
      <td style="padding:10px">${t.w}</td>
      <td style="padding:10px">${t.l}</td>
      <td style="padding:10px">${t.points}</td>
      <td style="padding:10px">${t.nrr}</td>`;
    tbody.appendChild(tr);
  });
}

function submitTeamForm(e){
  e.preventDefault();
  if (!isAdminLoggedIn()) {
    document.getElementById('teamFormError').innerText = 'Access Denied: Must be logged in to register teams.';
    document.getElementById('teamFormError').style.display = 'block';
    return;
  }
  const name = document.getElementById('teamName').value.trim();
  const short = document.getElementById('teamShort').value.trim();
  if(!name || !short){
    const err = document.getElementById('teamFormError');
    err.innerText = 'Please enter Team name and short code.';
    err.style.display = 'block';
    return;
  }
  const newId = TEAMS.length + 1;
  TEAMS.push({ id: newId, name: name, short: short, logo: 'https://via.placeholder.com/140x140/0e7eb5/fff?text='+encodeURIComponent(short), played:0,w:0,l:0,points:0,nrr:'+0.00' });
  renderTeamsList();
  document.getElementById('teamForm').reset();
  const err = document.getElementById('teamFormError'); err.style.display='none';
  const modalEl = document.getElementById('teamModalAdd');
  const bs = bootstrap.Modal.getInstance(modalEl);
  if(bs) bs.hide();
}


document.addEventListener('DOMContentLoaded', ()=>{
  checkAdminAccess(); 

  renderTeamsList();
  renderFixturesList();
  renderScoreboard();
  renderLeaderboard();

  const searchEl = document.getElementById('teamSearch');
  if(searchEl) searchEl.addEventListener('input', filterTeamsByQuery);

  const simBtn = document.getElementById('simScoreBtn');
  if(simBtn) simBtn.addEventListener('click', simulateScoreUpdate);

  const form = document.getElementById('teamForm');
  if(form) form.addEventListener('submit', submitTeamForm);

  const sortSel = document.getElementById('lbSort');
  if(sortSel) sortSel.addEventListener('change', ()=> renderLeaderboard(sortSel.value));

  const adminForm = document.getElementById('adminLoginForm');
  if (adminForm) {
      adminForm.addEventListener('submit', handleAdminLogin);
  }
});