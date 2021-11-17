const express = require('express');
const serverStatic = require('serve-static');
const path = require('path');

const app = express();

//here we are configuring dist to serve app files
app.use('/', serverStatic(path.join(__dirname, 'dist')));

// this * route is to serve project on different page routes except root `/`
app.get(/.*/, function (req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port);
console.log(`El servidor se está ejecutando en el puerto ${port}`);