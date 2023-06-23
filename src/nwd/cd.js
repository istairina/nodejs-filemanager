import { INVALID, FAILED } from "../constants/errors.js";
import path from 'path';

export const cd = (formatData) => {
    if (formatData.length != 2) {
        process.stdout.write(`${FAILED}\n`);
        return;
    };

    const nextFolder = formatData[1];

    const checkDir = path.resolve(currDir, nextFolder);
    try {
        process.chdir(checkDir);
    }
    catch (err) {
        process.stdout.write(`${INVALID}\n`);
    }
    process.stdout.write(`You are currently in ${process.cwd()}\n`);

}