#! /usr/local/bin/python3
import sys
from requests import get

args = sys.argv
argc = len(args)

if argc < 2:
    print(f"Usage: {args[0]} <url>")
    sys.exit(1)
    
url = args[1]

try:
    response = get(url)
    print(response.text)
except Exception as e:
    print(e)
    sys.exit(1)