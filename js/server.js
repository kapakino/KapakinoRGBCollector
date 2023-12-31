'use strict';
const express = require('express');
// const {exec} = require('child_process');

//allow to use await keyword
const util = require('util');
const exec = util.promisify(require('child_process').exec);
//with cors to access different domain
const cors = require('cors');
// const path = require('node:path');
// const fs = require('fs')

const app = express();
const port = 8080;

//10MB
const maxBuffer = 10*1024*1024;
//using cors
app.use(cors());
//middleware
app.use(express.json())
app.use(express.static(__dirname));

app.post('/running',async (req,res)=>{
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
        var cur_dir = __dirname;
        process.chdir(`${__dirname}\\..\\py`);
        await exec(`python control.py ${arr}`,{maxBuffer},(error,stdout,stderr)=>{
            if(error){
                console.error('Error executing Python script:', error);
                console.error('stderr:', stderr);
                res.status(500).json({'error':error.message});
            }else{
                var idx = stdout.indexOf('PythonOutput:');
                if(idx===-1)throw new Error('Can\'t read the output data');
                //PythonOutput: has 13 characters
                var data = stdout.split('').slice(idx+13).join('');
                console.log(data)
                res.json({'output':data});
            }
        });
        process.chdir(cur_dir);
    }catch(error){
        console.log(`Error when change directory.${error}`)
    }
})

app.listen(port,()=>console.log('listening'))