const sys = require('util');
const http = require('http');

const hostname = '0.0.0.0';
const port = 3000;
var count = 0;
const server = http.createServer((req, res) => {
  if(req.url == '/favicon.ico') {
    return;
  }
  sys.log('New request...');
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  myPromise(count ++)
  .then(function(data) {
    res.write('count: ' + count);
    res.write("\n");
    res.write('data size: ' + data.length + "\n");
    for (var i = 0; i < data.length; i++) {
      res.write(data[i].id + ' : ' + data[i].name + "\n");
    }
    res.end();
  });
  console.log('I can do a lot of things here...');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function myPromise(count) {
  return new Promise(function (resolve) {
  var { Client } = require('pg');
  var client = new Client({
    user: 'miwa',
    host: 'mydb.cahifoloxnkp.us-east-2.rds.amazonaws.com',
    database: 'mydb',
    password: 'abcd0123',
    port: 5432
  });
  client.connect();
  console.log('after connection...');
  const query = {
    text: 'select * from users',
  }

  setTimeout(() => {
  client.query(query, (err, res) => {
    if (err) {
      console.log(err.stack)
    } else {
      console.log('in query, count: ' + count)
      console.log(res.rows)
      resolve(res.rows);
    }
  });
}, 5000);
 });
};
