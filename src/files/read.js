import { INVALID, FAILED } from "../constants/errors.js";
import path from 'path';
import fs from 'fs';

export const cat = (formatData) => {
    if (formatData.length != 2) {
        process.stdout.write(`${INVALID}: wrong number of arguments\n`);
        return;
    };

    const checkFile = path.resolve(process.cwd(), formatData[1]);
           fs.stat(checkFile, (err) => {
                if (!err) {
                    const fileStream = fs.createReadStream(checkFile);
                    fileStream.on('data', (chunk) => process.stdout.write(chunk));
                    fileStream.on('error', () => process.stdout.write(`${FAILED}: can't read the file or it's a folder\n`));
                    fileStream.on('end', () => process.stdout.write(`You are currently in ${process.cwd()}\n`)); 
                }
                else if (err.code === 'ENOENT') {
                    process.stdout.write(`${INVALID}: there is no such file\n`);
                } else {
                    process.stdout.write(`${FAILED}\n`);
                }
            }); 
}
