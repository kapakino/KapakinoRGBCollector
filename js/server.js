'use strict';
const express = require('express');
// const {exec} = require('child_process');

//allow to use await keyword
const util = require('util');
const exec = util.promisify(require('child_process').exec);
//with cors to access different domain
const cors = require('cors');
// const path = require('node:path');
const fs = require('fs')

const ImgControl = require('./imageGenerate.js');


const expressApplication = express();
const port = 8080;

//10MB
const maxBuffer = 10*1024*1024;
//using cors
expressApplication.use(cors());
//middleware
expressApplication.use(express.json())
expressApplication.use(express.static(__dirname));

expressApplication.post('/running',async (req,res)=>{
    // Add appropriate CORS headers
    const allowedOrigins = ['http://localhost', 'https://localhost','http://127.0.0.1:8080','https://127.0.0.1:8080'];
    const origin = req.get('origin');
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    const dataToSent = req.body;
    if('data' in dataToSent)dataToSent['data'] = parseInt(dataToSent['data']);
    console.log(dataToSent)
    var arr = '';
    for(let key of Object.keys(dataToSent)){
        arr += `${key}=${dataToSent[key]} `;
    }
    try{
        var imageData = undefined;
        var cur_dir = __dirname;
        process.chdir(`${__dirname}\\..\\py`);
        res.on('finish',()=>{
            process.chdir(cur_dir);
            //delete the file
            fs.unlink(`${__dirname}\\image\\output.jpg`,(error)=>{
                if(error)console.error(`${error}`);
            });
            setTimeout(()=>{
                console.log('executing')
                imageData.generateImg()
                .then((res)=>{console.log('image be generated')})
                .catch((error)=>{throw new Error(`${error}`)});
            },100);
        });
        await exec(`python control.py ${arr}`,{maxBuffer},(error,stdout,stderr)=>{
            if(error){
                res.status(500).json({'error':error.message});
                throw new Error(`Can't execute python script
                error: ${error}
                stderr:${stderr}`);
            }else{
                var idx = stdout.indexOf('PythonOutput:');
                if(idx===-1)throw new Error('Can\'t read the output data');
                //PythonOutput: has 13 characters
                var data = stdout.split('').slice(idx+13).join('');
                // console.log(data);
                imageData = new ImgControl(data);
                
                res.json({'output':data});
            }
        });
    }catch(error){
        console.log(`Error:${error}`)
    }
})

expressApplication.listen(port,()=>console.log('listening'))