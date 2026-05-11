let posters = [];
let currentPoster = 0;
let lastUpdated = 0;

const posterElement = document.getElementById("poster");
const rssElement = document.getElementById("rss-feed");

async function loadPosters() {
  try {
    const response = await fetch(`${CONFIG.posterApi}?t=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) throw new Error("Poster API failed");
    const data = await response.json();
    if (data.lastUpdated !== lastUpdated) {
      lastUpdated = data.lastUpdated;
      posters = data.posters || [];
      currentPoster = 0;
      if (posters.length > 0) showPoster();
    }
  } catch (err) {
    console.error("Poster load error:", err);
    posterElement.alt = "Posters unavailable";
  }
}

function showPoster() {
  if (!posters.length) return;
  currentPoster = currentPoster % posters.length;
  const poster = posters[currentPoster];
  if (!poster?.url) return;
  const img = new Image();
  img.src = poster.url;
  img.onload = () => {
    posterElement.classList.add("fade-out");
    setTimeout(() => {
      posterElement.src = img.src;
      posterElement.classList.remove("fade-out");
      currentPoster = (currentPoster + 1) % posters.length;
    }, 300);
  };
  img.onerror = () => {
    console.error("Image failed:", poster.url);
    currentPoster = (currentPoster + 1) % posters.length;
  };
}

async function loadDonors() {
  try {
    const response = await fetch(CONFIG.donorsSheet, { cache: "no-store" });
    if (!response.ok) throw new Error("Donors sheet failed");
    const text = await response.text();
    const rows = text.trim().split(/\r?\n/);
    const title = rows[0]?.trim() || "Donors";
    const donors = rows.slice(1).map(r => r.trim().replace(/^"|"$/g, "")).filter(Boolean);
    const message = donors.length ? `${title}: ${donors.join(" | ")}` : `${title}: No donors`;
    rssElement.textContent = message;
  } catch (err) {
    console.error("Donors load error:", err);
    rssElement.textContent = "Donors list unavailable";
  }
}

async function init() {
  await loadPosters();
  await loadDonors();
  if (posters.length > 0) posterElement.src = posters[0].url;
}

init();

// Rotate posters
setInterval(() => {
  if (posters.length > 0) showPoster();
}, CONFIG.slideInterval);

// Refresh data
setInterval(() => {
  loadPosters();
  loadDonors();
}, CONFIG.refreshInterval);