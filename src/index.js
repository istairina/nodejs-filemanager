
import os from 'os';
import cd from './actions/nwd/cd.js';
import up from './actions/nwd/up.js';
import ls from './actions/nwd/ls.js';
import cat from './actions/basic/cat.js';
import add from './actions/basic/add.js';
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
