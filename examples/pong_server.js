/**
 * Copyright (c) 2016 Wind River Systems
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

var tcf = require('../src/tcf.js');

var protocol = new tcf.Protocol();

protocol.addCommandHandler('Pong','echo', function (c, msg) {
    if (!msg) throw {msg:'Invalid argument'};
    /* randomly fail to send the ball back */
    console.log ("received Pong");

    if (Math.random() < 0.25) {
        return ([{msg:'missed the ball'}]);
    }
    setTimeout(returnPing.bind(this, c), 0);
    return ([0,msg]);
});

var returnPing = function (client) {
    console.log ("send Ping");
    client.sendCommand('Ping', 'echo', ['test']).
    then(function (res) {
        console.log('Ping Reply ', res);
    })
    .catch(function (err){
        /* score the point */
        console.log(err);
    });
};

/* test service ping */

var server = new tcf.Server('WS::20001', protocol);

