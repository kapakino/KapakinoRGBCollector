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
    ans = ''
    for it in res:
        ans += f'{it}={res[it]}!'
    ans = ans[:-1]
    print('PythonOutput:',ans)
if __name__=='__main__':
    main()