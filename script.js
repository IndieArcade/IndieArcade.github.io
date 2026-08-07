function filterShows() {
  var filter = ((document.getElementById('search') || {}).value || '').toLowerCase();
  document.querySelectorAll('.card').forEach(function(card) {
    var title = card.getAttribute('data-title') || '';
    card.style.display = (!filter || title.indexOf(filter) > -1) ? '' : 'none';
  });
}

function filterShowsModal() {
  var q = (document.getElementById('modal-search').value || '').toLowerCase();
  var box = document.getElementById('search-results');
  box.innerHTML = '';
  var abbrMap = {
    'digital circus': 'TADC', 'murder drones': 'MD', 'helluva': 'HB', 'hazbin': 'HH',
    'lackadaisy': 'LACK', 'bfdi': 'BFDI', 'smg4': 'SMG4', 'gaslight': 'TGD',
    'indie cross': 'IC', 'remnant': 'AUR', 'problems': 'PAS', 'digital past': 'DP',
    'cartoony': 'CW', 'lockdown': 'OLD', 'meta runner': 'MR'
  };
  document.querySelectorAll('.card').forEach(function(card) {
    var title = card.getAttribute('data-title') || '';
    var name = card.getAttribute('data-name') || (card.querySelector('h3') || {}).textContent || '';
    if (!q || title.indexOf(q) > -1 || name.toLowerCase().indexOf(q) > -1) {
      var abbr = 'SHOW';
      for (var k in abbrMap) { if (title.indexOf(k) > -1) { abbr = abbrMap[k]; break; } }
      var div = document.createElement('div');
      div.className = 'search-item';
      div.innerHTML = '<span class="search-abbr">' + abbr + '</span><div><h4>' + name.split('—')[0].trim() + '</h4><p>Indie</p></div>';
      div.onclick = function() { closeModal('search-modal'); openDetail(card); };
      box.appendChild(div);
    }
  });
}

function playInDetail(ytId, epTitle, embedUrl) {
  var iframe = document.getElementById('d-player');
  var link = document.getElementById('d-yt-link');
  if (embedUrl) {
    iframe.src = embedUrl;
    link.href = embedUrl;
    link.textContent = 'Open player ↗';
  } else if (ytId && ytId !== 'videasy') {
    iframe.src = 'https://www.youtube.com/embed/' + ytId + '?autoplay=1&rel=0';
    link.href = 'https://www.youtube.com/watch?v=' + ytId;
    link.textContent = 'Watch on YouTube ↗';
  }
  document.getElementById('d-ep-title').textContent = epTitle || '';
  document.querySelectorAll('.ep-item').forEach(function(el) {
    el.classList.toggle('active', el.getAttribute('data-yt') === ytId);
  });
}

function openDetail(card) {
  var name = card.getAttribute('data-name') || card.querySelector('h3').textContent;
  var credit = card.getAttribute('data-credit') || '';
  var yt = card.getAttribute('data-yt');
  var title = card.getAttribute('data-title') || '';
  var epsRaw = card.getAttribute('data-eps');

  document.getElementById('d-title').textContent = name.split('—')[0].trim().toUpperCase();
  document.getElementById('d-creator').textContent = credit ? ('Created by ' + credit) : '';
  document.getElementById('d-desc').textContent = card.querySelector('.info p') ? card.querySelector('.info p').textContent : '';

  var abbr = 'SHOW';
  if (title.indexOf('problems') > -1) abbr = 'PAS';
  else if (title.indexOf('digital circus') > -1) abbr = 'TADC';
  else if (title.indexOf('murder') > -1) abbr = 'MD';
  document.getElementById('d-abbr').textContent = abbr;

  var tags = document.getElementById('d-tags');
  tags.innerHTML = '<span class="chip">Indie</span><span class="chip">Animation</span>';

  var list = document.getElementById('d-episodes');
  list.innerHTML = '';
  var eps = [];
  try { if (epsRaw) eps = JSON.parse(epsRaw); } catch(e) {}
  if (!eps.length && yt) eps = [{ id: yt, t: name }];

  eps.forEach(function(ep, i) {
    var item = document.createElement('div');
    item.className = 'ep-item' + (i === 0 ? ' active' : '');
    item.setAttribute('data-yt', ep.id);
    item.innerHTML = '<div><h4>' + ep.t + '</h4><p>' + abbr + ' · Ep ' + (i + 1) + '</p></div><span class="ep-play">▶</span>';
    item.onclick = (function(e) {
      return function() { playInDetail(e.id, e.t, e.embed || null); };
    })(ep);
    list.appendChild(item);
  });

  // also check card-level embed (Hazbin)
  var cardEmbed = card.getAttribute('data-embed');
  if (cardEmbed && (!eps[0].embed)) {
    eps[0].embed = cardEmbed;
  }
  playInDetail(eps[0].id, eps[0].t, eps[0].embed || cardEmbed || null);

  document.getElementById('show-detail').style.display = 'block';
  document.getElementById('player-section').style.display = 'none';
  // hide main grids a bit cleaner
  document.querySelector('main').style.display = 'none';
  document.querySelector('.hero').style.display = 'none';
  document.getElementById('show-detail').scrollIntoView({ behavior: 'smooth' });
}

