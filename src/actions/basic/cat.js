import { INVALID, FAILED } from "../../constants/errors.js";
import { currDir } from "../../index.js";
import path from 'path';
import fs from 'fs';

export default async function cat(formatData) {
    if (formatData.length != 2) {
        process.stdout.write(FAILED);
        return;
    };

    const checkFile = path.resolve(currDir, formatData[1]);
           fs.stat(checkFile, (err) => {
                if (!err) {
                    const fileStream = fs.createReadStream(checkFile);
                    fileStream.on('data', (chunk) => console.log(chunk));
                    fileStream.on('error', () => process.stdout.write(`${FAILED}: can't read the file\n`));
                    fileStream.on('end', () => process.stdout.write(`You are currently in ${currDir}\n`)); 
                }
                else if (err.code === 'ENOENT') {
                    process.stdout.write(`${INVALID}: there is no such file\n`);
                }
            });

    
}
