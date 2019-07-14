'use strict';

// Antipattern: Spaghetti code
// - JMP, GOTO
// - Callbacks
// - Events

// Events
// Try to dibig this code to find logical error
{
  const { EventEmitter } = require('events');

  const incoming = new EventEmitter();
  const controller = new EventEmitter();
  const processing = new EventEmitter();

  const parameters = [];

  incoming.on('return', result => {
    console.dir({ result });
  });

  processing.on('max', (a, b) => {
    incoming.emit('return', Math.max(a, b));
  });

  controller.on('parameter', value => {
    parameters.push(value);
  });

  incoming.on('input', data => {
    if (typeof data === 'string') {
      controller.emit('call', data);
    } else {
      controller.emit('parametre', data);
    }
  });

  controller.on('call', name => {
    processing.emit(name, ...parameters);
  });

  incoming.emit('input', 10);
  incoming.emit('input', 20);
  incoming.emit('input', 'max');
}
