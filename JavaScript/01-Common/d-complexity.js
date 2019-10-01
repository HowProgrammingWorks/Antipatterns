'use strict';

// Antipattern: Accidental complexity

class Application {
  static async main() {
    console.log('Hello world');
  }
}

Application.main();

// Best practice of middleware boilerplate

router.get('/user/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const query = 'SELECT * FROM users WHERE id = $1';
  pool.query(query, [id], (err, data) => {
    if (err) throw err;
    res.status(200).json(data.rows);
  });
});

// AWS boilerplate

exports.handler = (event, context, callback) => {
  const { Client } = require('pg');
  const client = new Client();
  client.connect();
  const id = parseInt(event.pathParameters.id);
  const query = 'SELECT * FROM users WHERE id = $1';
  client.query(query, [id], (err, data) => {
    callback(err, {
      statusCode: 200,
      body: JSON.stringify(data.rows),
    });
  });
};

// The essence

async id => await application.database
  .select('users')
  .where({ id });
