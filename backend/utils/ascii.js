const figlet = require('figlet');

function printAsciiWelcome() {
    figlet('DevExcuse API', (err, data) => {
        if (!err) console.log(data);
        console.log('🚀 Server is running...\n');
    });
}

module.exports = { printAsciiWelcome };
