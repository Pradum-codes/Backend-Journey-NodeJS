import http from 'http'
import fs from 'fs';

http.createServer((req,res) => {

    let path
    if(req.url === '/') {
        path = 'index.html';
    } else if(req.url === '/about') {
        path = 'about.html';
    } else if(req.url === '/contact') {
        path = 'contact.html';
    } else {
        path = '404.html';
    }

    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.write('404 Not Found');
            return res.end();
        }
        res.write(data);
    });
}).listen(8080);
