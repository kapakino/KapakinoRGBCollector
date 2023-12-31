import subprocess
from pathlib import Path
import os
import sys

#path to scrapy
FILE = Path('./mining')

def runningScrapy(web:str,keyWord:str,data:int=-1):
    cur_dir = os.path.dirname(__file__)
        
    if not FILE.exists(): 
        print('There is an Error in Path of Scrapy.')  
    try:
        os.chdir(FILE.resolve())
        cmd = f'scrapy crawl {web} -a keyword="{keyWord}"'
        if(data!=-1):  cmd += f' -a data={int(data)}'
        # print(cmd)
        #redirect the output to devnull
        #If there is unexpected error may happened in here
        sys.stdout = open(os.devnull,'w')
        res = subprocess.run(cmd,shell=True,check=True,stdout=subprocess.PIPE,stderr=subprocess.PIPE,text=True)
        if res.stderr:  print(res.stderr)
        sys.stdout = sys.__stdout__

    except subprocess.CalledProcessError as e:
        print('python:',e.stderr)
    os.chdir(cur_dir)
if __name__=='__main__':
    runningScrapy('pinterest','dog',100)