
import os from 'os';
import path from 'path'

const userHomeDir = os.homedir();
let currDir = userHomeDir;

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
    switch (String(data).trim()) {
        case '.exit':
            farewell();
            break;
        case 'up':
            if (path.parse(currDir).root !== currDir) {
                currDir = path.join(currDir, '..');
            };
            break;

    }

    console.log(`You are currently in ${currDir}`);
    process.stdout.write(data)
});

process.on("SIGINT", () => {
    farewell();
});



console.log(`Welcome to the File Manager, ${username}!`);
console.log(`You are currently in ${currDir}`);