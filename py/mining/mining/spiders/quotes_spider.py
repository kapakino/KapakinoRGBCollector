import scrapy
import json

COUNT = 10

#command to run ...
#scrapy crawl pinterest -a keyword=""
class PinterestSpider(scrapy.Spider):
    name='pinterest'
    #setting to let it pass robot.txt
    custom_settings = {
        'ROBOTSTXT_OBEY': False,
    }
    def start_requests(self):
        keyword = getattr(self,'keyword',None)
        url = f'https://www.pinterest.jp/search/pins/?q={keyword}'
        yield scrapy.Request(url=url,callback=self.parse)
    def parse(self,res):
        self.log('seccessfully accessed to pinterest...')
        with open('output.json','w',encoding='utf-8') as pinterest:
            pinterest.write('[')
            for idx,content in enumerate(res.css('img')):
                json.dump({
                    'url':content.css('img::attr(src)').get()
                },pinterest,ensure_ascii=False)
                self.log(f"loading {content.css('img::attr(src)').get()}")
                if idx<COUNT:   pinterest.write(',\n')
                else:   break
            pinterest.write(']')