const myhttps = require('http');
const myfs = require('fs');
const querystring = require('querystring');

const hostname = '127.0.0.1';
const port = 5000;

const mimeTypes = {
    '.html': 'text/html',
    '.jgp': 'image/jpeg',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.ico': 'image/x-icon',
    '.json': 'application/json',
}

const server = myhttps.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        myfs.readFile('./views/index.html', 'utf8', (err, pagdata) => {
            if (err) {
                throw err;
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(pagdata);
        })
    }
    if (req.method === 'GET' && req.url === '/script1') {
        myfs.readFile('./assets/scrip1.js', 'utf8', (err, pagdata) => {
            if (err) {
                throw err;
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/javascript');
            res.end(pagdata);
        })
    }
    if (req.method === 'GET' && req.url === '/csshome') {
        myfs.readFile('./assets/home.css', 'utf8', (err, pagdata) => {
            if (err) {
                throw err;
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/css');
            res.end(pagdata);
        })
    }
    if (req.method === 'GET' && req.url === '/favicon') {
        myfs.readFile('./assets/zeraki.png',  (err, pagdata) => {
            if (err) {
                throw err;
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'image/png');
            res.end(pagdata);
        })
    }

})


server.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port};`);
})




/**
 *
 * https://www.project.komplab.com/zeraki/data/
 *
*/
