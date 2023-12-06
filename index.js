const {app,BrowserWindow} = require('electron')
const path = require('node:path')

function createWindow(){
    const win = new BrowserWindow({
        width:800,
        height:1024
    })
    win.loadFile('./home.html')
};
app.whenReady().then(()=>{
    createWindow()
    app.on('activate',()=>{
        if(BrowserWindow.getAllWindows().length===0){
            createWindow();
        }
    })
}).catch((err)=>{console.log(err)})
app.on('window-all-closed',()=>{
    if(process.platform !== 'darwin'){
        app.quit();
    }
});