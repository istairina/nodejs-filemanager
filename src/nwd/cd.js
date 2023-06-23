import { INVALID, FAILED } from "../constants/errors.js";
import path from 'path';

export const cd = (formatData) => {
    if (formatData.length != 2) {
        process.stdout.write(`${INVALID}: wrong number of args\n`);
        return;
    };

    const nextFolder = formatData[1];

    const checkDir = path.resolve(process.cwd(), nextFolder);
    try {
        process.chdir(checkDir);
    }
    catch (err) {
        process.stdout.write(`${INVALID}\n`);
    }
    process.stdout.write(`You are currently in ${process.cwd()}\n`);

}