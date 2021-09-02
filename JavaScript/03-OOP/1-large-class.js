'use strict';

const http = require('http');
const fs = require('fs');

// Antipattern: Large Class or God Object

class Controller {
  constructor() {
    this.cache = {};
    this.server = http.createServer((req, res) => {
      this.handler(req, res);
    });
  }

  parseCookies(cookie) {
    const cookies = {};
    if (cookie) cookie.split(';').forEach((item) => {
      const parts = item.split('=');
      cookies[(parts[0]).trim()] = (parts[1] || '').trim();
    });
    return cookies;
  }

  log(line) {
    const date = new Date().toISOString();
    console.log(date + ' ' + line);
  }

  serveFromCache(req, res) {
    if (this.cache[req.url] && req.method === 'GET') {
      res.writeHead(200);
      res.end(this.cache[req.url]);
      return true;
    }
    return false;
  }

  getRoot(req, res, cookies) {
    res.writeHead(200, {
      'Set-Cookie': 'mycookie=test',
      'Content-Type': 'text/html'
    });
    const ip = req.connection.remoteAddress;
    res.write(`<h1>Welcome</h1>Your IP: ${ip}`);
    res.end(`<pre>${JSON.stringify(cookies)}</pre>`);
  }

  getPerson(req, res) {
    fs.readFile('./person.json', (err, data) => {
      if (!err) {
        const obj = JSON.parse(data);
        obj.birth = new Date(obj.birth);
        const difference = new Date() - obj.birth;
        obj.age = Math.floor(difference / 31536000000);
        delete obj.birth;
        const sobj = JSON.stringify(obj);
        this.cache[req.url] = sobj;
        // HTTP reply
        res.writeHead(200);
        res.end(sobj);
      } else {
        res.writeHead(500);
        res.end('Read error');
      }
    });
  }

  postPerson(req, res) {
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      let data = Buffer.concat(body).toString();
      const obj = JSON.parse(data);
      if (obj.name) obj.name = obj.name.trim();
      data = JSON.stringify(obj);
      this.cache[req.url] = data;
      fs.writeFile('./person.json', data, (err) => {
        if (!err) {
          res.writeHead(200);
          res.end('File saved');
        } else {
          res.writeHead(500);
          res.end('Write error');
        }
      });
    });
  }

  routing(req, res, cookies) {
    console.log(req.method, req.url);
    if (req.url === '/') {
      if (req.method === 'GET') {
        this.getRoot(req, res, cookies);
      }
      return;
    } else if (req.url === '/person') {
      if (req.method === 'GET') {
        this.getPerson(req, res);
      } else if (req.method === 'POST') {
        this.postPerson(req, res);
      }
      return;
    }
    res.writeHead(404);
    res.end('Path not found');
  }

  handler(req, res) {
    const cookies = this.parseCookies(req.headers.cookie);
    this.log(`${req.method} ${req.url}`);
    if (!this.serveFromCache(req, res)) {
      this.routing(req, res, cookies);
    }
  }

  listen(port) {
    this.server.listen(port);
  }
}

// Usage

const controller = new Controller();
controller.listen(8000);