function closeDetail() {
  document.getElementById('d-player').src = '';
  document.getElementById('show-detail').style.display = 'none';
  document.querySelector('main').style.display = 'block';
  document.querySelector('.hero').style.display = 'block';
}

function rate(type) {
  try {
    var key = 'ia-rate-' + (document.getElementById('d-title').textContent || 'show');
    localStorage.setItem(key, type);
    alert('Saved: ' + type);
  } catch(e) {}
}

function playShow(ytId, name, credit) {
  // legacy simple player — redirect to detail if possible
  var section = document.getElementById('player-section');
  document.getElementById('yt-player').src = 'https://www.youtube.com/embed/' + ytId + '?autoplay=1&rel=0';
  document.getElementById('now-playing').textContent = name || 'Now playing';
  document.getElementById('credit-line').innerHTML =
    (credit ? 'Source: ' + credit + ' • ' : '') +
    '<a href="https://www.youtube.com/watch?v=' + ytId + '" target="_blank" rel="noopener" style="color:#ccff00">Open on YouTube</a>';
  section.style.display = 'block';
  section.scrollIntoView({ behavior: 'smooth' });
}

function closePlayer() {
  document.getElementById('yt-player').src = '';
  document.getElementById('player-section').style.display = 'none';
}

function openModal(id) {
  document.getElementById(id).style.display = 'flex';
  if (id === 'search-modal') {
    document.getElementById('modal-search').value = '';
    filterShowsModal();
    setTimeout(function(){ document.getElementById('modal-search').focus(); }, 40);
  }
}
function closeModal(id) { document.getElementById(id).style.display = 'none'; }
document.querySelectorAll('.modal').forEach(function(m) {
  m.addEventListener('click', function(e) { if (e.target === m) closeModal(m.id); });
});

function setBg(hex) {
  document.body.style.background = hex;
  var el = document.getElementById('bg-hex');
  var col = document.getElementById('bg-color');
  if (el) el.value = hex;
  if (col) col.value = hex;
  try { localStorage.setItem('ia-bg', hex); } catch(e) {}
}
function setLayout(mode) {
  var a = document.getElementById('layout-side');
  var b = document.getElementById('layout-below');
  if (a && b) {
    a.classList.toggle('active', mode === 'side');
    b.classList.toggle('active', mode === 'below');
  }
  try { localStorage.setItem('ia-layout', mode); } catch(e) {}
}

function sendSuggestion(e) {
  e.preventDefault();
  var f = e.target;
  var data = { name: f.fullname.value, short: f.short.value, eps: f.eps.value, links: f.links.value, notes: f.notes.value, time: new Date().toISOString() };
  try {
    var list = JSON.parse(localStorage.getItem('ia-suggestions') || '[]');
    list.push(data);
    localStorage.setItem('ia-suggestions', JSON.stringify(list));
  } catch(err) {}
  alert('Thanks! Saved on this device.\n\n' + data.name);
  f.reset();
  closeModal('suggest-modal');
  return false;
}

document.querySelectorAll('.card').forEach(function(card) {
  card.addEventListener('click', function() { openDetail(card); });
});

try {
  var savedBg = localStorage.getItem('ia-bg');
  if (savedBg) setBg(savedBg);
  var savedLayout = localStorage.getItem('ia-layout');
  if (savedLayout) setLayout(savedLayout);
} catch(e) {}

console.log('IndieArcade — detail view + PaS episodes');
