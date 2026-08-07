/* IndieArcade — episode data lives here so HTML stays clean */

var SHOWS = {
  tadc: {
    abbr: "TADC",
    eps: [
      { id: "HwAPLk_sQ3w", t: "Pilot" },
      { id: "4ofJpOEXrZs", t: "Candy Carrier Chaos!" },
      { id: "bKjfw77cxeQ", t: "The Mystery Of Mildenhall Manor" },
      { id: "Q9KWcWKo2T8", t: "Fast Food Masquerade" },
      { id: "L4p2gN2CzsA", t: "Untitled" },
      { id: "mOvhHim78YA", t: "They All Get Guns" },
      { id: "oaOG1xOk7XY", t: "Beach Episode" },
      { id: "DMNlzf8PiEM", t: "hjsakldfhl" },
      { id: "PVy-bcTsO8A", t: "Remember" }
    ]
  },
  md: {
    abbr: "MD",
    eps: [
      { id: "mImFz8mkaHo", t: "Pilot" },
      { id: "7z8DO1KhPFo", t: "Heartbeat" },
      { id: "djsJqNAGMuY", t: "The Promening" },
      { id: "63bUBEIhpNk", t: "Cabin Fever" },
      { id: "rk0HBqSqpgg", t: "Home" },
      { id: "U7i6fi3z9Nk", t: "Dead End" },
      { id: "EOqw86OGIB0", t: "Mass Destruction" },
      { id: "caR9ouipm8o", t: "Absolute End" }
    ]
  },
  hb: {
    abbr: "HB",
    eps: [
      { id: "OlahNrlcgS4", t: "Pilot" },
      { id: "el_PChGfJN8", t: "Murder Family" },
      { id: "kpnwRg268FQ", t: "Loo Loo Land" },
      { id: "RghsgkZKedg", t: "Spring Broken" },
      { id: "1ZFseYPmkAk", t: "C.H.E.R.U.B" },
      { id: "h2ZmVAdezF8", t: "The Harvest Moon Festival" },
      { id: "yXErLiSbxXQ", t: "Truth Seekers" }
    ]
  },
  hh: {
    abbr: "HH",
    embed: "https://player.videasy.net/tv/94954/1/1",
    eps: [
      { id: "s1e1", t: "Season 1 · Episode 1", embed: "https://player.videasy.net/tv/94954/1/1" }
    ]
  },
  tgd: {
    abbr: "TGD",
    eps: [{ id: "IC8KsZniulw", t: "Pilot" }]
  },
  lack: {
    abbr: "LACK",
    eps: [{ id: "vffu6FG4YP4", t: "Pilot" }]
  },
  pas: {
    abbr: "PAS",
    eps: [
      { id: "egaDurTTKVo", t: "PaS 1: Who's The One Under The Hood?" },
      { id: "B96z-93rldI", t: "PaS 2: The Lost City of Mathu Picchu" },
      { id: "NNua5oNEyAo", t: "PaS 3: Unconventional Operator" }
    ]
  },
  smg4: { abbr: "SMG4", eps: [{ id: "J-gz4AtvFEo", t: "Classic episode" }] },
  bfdi: { abbr: "BFDI", eps: [{ id: "YQa2-DY7Y_Q", t: "Take the Plunge (1a)" }] },
  dp: { abbr: "DP", eps: [{ id: "B6VRjvcpwbo", t: "Pilot" }] },
  cw: { abbr: "CW", eps: [{ id: "7kl4QR1K-io", t: "Pilot" }] },
  ic: { abbr: "IC", eps: [{ id: "6MTdM4Q9NXg", t: "Episode 1" }] },
  ol: { abbr: "OLD", eps: [{ id: "zPE7rzprhe0", t: "Volcanic Excitement" }] },
  aur: { abbr: "AUR", eps: [{ id: "cjLbcENaBEs", t: "Episode 1" }] },
  mr: { abbr: "MR", eps: [{ id: "xIebUcOxkMg", t: "Series" }] },
  sp: { abbr: "SP", eps: [{ id: "9Kd6WerJBHM", t: "Series" }] },
  kog: { abbr: "KOG", eps: [{ id: "MCAdbUaMlAE", t: "Pilot" }] }
};

function filterShows() {
  var filter = ((document.getElementById("search") || {}).value || "").toLowerCase();
  document.querySelectorAll(".card").forEach(function (card) {
    var title = card.getAttribute("data-title") || "";
    card.style.display = !filter || title.indexOf(filter) > -1 ? "" : "none";
  });
}

function filterShowsModal() {
  var q = (document.getElementById("modal-search").value || "").toLowerCase();
  var box = document.getElementById("search-results");
  box.innerHTML = "";
  document.querySelectorAll(".card").forEach(function (card) {
    var title = card.getAttribute("data-title") || "";
    var name = card.getAttribute("data-name") || "";
    var id = card.getAttribute("data-id") || "";
    var abbr = (SHOWS[id] && SHOWS[id].abbr) || "SHOW";
    if (!q || title.indexOf(q) > -1 || name.toLowerCase().indexOf(q) > -1 || abbr.toLowerCase().indexOf(q) > -1) {
      var div = document.createElement("div");
      div.className = "search-item";
      div.innerHTML = '<span class="search-abbr">' + abbr + "</span><div><h4>" + (name || title) + "</h4><p>Indie</p></div>";
      div.onclick = function () {
        closeModal("search-modal");
        openDetail(card);
      };
      box.appendChild(div);
    }
  });
}

