#!/usr/bin/python3

import json

fuku1 = "ipfs://QmSKC9Cbn6SZo5FANCJHFGYhcVxvcwMYcpyYTrqq6JbWTA/fuku1.png"
fuku2 = "ipfs://QmSKC9Cbn6SZo5FANCJHFGYhcVxvcwMYcpyYTrqq6JbWTA/fuku2.png"
fuku3 = "ipfs://QmSKC9Cbn6SZo5FANCJHFGYhcVxvcwMYcpyYTrqq6JbWTA/fuku3.png"
fuku4 = "ipfs://QmSKC9Cbn6SZo5FANCJHFGYhcVxvcwMYcpyYTrqq6JbWTA/fuku4.png"

fukus = [fuku1, fuku2, fuku3, fuku4]

import random

def generateMetadata(jsonFolderPath):
    # public
    for idx in range(0, 50):
      data = {}
      data['name'] = "Fukuro" + str(idx-1000)
      data['image'] = random.choice(fukus)
      data['description'] = "Bundle with EIP 6551."
      with open(jsonFolderPath+ str(idx) +'.json', 'w+', encoding='utf-8') as jsonf:
        jsonf.write(json.dumps(data, indent=4))

filepath = "data/metadata/"
generateMetadata(filepath)