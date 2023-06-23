import { INVALID, FAILED } from "../constants/errors.js";
import { currDir } from "../index.js";
import path from 'path';
import fs from 'fs';

export const ls = (data) => {
    if (data.length > 1) {
        process.stdout.write(`${INVALID}: the command should be without parameters`);
        return;
    }
    const arrFiles = [];
    const arrDirs = [];
    const arrLinks = [];
    class folderContent {
        constructor(name, type) {
            this.Name = name;
            this.Type = type;
        }
    }
    
    fs.readdir(currDir, { withFileTypes: true }, (err, files) => {
        files.forEach((file) => {
                if (file.isFile()) {
                            arrFiles.push(new folderContent(file.name, 'file'));
                        } else if (file.isSymbolicLink()) {
                            arrLinks.push(new folderContent(file.name, 'link'));
                        } else {
                            arrDirs.push(new folderContent(file.name, 'directory'));
                        };
                    });
                    arrDirs.sort();
                    arrFiles.sort();
                    arrLinks.sort()

                    console.table(arrDirs.concat(arrFiles).concat(arrLinks));
                });
                
}