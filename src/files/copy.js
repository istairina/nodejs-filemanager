import { INVALID, FAILED } from "../constants/errors.js";
import path from 'path';
import fs from 'fs';

export const cp = (formatData) => {
    if (formatData.length != 3) {
        process.stdout.write(`${FAILED}\nnumber of args`);
        return;
    };

    const originalFile = path.resolve(process.cwd(), formatData[1]);
    const destination = path.resolve(process.cwd(), formatData[2]);
    fs.stat(originalFile, (err, stats) => {
        if (err) {
            process.stdout.write(`${FAILED}\n`);
            return;
        } 
        if (!stats.isFile()) {
            process.stdout.write(`${INVALID}: type a file name to copy\n`);
            return;
        }
        fs.stat(destination, (err, stats) => {
            if (err) {
                process.stdout.write(`${FAILED}\n`);
                return;
            } 
            if (!stats.isDirectory()) {
                process.stdout.write(`${INVALID}: type a folder for destination\n`);
                return;
            }
            const newFile = path.resolve(destination, path.basename(originalFile));
            const readable = fs.createReadStream(originalFile);
            const writable = fs.createWriteStream(newFile);
            readable.pipe(writable);
            console.log(`You are currently in ${process.cwd()}`);
        });
    });
}
