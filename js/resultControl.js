import Control from "./control.js";
export default class ResultBlock{
    constructor(json){
        this.insertPoint = document.getElementById('dynamic');
        this.tempHtml = this.insertPoint.innerHTML;
        this.port = 8080;
        this.json = json;
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
        </div>
        <div id="visual">
            <p>This feature still didn't be implied</p>
        </div>
        `
        this.handlePythonData();
        document.getElementById('goBack').addEventListener('click',()=>{
            this.GoBackHandler();
        })
    }
    #ClientFetchPromise(time){
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
                    console.log(data)
                    var res = document.getElementById('output');
                    res.innerHTML = data.output;
                })
                .catch(err=>{
                    console.error(`Error:${err}`)
                    alert(`Error:${err}`)
                })
                ,timelimit
            ]
        );
    }
    handlePythonData(){
        // console.log(this.json)
        const dataPerTime = 20000;
        var obj = JSON.parse(this.json);
        var time = 'data' in obj?
        (Number(obj['data'])>4*Math.pow(10,11)?
        Number.MAX_SAFE_INTEGER:Number(obj['data'])*dataPerTime)
        :10*dataPerTime;
        this.#ClientFetchPromise(time);
    }
    GoBackHandler(){
        this.cleanUp();
        this.insertPoint.innerHTML = this.tempHtml;
        Control();
    }
    cleanUp(){
        this.bridge = null;
        document.getElementById('goBack').removeEventListener('click',this.GoBackHandler);
    }
};