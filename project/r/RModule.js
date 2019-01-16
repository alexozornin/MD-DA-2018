'use strict'

const EventEmitter = require('events');
const child = require('child_process');
const readline = require('readline');

class RModule extends EventEmitter {
    constructor(filePath, args) {
        super();
        this.filePath = filePath;
        this.args = args;
        this.worker = null;
        this.init();
    }

    init() {
        this.worker = child.spawn("Rscript", [this.filePath, ...this.args]);
        this.worker.stdout.setEncoding('utf8');
        this.worker.stderr.setEncoding('utf8');
        this.worker.once('error', (err) =>
        {
            this.emit('error', err);
            this.exit();
        });
        this.worker.once('exit', (code, signal) =>
        {
            this.emit('exit', { code: code, signal: signal });
        });
        this.rlStdout = readline.createInterface({
            input: this.worker.stdout
        });
        this.rlStderr = readline.createInterface({
            input: this.worker.stderr
        });
        this.rlStdout.on('line', (line) =>
        {
            this.emit('stdout', line);
        })
        this.rlStderr.on('line', (line) =>
        {
            this.emit('stderr', line);
        })
    }

    write(str)
    {
        this.worker.stdin.write(str);
    }

    exit()
    {
        this.worker.removeAllListeners('error');
        this.worker.removeAllListeners('exit');
        this.worker.kill('SIGTERM');
    }
}

module.exports = RModule