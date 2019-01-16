'use strict'

const path = require('path');
const RModule = require('./RModule.js');

module.exports = (dataset, date, volume) => {
    const outputs = [];
    return new Promise((resolve, reject) => {
        const rmodule = new RModule(path.join(__dirname, 'main.r'), [dataset, date, volume]);
        rmodule.on('stdout', (line) => {
            console.log('STDOUT', line);
            outputs.push(line);
        });
        rmodule.on('stderr', (line) => {
            console.log('STDERR', line);
        })
        rmodule.on('exit', () => {
            resolve(outputs);
        });
    });
}

(async () => {
    await module.exports(path.join(__dirname, 'data', 'CVX.csv'), '2019-2-23', '123');
})();