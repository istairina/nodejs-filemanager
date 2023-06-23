import { INVALID, FAILED } from "../constants/errors.js";
import path from 'path';
import fs from 'fs';

export const mv = (formatData) => {
    if (formatData.length != 3) {
        process.stdout.write(`${INVALID}: wrong number of args\n`);
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
            process.stdout.write(`${INVALID}: choose file to move\n`);
            return;
        }
        fs.stat(destination, (err, stats) => {
            if (err) {
                process.stdout.write(`${FAILED}\n`);
                return;
            };
            if (!stats.isDirectory()) {
                process.stdout.write(`${INVALID}: choose folde for destination \n`);
                return;
            };
            const newFile = path.resolve(destination, path.basename(originalFile));
            fs.open(newFile, (err) => {
                if (!err) {
                    process.stdout.write(`${FAILED}: file already exist\n`);
                    return; 
                };
                const readable = fs.createReadStream(originalFile);
                const writable = fs.createWriteStream(newFile);
                try {
                    readable.pipe(writable);
                    writable.on('finish', () => {
                        fs.unlink(originalFile, (err) => {
                            if (err) process.stdout.write(`${FAILED}\n`);
                        });
                        console.log('file moved');
                    });  
                }
                catch (err) {
                    process.stdout.write(`${FAILED}\n`);
                }
          
                console.log(`You are currently in ${process.cwd()}`);
            })
        });
    });
}
