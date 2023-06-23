import { INVALID, FAILED } from "../../constants/errors.js";
import { currDir } from "../../index.js";
import path from 'path';
import fs from 'fs';

export default async function cp(formatData) {
    if (formatData.length != 3) {
        process.stdout.write(`${FAILED}\n`);
        return;
    };

    const originalFile = path.resolve(currDir, formatData[1]);
    let isOriginalFile;
    fs.stat(originalFile, (err, stats) => {
        if (err) {
            process.stdout.write(`${FAILED}\n`);
            return;
        } 
        return stats.isFile();
        // return stats.isFile();
    }).then((data) => {
        console.log(data);
    });
    
    const newFile = path.resolve(currDir, formatData[2]);
    const readable = fs.createReadStream(originalFile);
    const writable = fs.createWriteStream(newFile);
    readable.pipe(writable);
        //    fs.stat(checkFile, (err) => {
        //         if (!err) {
        //             const fileStream = fs.createReadStream(checkFile);
        //             fileStream.on('data', (chunk) => console.log(chunk));
        //             fileStream.on('error', () => process.stdout.write(`${FAILED}: can't read the file\n`));
        //             fileStream.on('end', () => process.stdout.write(`You are currently in ${currDir}\n`)); 
        //         }
        //         else if (err.code === 'ENOENT') {
        //             process.stdout.write(`${INVALID}: there is no such file\n`);
        //         }
        //     });
}