function playInDetail(ep) {
  var iframe = document.getElementById("d-player");
  var link = document.getElementById("d-yt-link");
  if (ep.embed) {
    iframe.src = ep.embed;
    link.href = ep.embed;
    link.textContent = "Open player ↗";
  } else {
    iframe.src = "https://www.youtube.com/embed/" + ep.id + "?autoplay=1&rel=0";
    link.href = "https://www.youtube.com/watch?v=" + ep.id;
    link.textContent = "Watch on YouTube ↗";
  }
  document.getElementById("d-ep-title").textContent = ep.t || "";
  document.querySelectorAll(".ep-item").forEach(function (el) {
    el.classList.toggle("active", el.getAttribute("data-key") === (ep.id || ep.t));
  });
}

function openDetail(card) {
  var id = card.getAttribute("data-id") || "";
  var name = card.getAttribute("data-name") || "Show";
  var credit = card.getAttribute("data-credit") || "";
  var yt = card.getAttribute("data-yt") || "";
  var embed = card.getAttribute("data-embed") || "";
  var data = SHOWS[id] || {};
  var abbr = data.abbr || "SHOW";
  var eps = data.eps ? data.eps.slice() : [];

  if (!eps.length) {
    if (embed) eps = [{ id: "embed", t: name, embed: embed }];
    else if (yt) eps = [{ id: yt, t: name }];
  }

  document.getElementById("d-title").textContent = name.toUpperCase();
  document.getElementById("d-creator").textContent = credit ? "Created by " + credit : "";
  document.getElementById("d-abbr").textContent = abbr;
  document.getElementById("d-info").textContent = eps.length + " episode" + (eps.length !== 1 ? "s" : "");
  document.getElementById("d-desc").textContent =
    (card.querySelector(".info p") && card.querySelector(".info p").textContent) || "";
  document.getElementById("d-tags").innerHTML =
    '<span class="chip">Indie</span><span class="chip">Animation</span>';

  var list = document.getElementById("d-episodes");
  list.innerHTML = "";
  eps.forEach(function (ep, i) {
    var item = document.createElement("div");
    item.className = "ep-item" + (i === 0 ? " active" : "");
    item.setAttribute("data-key", ep.id || ep.t);
    item.innerHTML =
      "<div><h4>" +
      ep.t +
      "</h4><p>" +
      abbr +
      " · Ep " +
      (i + 1) +
      '</p></div><span class="ep-play">▶</span>';
    item.onclick = (function (e) {
      return function () {
        playInDetail(e);
      };
    })(ep);
    list.appendChild(item);
  });

  if (eps.length) playInDetail(eps[0]);

  document.getElementById("show-detail").style.display = "block";
  document.getElementById("player-section").style.display = "none";
  var main = document.querySelector("main");
  var hero = document.querySelector(".hero");
  if (main) main.style.display = "none";
  if (hero) hero.style.display = "none";
  document.getElementById("show-detail").scrollIntoView({ behavior: "smooth" });
}

function closeDetail() {
  document.getElementById("d-player").src = "";
  document.getElementById("show-detail").style.display = "none";
  var main = document.querySelector("main");
  var hero = document.querySelector(".hero");
  if (main) main.style.display = "block";
  if (hero) hero.style.display = "block";
}

function rate(type) {
  try {
    localStorage.setItem("ia-rate-" + (document.getElementById("d-title").textContent || "show"), type);
    alert("Saved: " + type);
  } catch (e) {}
}

function openModal(id) {
  document.getElementById(id).style.display = "flex";
  if (id === "search-modal") {
    document.getElementById("modal-search").value = "";
    filterShowsModal();
    setTimeout(function () {
      document.getElementById("modal-search").focus();
    }, 40);
  }
}
function closeModal(id) {
  document.getElementById(id).style.display = "none";
}
document.querySelectorAll(".modal").forEach(function (m) {
  m.addEventListener("click", function (e) {
    if (e.target === m) closeModal(m.id);
  });
});

function setBg(hex) {
  document.body.style.background = hex;
  var el = document.getElementById("bg-hex");
  var col = document.getElementById("bg-color");
  if (el) el.value = hex;
  if (col) col.value = hex;
  try {
    localStorage.setItem("ia-bg", hex);
  } catch (e) {}
}
function setLayout(mode) {
  var a = document.getElementById("layout-side");
  var b = document.getElementById("layout-below");
  if (a && b) {
    a.classList.toggle("active", mode === "side");
    b.classList.toggle("active", mode === "below");
  }
  try {
    localStorage.setItem("ia-layout", mode);
  } catch (e) {}
}

function sendSuggestion(e) {
  e.preventDefault();
  var f = e.target;
  var data = {
    name: f.fullname.value,
    short: f.short.value,
    eps: f.eps.value,
    links: f.links.value,
    notes: f.notes.value,
    time: new Date().toISOString()
  };
  try {
    var list = JSON.parse(localStorage.getItem("ia-suggestions") || "[]");
    list.push(data);
    localStorage.setItem("ia-suggestions", JSON.stringify(list));
  } catch (err) {}
  alert("Thanks! Saved on this device.\n\n" + data.name);
  f.reset();
  closeModal("suggest-modal");
  return false;
}

document.querySelectorAll(".card").forEach(function (card) {
  card.addEventListener("click", function () {
    openDetail(card);
  });
});

try {
  var savedBg = localStorage.getItem("ia-bg");
  if (savedBg) setBg(savedBg);
  var savedLayout = localStorage.getItem("ia-layout");
  if (savedLayout) setLayout(savedLayout);
} catch (e) {}

console.log("IndieArcade ready — full episode lists + Hazbin Videasy");
