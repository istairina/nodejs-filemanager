
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

process.stdin.on("data", data => {
    data = data.toString().toUpperCase()
    process.stdout.write(data + "\n")
});

process.on("SIGINT", () => {
    process.stdout.write(`Thank you for using File Manager, ${username}, goodbye!\n`);
    process.exit();
});



console.log(`Welcome to the File Manager, ${username}!`);