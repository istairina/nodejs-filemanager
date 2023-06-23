import { INVALID, FAILED } from "../constants/errors.js";
import path from 'path';
import fs from 'fs';

export const rn = (formatData) => {
    if (formatData.length != 3) {
        process.stdout.write(`${INVALID}: wrong number of args\n`);
        return;
    };
    const pathFile = path.resolve(process.cwd(), formatData[1]);
    const pathNewFile = path.resolve(process.cwd(), formatData[2]);
    fs.rename(pathFile, pathNewFile, (err) => {
        if (err) {
            process.stdout.write(`${FAILED}\n`);
        } else {
            process.stdout.write(`${formatData[1]} has been renamed to ${formatData[2]}\n`);
            process.stdout.write(`You are currently in ${process.cwd()}\n`);
        };
        
    })
}