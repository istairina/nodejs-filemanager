import os from 'os';
import { INVALID } from "../constants/errors.js";

export const osx = (data) => {
    if (data.length != 2) {
        process.stdout.write(`${INVALID}: wrong number of args\n`);
        return;
    };
    switch (data[1]) {
        case '--EOL':
            process.stdout.write(`${JSON.stringify(os.EOL)}\n`);
            break;
        case '--cpus':
            const cpus = os.cpus();
            process.stdout.write(`Total amount of CPUs is ${cpus.length}\n`);
            cpus.forEach((cpu, ind) => {
                const ghz = cpu.speed / 1000;
                process.stdout.write(`Processor #${ind + 1}: model ${cpu.model}, speed ${ghz} GHz\n`);
            });
            break;
        case '--homedir':
            process.stdout.write(`Home directory is ${os.homedir()}\n`);
            break;
        case '--username':
            process.stdout.write(`System username is ${os.userInfo().username}\n`);
            break;
        case '--architecture':
            process.stdout.write(`CPU architecture is ${os.arch()}\n`);
            break;
        default:
            process.stdout.write(`${INVALID}: wrong command\n`);
    }
    console.log(`You are currently in ${process.cwd()}`);
};
