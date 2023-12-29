import Control from "./control.js";
export default class ResultBlock{
    constructor(){
        this.insertPoint = document.getElementById('dynamic');
        this.tempHtml = this.insertPoint.innerHTML;
        this.change();
    }
    change(){
        this.insertPoint.innerHTML = `
        <!-- ./reminder/convertedHtml -->
        <div id="result">
            <button type="button" id="goBack">Go Back</button>
        </div>
        <div id="visual">
            <p>This feature still didn't be implied</p>
        </div>
        `
        document.getElementById('goBack').addEventListener('click',()=>{
            this.GoBackHandler();
        })
    }
    GoBackHandler(){
        this.cleanUp();
        this.insertPoint.innerHTML = this.tempHtml;
        Control();
    }
    cleanUp(){
        document.getElementById('goBack').removeEventListener('click',this.GoBackHandler);
    }
};