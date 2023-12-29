import sys

def main():
    arg = sys.argv[1:]
    data = dict()
    for it in arg:
        key,val = it.split('=')
        data[key] = val
        print(key,' ',val)

if __name__=='__main__':
    main()