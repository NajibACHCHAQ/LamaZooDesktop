const { app, BrowserWindow } = require('electron');
const path = require('path');
const ejs = require('ejs');

function createWindow() {
  // Crée la fenêtre du navigateur Electron
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true 
    }
  });

  // Charge le contenu HTML rendu à partir de votre fichier EJS
  ejs.renderFile(path.join(__dirname, 'views/login.ejs'), {}, (err, html) => {
    if (!err) {
      win.loadURL(`data:text/html,${encodeURIComponent(html)}`);
    } else {
      console.error(err);
    }
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
