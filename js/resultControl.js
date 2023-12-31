import Control from "./control.js";
export default class ResultBlock{
    constructor(json){
        this.insertPoint = document.getElementById('dynamic');
        this.tempHtml = this.insertPoint.innerHTML;
        this.port = 8080;
        this.json = json;
        this.output = '';

        //count the color div
        this.colorArray = undefined;
        this.idx = 0;
        this.limit = 0;
        this.change();
    }
    change(){
        this.insertPoint.innerHTML = `
        <!-- ./reminder/convertedHtml -->
        <div id="result">
            <button type="button" id="goBack">Go Back</button>
            <div id="output">
                <div id="loadMessage">Loading...</div>
            </div>
            <button type="button" id="GenerateNext">Next Data</button>
        </div>
        <div id="visual">
            <p>This feature still didn't be implied</p>
        </div>
        `
        this.handlePythonData();
        document.getElementById('goBack').addEventListener('click',()=>{
            this.GoBackHandler();
        });
        document.getElementById('GenerateNext').addEventListener('click',()=>{
            this.GenerateNextHandler();
        })
    }
    #checkRGBFormat(rgb){
        var commaCount = 0,left = 0,right = 0;
        for(let ch of rgb){
            if(!(ch.charCodeAt(0)>=48&&ch.charCodeAt(0)<58)){
                switch(ch){
                    case ',':
                        ++commaCount;
                        if(commaCount>2)return false;
                        break;
                    case '(':
                        ++left;
                        if(left>1)return false;
                        break;
                    case ')':
                        ++right;
                        if(right>1)return false;
                        break;
                    case ' ':
                        break;
                    default:
                        return false;
                }
            }
        }
        return commaCount===2&&left===1&&right===1;
    }
    convertColorDiv(nxt){
        var root = document.getElementById('output');
        for(;this.idx<nxt;++this.idx){
            let [key,val] = this.colorArray[this.idx].split('=');
            if(!this.#checkRGBFormat(key))continue;
            var cur = document.createElement('div');
            cur.className = 'addedColorDiv';
            cur.innerHTML = `rgb${key} appears ${val} time(s)`;
            root.appendChild(cur);
        }
    }
    #ClientFetchPromise(time){
        //to Timeout fetch function
        const abortController = new AbortController();
        const abortSignal = abortController.signal;

        const timelimit = new Promise((_,rej)=>{
            setTimeout(()=>{
                abortController.abort(); 
                rej('Time out!');
            },time);
        });
        return Promise.race(
            [
                fetch(`http://localhost:${this.port}/running`,{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:this.json,
                    signal:abortSignal
                })
                .then(res=>{
                    if(!res.ok){
                        throw new Error(`Network Error!`);
                    }
                    // console.log(res)
                    return res.json();
                }).then(data=>{
                    // console.log(data)
                    this.output = data.output;
                })
                .catch(err=>{
                    console.error(`Error:${err}`)
                    alert(`Error:${err}`)
                })
                ,timelimit
            ]
        );
    }
    async handlePythonData(){
        // console.log(this.json)
        const dataPerTime = 20000;
        var obj = JSON.parse(this.json);
        var time = 'data' in obj?
        (Number(obj['data'])>4*Math.pow(10,11)?
        Number.MAX_SAFE_INTEGER:Number(obj['data'])*dataPerTime)
        :10*dataPerTime;
        await this.#ClientFetchPromise(time);
        this.colorArray = this.output.split('!');
        this.limit = this.colorArray.length;
        var res = document.getElementById('output');
        res.innerHTML = '';
        this.initColorDiv();
    }
    initColorDiv(){
        var nxt = this.idx+10<this.limit?this.idx+10:this.limit;
        this.convertColorDiv(nxt);
    }
    GoBackHandler(){
        this.cleanUp();
        this.insertPoint.innerHTML = this.tempHtml;
        Control();
    }
    GenerateNextHandler(){
        this.initColorDiv();
    }
    cleanUp(){
        document.getElementById('GenerateNext').removeEventListener('click',this.GenerateNextHandler);
        document.getElementById('goBack').removeEventListener('click',this.GoBackHandler);
    }
};