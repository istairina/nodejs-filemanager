import os from 'os';
import { INVALID, FAILED } from "../constants/errors.js";
import { currDir } from "../index.js";

export const osx = (data) => {
    if (data.length != 2) {
        process.stdout.write(`${FAILED}\n`);
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
            process.stdout.write(`${os.homedir()}\n`);
            break;
        case '--username':
            process.stdout.write(`${os.userInfo().username}\n`);
            break;
        case '--architecture':
            process.stdout.write(`${os.arch()}\n`);
            break;
        default:
            process.stdout.write(`${INVALID}\n`);
    }
    console.log(`You are currently in ${currDir}`);
};