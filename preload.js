const{contextBridge, ipcRenderer} = require("electron");

function openSchedule(){
    ipcRenderer.send("open-schedule");
}

function getEvents(){
    return ipcRenderer.invoke("get-events");
}

contextBridge.exposeInMainWorld("API", { openSchedule : openSchedule, getEvents : getEvents }); // Expose the openSchedule function to the renderer process




