const { app, BrowserWindow, ipcMain, shell } = require("electron");
const fs = require("fs");
const path = require("path");

const { google } = require("googleapis");

const credentials = JSON.parse(fs.readFileSync(path.join(__dirname, "credentials.json")));
const { client_id, client_secret, redirect_uris } = credentials.installed;

const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

const tokenPath = path.join(app.getPath("userData"), "token.json");//On utilise app.getPath qui permet de creer userData et mettre dedans token pou pouvoir le modifier pas juste le lire concretement au chemin d'acces obtenue grâce à path.join

app.setLoginItemSettings({ openAtLogin: true })

if (fs.existsSync(tokenPath)==true){
  const tokens = JSON.parse(fs.readFileSync(tokenPath));
  oAuth2Client.setCredentials(tokens);

}

else {

  const http = require("http");

  const server = http.createServer(function (req, res) {
    console.log(req.url);
    const monUrl = new URL(req.url, "http://localhost:3000");
    const code = monUrl.searchParams.get("code");
    console.log(code);

    oAuth2Client.getToken(code).then(function (resultat) {
      const tokens = resultat.tokens;
      oAuth2Client.setCredentials(tokens);
      const token_save = JSON.stringify(tokens);
      fs.writeFileSync(tokenPath, token_save);
    });

    res.end("Tu peux fermer cette fenêtre.");
  });

  server.listen(3000);

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/calendar.readonly"],
  });

  shell.openExternal(authUrl);
}

const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

const debdesem = new Date();
const debsem = [-6, 0, -1, -2, -3, -4, -5];

debdesem.setDate(debdesem.getDate() + debsem[debdesem.getDay()]);
const findesem = new Date(debdesem);

debdesem.setHours(0, 0, 0, 0);

findesem.setDate(findesem.getDate()+7);

findesem.setHours(0, 0, 0, 0)

ipcMain.handle("get-events", function(){
  return calendar.events.list({
    calendarId: "primary",
    timeMin: debdesem.toISOString(),
    timeMax: findesem.toISOString(),
    maxResults: 100,
    singleEvents: true,
    orderBy: "startTime",
  }).then(function (resultat) {
    const evenements = resultat.data.items.map(function(item){
      return{
        debut : new Date(item.start.dateTime),
        fin : new Date(item.end.dateTime),
        titre : item.summary,
        salle : item.location,
      }
    })
    return evenements;

  });
});

function createWindow() {
  const win = new BrowserWindow({
    skipTaskbar: true,
    width: 214,
    height: 228,

    
    resizable: false,
    maximizable: false,
    fullscreenable: false,
    frame: false, 
    transparent: true,
    webPreferences: {
      contextIsolation: true,
      preload: __dirname + "/preload.js" // Utiliser path.join pour une meilleure compatibilité entre les systèmes d'exploitation

    }
  });

  win.loadFile("index.html");
}

function createSchedule(){
  const schedulewin = new BrowserWindow({
    skipTaskbar: true,
    width: 642,
    height: 642,
    resizable: false,
    maximizable: false,
    fullscreenable: false,
    frame: false, 
    transparent: true,
    webPreferences: {
      contextIsolation: true,
      preload: __dirname + "/preload.js"
    }
  });

  schedulewin.loadFile("schedule.html");
}
ipcMain.on("open-schedule", createSchedule); // Listen for the "open-schedule" event from the renderer process


app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

