
export let username;
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