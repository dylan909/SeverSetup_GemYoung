const http = require('http');

http.createServer(function (req, res){

res.write("Fuck you ethan!!!");
res.end();

}
).listen(3000);

console.log('server started on port 3000!!!!');
