import http from 'http';

const PORT = process.env.PORT || 8080;

http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1>Hello World!</h1>');
        res.write('<form action="/about" method="get"><button type="submit">About</button></form>');
        res.write('<form action="/" method="get"><button type="submit">Home</button></form>');
        res.end();
    } else if (req.url === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1>About Page</h1>');
        res.write('<form action="/" method="get"><button type="submit">Home</button></form>');
        res.end();
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write('<h1>404 Not Found</h1>');
        res.end();
    }
}).listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
