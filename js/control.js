"use strict";
import ResultBlock from "./resultControl.js";
var color_idx = 1;
export default function Control(){
    // console.log("Control Entered!");
    var option = document.getElementById('option');
    var start = document.getElementById('start');


    //handle the option input
    var default_option = {
        'data': 10
    };
    option.addEventListener('submit',(e)=>{
        e.preventDefault();
        var arr = option.getElementsByTagName('input');
        for(let it of arr){
            if(it.type==='submit')continue;
            default_option[it.name] = it.value;
        }
    })
    var web = document.getElementById('website');
    var web_option = 'pinterest';
    web.addEventListener('change',()=>{
        var selectWeb = web.options[web.selectedIndex];
        web_option = selectWeb.value;
    })
    //handle the start been pressed
    start.addEventListener('submit',(e)=>{
        e.preventDefault();
        default_option['website'] = web_option;
        var arr = start.children;
        let queue = [...arr];
        while(queue.length!==0){
            let cur = queue.shift();
            if(cur.hasAttribute('name')&&cur.nodeType===1)
                default_option[cur.name] = cur.value;
            let nxt = cur.children;
            queue.push(...nxt);
        }
        // console.log(default_option)

        var json = JSON.stringify(default_option);
        localStorage.setItem('setting',json);
        // console.log(localStorage.getItem('setting'))

        //there should be no used of this variable, it will handle the logic itself
        var showResult = new ResultBlock();
    })

    //control the screen
    var display = document.getElementById('container');
    display.addEventListener('mouseenter',(e)=>{
        // console.log('enter')
        document.documentElement.style.overflowY = 'hidden';
    });
    display.addEventListener('mouseleave',(e)=>{
        document.documentElement.style.overflowY = 'scroll';
    });

    //add Color button
    var createColorButton = document.getElementById('createColor');
    var insertColorElement = document.getElementById('colorInsertPoint');
    createColorButton.addEventListener('click',(e)=>{
        if(color_idx>=4)return;
        var newElement = document.createElement('input');
        newElement.type = 'color';
        newElement.name = `color${color_idx}`; 
        newElement.id = `color${color_idx}`;
        ++color_idx;
        insertColorElement.appendChild(newElement);
    });
    var deleteColorButton = document.getElementById('deleteColor');
    deleteColorButton.addEventListener('click',(e)=>{
        if(color_idx==1)return;
        --color_idx;
        var element = document.getElementById(`color${color_idx}`);
        insertColorElement.removeChild(element);
    });
}