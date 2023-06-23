import fs from 'fs';

export const isFile = (pathToFile) => {
    let isFileResult = false;
    fs.stat(pathToFile, (err, stats) => {
        if (err) {
            process.stdout.write(`${FAILED}\n`);
            return;
        } 
        if (stats.isFile()) {
            isFileResult = true;
        }
    });
    return isFileResult;
};
