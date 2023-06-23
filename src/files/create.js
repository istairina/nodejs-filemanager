import { INVALID, FAILED } from "../constants/errors.js";
import path from 'path';
import fs from 'fs';

export const add = (formatData) => {
    if (formatData.length != 2) {
        process.stdout.write(`${INVALID}: wrong number of args\n`);
        return;
    };
    const pathFile = path.resolve(process.cwd(), formatData[1]);
    fs.open(pathFile, 'wx', (err, file) => {
        if (err) {
            process.stdout.write(`${FAILED}: file exists or folder doesn't\n`);
            return;
        };
        process.stdout.write(`${formatData[1]} file has been created\n`);
        process.stdout.write(`You are currently in ${process.cwd()}\n`);
    })
}