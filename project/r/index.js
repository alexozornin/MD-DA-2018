'use strict'

const path = require('path');
const RModule = require('./RModule.js');

const modules = {
    date: 'date.r',
    volume: 'volume.r'
}

module.exports = (dataset, value) => {
    return new Promise((resolve, reject) => {
        const rmodule = new RModule(path.join(__dirname, 'date.r'), [dataset, value]);
        rmodule.on('stdout', (line) => {
            console.log('STDOUT', line);
            let res = line.replace(/\[\d\]\s+?/g, '');
            if(res[1] == '!') {
                resolve(JSON.stringify({
                    success: false,
                    msg: "Ошибка"
                }));
            }
            else {
                resolve(JSON.stringify({
                    success: true,
                    msg: 'Прогнозируемое значение: $' + res
                }));
            }
        });
        rmodule.on('stderr', (line) => {
            //console.log('STDERR', line);
        })
        rmodule.on('exit', () => {
            resolve(JSON.stringify({
                success: false,
                msg: "Ошибка"
            }));
        });
        setTimeout(() => {
            reject('Timeout');
        }, 60000);
    });
}
