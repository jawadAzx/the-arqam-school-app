const firebase = require('./db');
const firestore = firebase.firestore();
// read 23100321 file in directory
var fs = require("fs");

let file = fs.readFileSync("./23100321.pdf");
console.log(file)