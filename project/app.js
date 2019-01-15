'use strict'

const config = require('./config.json');
const path = require('path');
const bodyparser = require('koa-bodyparser');
const Koa = require('koa');
const KoaRouter = require('adv-koa-router');
const afs = require('alex-async-fs');

const app = new Koa();
app.use(bodyparser({ jsonLimit: '64mb' }));
const globalRouter = new KoaRouter(app, []);

globalRouter.addStaticHandlers('/', path.join(__dirname, 'api'));
globalRouter.addDynamicDir('GET', '/', path.join(__dirname, 'md-da-2018', 'dist'), 'index.html');

app.listen(config.server.port, () => {
    console.log('Server is listening on port', config.server.port);
})
