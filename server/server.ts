"use strict";

var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');

const app = express();

const PORT = process.env.PORT || 5000;

// app.use(express.json());
//
// app.get('/', (req, res) => {
//   res.send('Hello World')
// })

const rootPath = path.dirname(__dirname);

app.use(serveStatic(path.join(rootPath, '/dist')));

// app.use('/public', express.static(path.join(__dirname, 'public')))

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
})
