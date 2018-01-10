#!/bin/sh

rm -rf dist
mkdir dist
cp -r files/ dist/

node src/index.js
