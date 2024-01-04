const {app,BrowserWindow} = require('electron')
const path = require('node:path')
const spawn = require('child_process').spawn
const net = require('net')

//you may need to change the server.js port as well
const serverPort = 8080;

//check the port in used or not
//I didn't write this code
const isPortInUse = (port) => {
    return new Promise((resolve) => {
      const server = net.createServer();
  
      server.once('error', (err) => {
        if (err.code === 'EADDRINUSE') {
          resolve(true); // Port is in use
        } else {
          resolve(false); // Other error
        }
      });
  
      server.once('listening', () => {
        server.close();
        resolve(false); // Port is not in use
      });
  
      server.listen(port, '127.0.0.1');
    });
};

var serverProcess = undefined;

const callServer= ()=>{
    isPortInUse(serverPort)
    .then((inUse)=>{
        if(!inUse){
            serverProcess = spawn('node', [path.join(__dirname,'js','server.js')]);
            serverProcess.on('error', (err) => {
                console.error(`Error: ${err.message}`);
            });
            serverProcess.stdout.on('data', (data) => {
                console.log(`stdout: ${data}`);
            });
            serverProcess.stderr.on('data', (data) => {
                console.error(`stderr: ${data}`);
            });
            serverProcess.on('close', (code) => {
                console.log(`Child process exited with code ${code}`);
            });
        }
    })
    .catch((error)=>{
        console.error(`${error}`)
    })
}
const closeServer= ()=>{
    if(serverProcess!==undefined)serverProcess.kill('SIGTERM');
    serverProcess = undefined;
}

function createWindow(){
    const win = new BrowserWindow({
        width:800,
        height:1024,
        webPreferences:{
            preload: path.join(`${__dirname}`,'js','preload.js'),
            // to enable cors
            webSecurity: false
        }
    })
    // win.loadURL('http://localhost:8080')
    win.loadFile(path.join(__dirname,'home.html'))
};
function Private(){
    app.whenReady().then(()=>{
        callServer();
        createWindow();
        app.on('activate',()=>{
            if(BrowserWindow.getAllWindows().length===0){
                callServer();
                createWindow();
            }
        })
    }).catch((err)=>{console.log(err)})
    app.on('window-all-closed',()=>{
        closeServer();
        if(process.platform !== 'darwin'){
            app.quit();
        }
    });
}
Private();
