
import os from 'os';
import path from 'path';
import fs from 'fs';
import cd from './actions/nwd/cd.js';
import up from './actions/nwd/up.js';
import ls from './actions/nwd/ls.js';
import { username } from './constants/username.js';
import { INVALID, FAILED } from './constants/errors.js';

const userHomeDir = os.homedir();
export let currDir = userHomeDir;
export function setCurrDir(newDir) {
    currDir = newDir;
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
    const formatData = String(data).trim().split(' ');
        switch (formatData[0]) {
            case '.exit':
                farewell();
                break;
            case 'up':
                up(formatData);
                break;
            case 'cd':
                await cd(formatData);
                break;
            case 'ls':
                ls(formatData);
                
                break;

            default: 
                process.stdout.write(`${INVALID}\n`);
        }
        
    }

);

process.on("SIGINT", () => {
    farewell();
});



console.log(`Welcome to the File Manager, ${username}!`);
console.log(`You are currently in ${currDir}`);