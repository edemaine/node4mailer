'use strict';

const Transform = require('stream').Transform;

class LastNewline extends Transform {
    constructor() {
        super();
        this.lastByte = false;
    }

    _transform(chunk, encoding, done) {
        if (chunk.length) {
            this.lastByte = chunk[chunk.length - 1];
        }

        this.push(chunk);
        done();
    }

    _flush(done) {
        if (this.lastByte === 0x0A) {
            return done();
        }
        if (this.lastByte === 0x0D) {
            this.push(new Buffer('\n'));
            return done();
        }
        this.push(new Buffer('\r\n'));
        return done();
    }
}

module.exports = LastNewline;
