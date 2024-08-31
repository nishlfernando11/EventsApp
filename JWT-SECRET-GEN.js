// const crypto = require('crypto');
// const secret = crypto.randomBytes(64).toString('hex');
// console.log(secret);

// get base 64 encoded key
const crypto = require('crypto');
const secret = crypto.randomBytes(64).toString('hex');
const base64Secret = Buffer.from(secret).toString('base64');
console.log(base64Secret);

// BASE 64 ENCODING ON TERMINAL
// echo -n 'value' | base64 