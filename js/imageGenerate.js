"use strict";
const Jimp = require('jimp');
const path = require('node:path');


class ImgControl{
    constructor(data){
        this.totalSpot = 0;
        this.width = undefined;
        this.height = undefined;
        this.colorArray = [];
        this.data = this.#transferdata(data);
    }
    //this function may be isolate to global that reduce the code line
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
    #transferdata(data){
        var tempArray = data.split('!');
        // var ArrayLength = tempArray.length;
        for(let it of tempArray){
            let [key,val] = it.split('=');
            if(!this.#checkRGBFormat(key))continue;
            var num = Number(val);
            if(!isNaN(num)){
                this.totalSpot += num;
                var tmp = this.#rgbStringToJimpForm(key);
                if(tmp!==undefined){
                    for(let i =0;i<num;++i){
                        this.colorArray.push([...tmp]);
                    }
                }
            }
        }
        this.#randomArrange();
        this.#convertWidthHeight();
    }
    #convertWidthHeight(){
        var largest = Math.floor(Math.sqrt(this.totalSpot));
        this.height = this.width = largest;       
    }
    #rgbStringToJimpForm(rgbString) {
        var [,r,g,b] = rgbString.match(/\((\d+), (\d+), (\d+)\)/) || [];
        if(isNaN(Number(r))||isNaN(Number(g))||isNaN(Number(b)))return undefined;
        //rgba list
        return [Number(r),Number(g),Number(b),Number(255)];
    }
    #randomArrange(){
        for(var idx = this.colorArray.length-1;idx>0;--idx){
            var change_idx = Math.floor(Math.random()*(idx));
            [this.colorArray[idx],this.colorArray[change_idx]] = [this.colorArray[change_idx],this.colorArray[idx]];
        }
    }
    generateImg(){
        return new Promise((res,rej)=>{
            try{
                const Image = new Jimp(this.width,this.height,(err,image)=>{
                    if(err)console.error(`${err}`);
                    for(let i = 0;i<this.width;++i){
                        for(let j = 0;j<this.height;++j){
                            var tmp = undefined;
                            if(i*this.height+j<this.colorArray.length){
                                const color = this.colorArray[i * this.height + j];
                                // console.log('Color Array:', color);
                                tmp = Jimp.rgbaToInt(...color);
                            }
                            else tmp = Jimp.rgbaToInt(0,0,0,255);
                            image.setPixelColor(tmp,i,j);
                        }
                    }
                    image.write(path.join(__dirname,'image','output.jpg'),(err)=>{
                        if(err)console.error(`${err}`);
                        console.log('Image created and saved as output.jpg');
                    })
                });
                res('yeah!');
            }catch(err){
                rej('Didn\'t fullfilled to generate the image');
            }
        });
    }
};

module.exports = ImgControl;