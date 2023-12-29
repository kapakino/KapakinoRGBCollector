'use strict';
const express = require('express');
const {exec} = require('child_process');
//with cors to access different domain
const cors = require('cors');
// const path = require('node:path');

const app = express();
const port = 8080;

//using cors
app.use(cors());
app.use(express.static(__dirname));

app.post('/running',(req,res)=>{
    exec(`python ${__dirname}\\..\\py\\control.py`,(error,stdout,stderr)=>{
        if(error){
            console.error('Error executing Python script:', error);
            console.error('stderr:', stderr);
            res.status(500).json({'error':error.message});
        }else{
            console.log(`${stdout}`)
            res.json({'output':stdout});
        }
    });
})

app.listen(port,()=>console.log('listening'))