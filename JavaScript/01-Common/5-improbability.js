'use strict';

const fs = require('fs');

// Antipattern: Improbability
// Assumption: file always exists
{
  fs.readFile('./filename.ext', 'utf8', (err, data) => {
    const found = data.includes('substring');
    console.dir({ found });
  });
}

// Antipattern: Improbability
// Assumption: json format, field `port` exists and type is `number`
{
  fs.readFile('./config.js', 'utf8', (err, data) => {
    const config = JSON.parse(data);
    const { port } = config;
    console.dir({ port });
  });
}
