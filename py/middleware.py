import RunCommand
import collectRGB
import json
import os
from pathlib import Path
from collections import defaultdict

class Connection:
    def __init__(self,mp:dict):
        self.mp = mp
        self.color = set()
        self.web = None
        self.keyword = None
        self.dataCount = -1
        self.res = defaultdict(int)

        #execute the main function
        self.main()
    #try to organize the dictionary value and do data flow
    def main(self):
        self.cleanUpData()
        if self.web==None or self.keyword==None:
            print('python:there may be some wrong when passing hashmap data')
            return
        if self.dataCount!=-1:  RunCommand.runningScrapy(self.web,self.keyword,self.dataCount)
        else:   RunCommand.runningScrapy(self.web,self.keyword)
        self.ReadJSON()

    def cleanUpData(self):
        temp_arr = []
        for key in self.mp:
            if  'color' in key:
                temp_arr.append(self.convertColor(self.mp[key]))
            elif 'website' in key:
                self.web = self.mp[key]
            elif 'data' in key:
                if not self.mp[key].isdigit():
                    print('there is an Error in catching how many data to retrieve')
                    continue  
                self.dataCount = int(self.mp[key])
            elif 'keyword' in key:
                self.saveKeyWord(self.mp[key])
        self.color = set(temp_arr)
    def convertColor(self,color:str):
        hex_str = (int(color[1:3],16),int(color[3:5],16),int(color[5:],16))
        return hex_str
    def saveKeyWord(self,keyword:str):
        res = ''
        for ch in keyword:
            if ch==',' or ch==' ' or ch=='\n':
                res += '%20'
            else:   res += ch
        self.keyword = res
    def ReadJSON(self):
        try:
            dir_name =  Path('./mining')
            cur_dir = os.path.dirname(__file__)
            os.chdir(dir_name.resolve())
            with open('output.json','r') as reader:
                data = json.load(reader)
                # print(data)
                self.FeedData(data)
        except FileNotFoundError:
            print('python:There is Error on opening result json of scrapy')
        except json.JSONDecodeError:
            print('python:There is Error on Decoding JSON')
        os.chdir(cur_dir)
    def FeedData(self,data:list):
        for dc in data:
            arr = collectRGB.collect(dc['url'])
            for it in arr:
                if it in self.color:    continue
                self.res[it] += 1
    #User used Function
    def getData(self):
        return self.res

if __name__ == '__main__':
    mp = dict()
    mp['keyword'] = 'dog'
    mp['website'] = 'pinterest'
    mp['data'] = '10'
    mp['color'] = '#ffffff'
    # mp['color'] = ''
    test = Connection(mp)
    print(test.getData())
    
