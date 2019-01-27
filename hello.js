var sys = require('util');
var http = require('http');
var server = http.createServer(
    function (request, response) {
        sys.log('New request coming...');
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.write('Hello World!!');
        response.end();
    }
).listen(3999);
sys.log('Server running at http://localhost:3999/');
