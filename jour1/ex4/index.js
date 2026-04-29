const http = require('http');
const myMiddleware = require('./custom-middleware');


const server = http.createServer((req,res) => {
    myMiddleware(req, res, () => {
        res.writeHead(200, "Success");
        res.end('request done.')
    })
});

server.listen(3000, () => {
    console.log('le serveur est en ecoute sur le port http://localhost:3000/');
});