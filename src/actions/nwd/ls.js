import { INVALID, FAILED } from "../../constants/errors.js";
import { currDir } from "../../index.js";
import path from 'path';
import fs from 'fs';

export default function ls(data) {
    if (data.length > 1) {
        process.stdout.write(`${INVALID}: the command should be without parameters`);
        return;
    }
    const arrFiles = [];
    const arrDirs = [];
    
    fs.readdir(currDir, { withFileTypes: true }, (err, files) => {
        files.forEach((file) => {
                if (file.isFile()) {
                            arrFiles.push(file.name);
                        } else {
                            arrDirs.push(file.name);
                        };
                    });
                    arrDirs.sort();
                    arrFiles.sort();

                    console.log(arrDirs.concat(arrFiles));
                });
                
}