'use strict'

module.exports = async (ctx) => {
    console.log(ctx.request.body);
    ctx.body = "OK";
    return;
}
