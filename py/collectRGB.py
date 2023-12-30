from PIL import Image
import requests
from io import BytesIO

def collect(pathUrl:str):
    res = requests.get(pathUrl)
    if res.status_code==200:
        img = Image.open(BytesIO(res.content))
        return list(img.getdata())
    else:
        print('python:Network Error when fetching picture')
        return None
if __name__ == '__main__':
    path = 'https://i.pinimg.com/236x/5c/e6/a4/5ce6a4fc5a3ef4f5e052ca58aa71cb1c.jpg'
    test = collect(path)
    if test!=None:  print(test)
    print(type(test[0]))