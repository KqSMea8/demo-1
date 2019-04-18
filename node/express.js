const express = require('express');
const kraken = require('kraken-js');

const app = express();
app.use(kraken());
app.listen(3000);
