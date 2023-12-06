from PIL import Image

def collect(path:str):
    im = Image.open(f'{path}','r')
    if im.mode != 'RGB':    im.convert('RGB')
    width,height = im.size
    pixels = []
    for i in range(height):
        for j in range(width):
            pixels.append(im.getpixel((j,i)))
    return pixels,width,height
if __name__ == '__main__':
    #this collect the collor not white
    test,_,_ = collect('../test/test.jpg')
    for it in test:
        if it==(255,255,255):
            pass
        else: print(it)