
import os from 'os';
import { cd, ls, up } from './actions/nwd/_nwd.js';
import { cat, add, rn, cp } from './actions/files/_files.js';
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

process.stdin.on("data", data => {
    const formatData = String(data).trim().split(' ');
        switch (formatData[0]) {
            case '.exit':
                farewell();
                break;
            case 'up':
                up(formatData);
                break;
            case 'cd':
                cd(formatData);
                break;
            case 'ls':
                ls(formatData);
                break;
            case 'cat':
                cat(formatData);
                break;
            case 'add':
                add(formatData);
                break;
            case 'rn':
                rn(formatData);
                break;
            case 'cp':
                cp(formatData);
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
