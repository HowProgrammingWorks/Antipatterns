'use strict';

// Antipattern 1
{
  const name = 'Marcus Aurelius';
  const result = name.padStart(17);
  console.log(result);
}

// Solution 1
{
  const NAME_LENGTH = 17;
  const name = 'Marcus Aurelius';
  const result = name.padStart(NAME_LENGTH);
  console.log(result);
}

// Solution 2
{
  const PAD_LENGTH = 2;
  const name = 'Marcus Aurelius';
  const result = name.padStart(name.length + PAD_LENGTH);
  console.log(result);
}

// Solution 3
{
  const config = require('./config.js');
  const name = 'Marcus Aurelius';
  const result = name.padStart(config.name.lenght);
  console.log(result);
}
