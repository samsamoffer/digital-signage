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
        url: `https://drive.google.com/uc?export=download&id=${file.getId()}`
      });
    }
  }
  return ContentService.createTextOutput(JSON.stringify({
    lastUpdated: latestUpdate,
    posters: posters
  })).setMimeType(ContentService.MimeType.JSON);
}