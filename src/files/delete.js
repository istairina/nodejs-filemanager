import { INVALID, FAILED } from "../constants/errors.js";
import { currDir } from "../index.js";
import path from 'path';
import fs from 'fs';

export default async function rm(formatData) {
    if (formatData.length != 2) {
        process.stdout.write(FAILED);
        return;
    };
    const pathFile = path.resolve(currDir, formatData[1]);
    fs.stat(pathFile, (err, stats) => {
        if (err) {
            process.stdout.write(`${FAILED}\n`);
            return;
        } 
        if (!stats.isFile()) {
            process.stdout.write(`${INVALID}\n`);
            return;
        }
        
        fs.unlink(pathFile, (err) => {
            if (err) {
                process.stdout.write(`${FAILED}\n`);
            }
            console.log(`You are currently in ${currDir}`);
        });
    });
};
