import fs from 'fs';
import { FAILED } from '../constants/errors.js';

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
    console.log(isFileResult);
    return isFileResult;
};
