import {describe,it,before,beforeEach,afterEach} from 'mocha';
import {expect} from 'chai';
import {spawn,exec} from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { promisify } from 'util';
const PromiseExec = promisify(exec);

const __filename = fileURLToPath(`${import.meta.url}/..`);
const __dirname = dirname(__filename);

const callNpm = ()=>{
    return new Promise(async(res,rej)=>{
        try{
            var npm_path = 'npm'
            await PromiseExec('where npm').then((result) => {
                const { stdout, stderr } = result;
                if (stderr) {
                  console.log(stderr);
                  throw new Error(stderr);
                }
                npm_path = stdout.split('\n')[0].trim();
            });
            res(npm_path)
        }catch(error){
            console.error(error);
            rej(error)
        }
    })
}
describe('Running the Application',()=>{
    let testapp;
    beforeEach(async()=>{
       try{
            console.log(__dirname)
            const npm_path = await callNpm();
            console.log('npm path:',npm_path)
            testapp = spawn(`${npm_path}`,['run','start']);
            testapp.stdout.on('data',(data)=>{
                console.log(data);
            })
            testapp.on('error',(error)=>{
                console.log(error)
            })
        }catch(error){
            console.error(`${error}`)
        }
    })

    afterEach(async()=>{
        if(testapp!==undefined)testapp.kill('SIGTERM');
    })

    it('should open the window',async()=>{
        // var ck =document.body!==undefined;
        // if(!ck){
        //     console.error('window didn\'t be opened');
        // }
        // expect(ck).to.be.true
    })

    it('should be run without error',async()=>{

    })
})