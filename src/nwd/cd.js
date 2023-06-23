import { INVALID, FAILED } from "../constants/errors.js";
import { currDir, setCurrDir } from "../index.js";
import path from 'path';
import fs from 'fs';

export const cd = (formatData) => {
    if (formatData.length != 2) {
        process.stdout.write(FAILED);
        return;
    };

    const nextFolder = formatData[1];

    const checkDir = path.resolve(currDir, nextFolder);
           fs.stat(checkDir, (err) => {
                if (!err) {
                    setCurrDir(checkDir);
                    process.stdout.write(`You are currently in ${currDir}\n`);
                }
                else if (err.code === 'ENOENT') {
                    process.stdout.write(`${INVALID}: there is no such directory\n`);
                }
            });


}