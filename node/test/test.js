const fs = require('fs');
const path = require('path');

let testPath = path.resolve('../test');
let res = [];

readFileName(testPath).then(() => {
    console.log(res);
});

async function readFileName(filePath) {
    await fs.readdir(filePath, (err, files) => {
        if (err) {
            throw err;
        }
        files.forEach((filename, index) => {
            let fileDir = path.join(filePath, filename);
            fs.stat(fileDir, (err, stats) => {
                if (err) {
                    throw err;
                }
                let isFile = stats.isFile();
                let isDir = stats.isDirectory();

                if (isFile) {
                    res.push({
                        [fileDir]: filename
                    });
                }

                if (isDir) {
                    readFileName(fileDir);
                }
            })
        })
    })
}

