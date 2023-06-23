import { INVALID, FAILED } from "../constants/errors.js";
import { currDir } from "../index.js";
import path from 'path';
import fs from 'fs';

export const add = (formatData) => {
    if (formatData.length != 2) {
        process.stdout.write(FAILED);
        return;
    };
    const pathFile = path.resolve(currDir, formatData[1]);
    fs.open(pathFile, 'wx', (err, file) => {
        if (err) {
            process.stdout.write(`${FAILED}\n: file exists`);
        };
        process.stdout.write(`${formatData[1]} has been created\n`);
        process.stdout.write(`You are currently in ${currDir}\n`);
    })
}