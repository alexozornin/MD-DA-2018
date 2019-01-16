'use strict'

const path = require('path');
const dateAnalysis = require('../../../r/index.js');

module.exports = async (ctx) => {
    if(ctx.request.body.value) {
        ctx.body = await dateAnalysis(path.join(__dirname, '..', '..', '..', 'r', 'data', 'XOM.csv'), ctx.request.body.value);
    }
    else {
        ctx.body = JSON.stringify({
            success: false,
            msg: 'Ошибка входных данных'
        })
    }
    return;
}
