const fetch = require("node-fetch");
const path = require("path");

const { app, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");
const { spawn } = require("child_process");

let installExtension, REACT_DEVELOPER_TOOLS;

if (isDev) {
  const devTools = require("electron-devtools-installer");
  installExtension = devTools.default;
  REACT_DEVELOPER_TOOLS = devTools.REACT_DEVELOPER_TOOLS;
}

const ms = spawn('matterialize-server', []);

ms.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ms.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

ms.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 900,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // Load the index.html of the app.
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  win.removeMenu()

  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: "detach" });
  }
}

app.whenReady().then(() => {
   createWindow()
 });

app.on("window-all-closed", () => {
  fetch("http://localhost:9000/shutdown", {
    method: 'POST'
  });
  app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});