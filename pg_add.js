var sys = require('util');
var http = require('http');
var count = 0;
 var server = http.createServer(
    function (request, response) {
	if(request.url != '/favicon.ico') {
        response.writeHead(200, {'Content-Type': 'text/plain'});
	count ++;
        var ret = test_pg(count);
        response.write('add hui_'+count);
        // response.write(ret);
        response.end();
	}
    }
).listen(3999);
sys.log('Server running at http://localhost:3999/');

function test_pg(count) {
var { Client } = require('pg');
var client = new Client({
    user: 'miwa',
    host: 'mydb.cahifoloxnkp.us-east-2.rds.amazonaws.com',
    database: 'mydb',
    password: 'abcd0123',
    port: 5432
})
client.connect();

const query = {
    text: 'INSERT INTO users(name) VALUES($1)',
    values: ['hui_'+count],
}

client.query(query, (err, res) => {
    if (err) {
        console.log(err.stack)
    } else {
	console.log('add successfully.');
    }
});
}
