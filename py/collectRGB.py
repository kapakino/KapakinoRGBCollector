from PIL import Image

def collect(path:str):
    im = Image.open(f'{path}','r')
    width,height = im.size
    return list(im.getdata()),width,height

if __name__ == '__main__':
    test,_,_ = collect('../test/test.jpg')
    print(test)