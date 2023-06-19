
import os from 'os';
import path from 'path';
import fs from 'fs';
import cd from './cd.js';

const userHomeDir = os.homedir();
let currDir = userHomeDir;

const FAILED = 'Operation failed';
const INVALID = 'Invalid input';

let username;
process.argv.some(elem => {
    if (elem.includes("--username")) {
        username = elem.split('=')[1];
        return true;
    }
});
if (!username) {
    username = 'Anonymous';
    console.log('The username is set up to Anonymous, cause there\'s no flag --username or it\'s value is empty');
}

function farewell () {
    process.stdout.write(`Thank you for using File Manager, ${username}, goodbye!\n`);
    process.exit();
}

async function isFile(path) {  
    const stats = await fs.stat(path);
  
    return stats.isFile()
  }

process.stdin.on("data", async data => {
    const formatData = String(data).trim();
    if (formatData.includes('cd')) {
        const nextFolder = formatData.split(' ')[1]
        if (nextFolder) {
            process.stdout.write(`${INVALID}: enter directory name\n`);
        } else {
            cd();
            const checkDir = path.join(currDir, nextFolder);
            fs.stat(checkDir, (err) => {
                if (!err) {
                    currDir = checkDir;
                    process.stdout.write(`You are currently in ${currDir}\n`);
                }
                else if (err.code === 'ENOENT') {
                    process.stdout.write(`${INVALID}: there is no such directory\n`);
                }
            });
            
        }
        
    } else {
        switch (formatData) {
            case '.exit':
                farewell();
                break;
            case 'up':
                if (path.parse(currDir).root !== currDir) {
                    currDir = path.join(currDir, '..');
                };
                break;
            case 'ls':
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
                
                break;

            default: 
                process.stdout.write(`${FAILED}: there's no such command\n`);
        }
        process.stdout.write(`You are currently in ${currDir}\n`);
    }
    
    
});

process.on("SIGINT", () => {
    farewell();
});



console.log(`Welcome to the File Manager, ${username}!`);
console.log(`You are currently in ${currDir}`);