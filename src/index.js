
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    if (String(data).trim() === '.exit') {
        farewell();
    }
    console.log(`You are currently in ${__dirname}`);
    data = data.toString().toUpperCase()
    process.stdout.write(data)
});

process.on("SIGINT", () => {
    farewell();
});



console.log(`Welcome to the File Manager, ${username}!`);
console.log(`You are currently in ${__dirname}`);