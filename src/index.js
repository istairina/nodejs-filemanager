
import os from 'os';
import { username } from './constants/username.js';
import { INVALID } from './constants/errors.js';
import { stdin as input, stdout as output, cwd } from 'node:process';
import * as readline from 'node:readline/promises';
import { commands } from './commands.js';

process.chdir(os.homedir());

export const farewell = () => {
    output.write(`Thank you for using File Manager, ${username}, goodbye!\n`);
    rl.close();
};

const rl = readline.createInterface({ input, output });

rl.on("line", (data) => {
    const formatData = String(data).trim().split(' ');
    if (commands[formatData[0]] || formatData[0] === '.exit') {
        if (formatData[0] === '.exit') {
            farewell();
            return;
        }
        commands[formatData[0]](formatData);
    } else {
        console.log(`${INVALID}: wrong command`);
    }
    }
);

rl.on("SIGINT", () => {
    farewell();
});

console.log(`Welcome to the File Manager, ${username}!`);
console.log(`You are currently in ${cwd()}`);
