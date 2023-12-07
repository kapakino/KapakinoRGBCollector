import scrapy
from scrapy.http import HtmlResponse
import json
import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait

COUNT = 100

#command to run ...
#scrapy crawl pinterest -a keyword=""
class PinterestSpider(scrapy.Spider):
    name='pinterest'
    #setting to let it pass robot.txt
    custom_settings = {
        'ROBOTSTXT_OBEY': False,
    }
    def __init__(self, *args, **kwargs):
        super(PinterestSpider, self).__init__(*args, **kwargs)
        chrome_options = Options()
        chrome_options.add_argument('--headless')
        self.driver = webdriver.Chrome(options=chrome_options)
        # self.driver = webdriver.Chrome()
    def start_requests(self):
        keyword = getattr(self,'keyword',None)
        url = f'https://www.pinterest.jp/search/pins/?q={keyword}'
        yield scrapy.Request(url=url,callback=self.parse)
    def parse(self,response):
        self.log('seccessfully accessed to pinterest...')
        self.driver.get(response.url)
        idx = 0
        with open('output.json','w',encoding='utf-8') as pinterest:
            pinterest.write('[')
            while idx<COUNT:
                try:
                    WebDriverWait(self.driver, timeout=20).until(lambda d: d.execute_script("return document.readyState") == "complete")
                except Exception as e:
                    self.log(f'Encounter Error:{e}')
                body = self.driver.page_source
                res = HtmlResponse(url=response.url,body=body,encoding='utf-8')
                for content in res.css('img::attr(src)'):
                    json.dump({
                        'url': content.get()
                    },pinterest,ensure_ascii=False)
                    idx += 1
                    if idx<=COUNT-1:   pinterest.write(',\n')
                    else:   break
                self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
                time.sleep(0.1)
            pinterest.write(']')