var buf = new Buffer(100);
buf[10] = -100;
buf[21] = 300;
buf[22] = 3.1415;
console.log(buf[10]);
console.log(buf[21]);
console.log(buf[22]);