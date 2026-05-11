function doGet() {
  const folderId = '1GPFbx5He4uVQWC64fOeTq4SLSsnxN9Vc';
  const folder = DriveApp.getFolderById(folderId);
  const files = folder.getFiles();
  let posters = [];
  let latestUpdate = 0;
  while (files.hasNext()) {
    const file = files.next();
    const mimeType = file.getMimeType();
    if (mimeType === MimeType.JPEG || mimeType === MimeType.PNG || mimeType === MimeType.GIF) {
      const updated = file.getLastUpdated().getTime();
      latestUpdate = Math.max(latestUpdate, updated);
      posters.push({
        id: file.getId(),
        name: file.getName(),
        updated: updated,
        url: `https://lh3.googleusercontent.com/d/${file.getId()}`
      });
    }
  }

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Digital Signage</title>
  <style>
    body {
      margin: 0;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background: black;
    }

    .slideshow-container {
      flex: 1;
      min-height: 0;
      overflow: hidden;
      background: black;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    #poster {
      max-width: 100%;
      max-height: 100%;
      width: auto;
      height: auto;
      display: block;
      object-fit: contain;
      opacity: 1;
      transition: opacity 0.3s ease-in-out;
      background: black;
    }

    .fade-out {
      opacity: 0;
    }

    .rss-container {
      width: 100%;
      background: linear-gradient(180deg, rgba(0,0,0,0.9), rgba(20,20,20,0.95));
      border-top: 4px solid #ffffff;
      box-shadow: 0 -8px 20px rgba(0, 0, 0, 0.4);
      color: white;
      padding: 12px 16px;
      font-size: 24px;
      z-index: 9999;
      overflow: hidden;
    }

    .rss-text {
      white-space: nowrap;
      animation: scroll 30s linear infinite;
    }

    @keyframes scroll {
      0% { transform: translateX(100%); }
      100% { transform: translateX(-100%); }
    }
  </style>
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
  <meta http-equiv="Pragma" content="no-cache">
  <meta http-equiv="Expires" content="0">
</head>
<body>

  <div class="slideshow-container">
    <img id="poster" alt="Loading posters...">
  </div>

  <div class="rss-container">
    <div class="rss-text" id="rss-feed">
      Loading donors list...
    </div>
  </div>

  <script>
    let posters = [];
    let currentPoster = 0;
    let lastUpdated = 0;

    const posterElement = document.getElementById("poster");
    const rssElement = document.getElementById("rss-feed");

    async function loadPosters() {
      try {
        const response = await fetch(window.location.href + '?action=posters&t=' + Date.now(), { cache: "no-store" });
        if (!response.ok) throw new Error("Poster API failed");
        const data = await response.json();
        if (data.lastUpdated !== lastUpdated) {
          lastUpdated = data.lastUpdated;
          posters = data.posters || [];
          currentPoster = 0;
          if (posters.length > 0) {
            showPoster();
          } else {
            posterElement.removeAttribute("src");
            posterElement.alt = "No posters found";
          }
        }
      } catch (err) {
        console.error("Poster load error:", err);
        posterElement.removeAttribute("src");
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
        const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vT_AGGk_QcIfFGJ0k-yCw5czoV6HhjKZ__4lz_iR4Lsf_RbaGH_ezJXkLWHsQ-8z-TNXqhI3j15ipjJ/pub?output=csv', { cache: "no-store" });
        if (!response.ok) throw new Error("Donors sheet failed");
        const text = await response.text();
        const rows = text.trim().split(/\\r?\\n/);
        const title = rows[0]?.trim() || "Donors";
        const donors = rows.slice(1).map(r => r.trim().replace(/^"|"$/g, "")).filter(Boolean);
        const message = donors.length ? \`\${title}: \${donors.join(" | ")}\` : \`\${title}: No donors\`;
        rssElement.textContent = message;
      } catch (err) {
        console.error("Donors load error:", err);
        rssElement.textContent = "Donors list unavailable";
      }
    }

    async function init() {
      await loadPosters();
      await loadDonors();
    }

    init();

    // Rotate posters
    setInterval(() => {
      if (posters.length > 0) showPoster();
    }, 10000);

    // Refresh data
    setInterval(() => {
      loadPosters();
      loadDonors();
    }, 60000);
  </script>

</body>
</html>`;

  return HtmlService.createHtmlOutput(html)
    .setTitle('Digital Signage')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function doPost(e) {
  if (e.parameter.action === 'posters') {
    return doGet();
  }
}