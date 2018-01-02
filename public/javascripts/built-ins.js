var os = require('os'); // variable os is a module that has some information about the operating system

var toMb = function (f) {
    return (Math.round((f / 1024 / 1024) * 100) / 100);
};

console.log('Host: ' + os.hostname());
console.log('Load average: ' + os.loadavg()[2]);
console.log(toMb(os.freemem()) + ' of ' + toMb(os.totalmem()) + ' Mb free');