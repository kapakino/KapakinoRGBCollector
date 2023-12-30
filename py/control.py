import sys
import os
import middleware

def main():
    arg = sys.argv[1:]
    data = dict()
    for it in arg:
        key,val = it.split('=')
        data[key] = val
        # print(key,' ',val,' ',type(val))
    sys.stdout = open(os.devnull,'w')
    handleData = middleware.Connection(data)
    sys.stdout = sys.__stdout__
    res = handleData.getData()
    for it in res:
        print(it,' ',res[it])

if __name__=='__main__':
    main()