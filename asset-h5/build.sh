#! /bin/bash

echo "npm run build"

node -v

rm -rf output

npm install

npm rebuild node-sass

ls -al

npm run build

mkdir output

cd output

cp -r ../dist ./

mv dist smarthome

tar -czf smarthome.tar.gz smarthome

rm -rf smarthome

echo "build success"