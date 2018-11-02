/**
 * 1. 读取文件目录下的文件名称
 * 2. 生成文件hash值
 * 2. 修改文件名称
 */

const fs = require('fs');
const crypto = require('crypto');

fs.readdir('./file', (err, files) => {
    if (err) {
        throw err;
    }
    files.forEach((value, index) => {
        console.log(`value is: ${value}`);
        fs.readFile('./file/' + value, (err, data) => {
            if (err) {
                throw err;
            }
            let suffix = crypto.createHash('md5').update(data).digest('hex').slice(0, 6);
            console.log(`suffix: ${suffix}`);
            let valueArr = value.split('.');
            let mainFileName = valueArr[0];
            let lastSuffix = valueArr[1];
            fs.writeFile(`./dist/${mainFileName}.${suffix}.${lastSuffix}`, data, err => {
                if (err) {
                    throw err;
                }
            });
        });
    });
});
