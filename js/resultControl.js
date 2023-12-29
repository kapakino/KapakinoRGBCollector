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
            <div id="output"></div>
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
    handlePythonData(){
        // console.log(this.json)
        fetch(`http://localhost:${this.port}/running`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:this.json
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
        .catch(err=>console.error(`Error:${err}`))
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