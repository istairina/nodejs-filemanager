import { INVALID, FAILED } from "../constants/errors.js";
import { currDir } from "../index.js";
import path from 'path';
import fs from 'fs';

export default async function mv(formatData) {
    if (formatData.length != 3) {
        process.stdout.write(`${FAILED}\nnumber of args`);
        return;
    };

    const originalFile = path.resolve(currDir, formatData[1]);
    const destination = path.resolve(currDir, formatData[2]);
    fs.stat(originalFile, (err, stats) => {
        if (err) {
            process.stdout.write(`${FAILED}\n`);
            return;
        } 
        if (!stats.isFile()) {
            process.stdout.write(`${INVALID}\n`);
            return;
        }
        fs.stat(destination, (err, stats) => {
            if (err) {
                process.stdout.write(`${FAILED}\n`);
                return;
            };
            if (!stats.isDirectory()) {
                process.stdout.write(`${INVALID}\n`);
                return;
            };
            const newFile = path.resolve(destination, path.basename(originalFile));
            fs.access(newFile, (err) => {
                if (!err) {
                    process.stdout.write(`${FAILED}\n`);
                    return; 
                };
                const readable = fs.createReadStream(originalFile);
                const writable = fs.createWriteStream(newFile);
                readable.pipe(writable);
                writable.on('finish', () => {
                    fs.unlink(originalFile, (err) => {
                        if (err) process.stdout.write(`${FAILED}\n`);
                    });
                });            
                console.log(`You are currently in ${currDir}`);
            })
        });
    });
}
