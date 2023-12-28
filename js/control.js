"use strict";
export default function Control(){
    console.log("Control Entered!");
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
        console.log(default_option)

        var json = JSON.stringify(default_option);
        localStorage.setItem('setting',json);
        // console.log(localStorage.getItem('setting'))
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
}