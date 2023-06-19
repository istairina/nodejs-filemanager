
import os from 'os';
import path from 'path';
import fs from 'fs';

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

process.stdin.on("data", data => {
    const formatData = String(data).trim();
    if (formatData.includes('cd ')) {
        const checkDir = path.join(currDir, formatData.split(' ')[1]);
        fs.stat(checkDir, (err) => {
            if (!err) {
                currDir = checkDir;
                process.stdout.write(`You are currently in ${currDir}\n`);
            }
            else if (err.code === 'ENOENT') {
                process.stdout.write(`${INVALID}: there is no such directory\n`);
            }
        });
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
            
    
        }
        process.stdout.write(`You are currently in ${currDir}\n`);
    }
    
    
});

process.on("SIGINT", () => {
    farewell();
});



console.log(`Welcome to the File Manager, ${username}!`);
console.log(`You are currently in ${currDir}`);