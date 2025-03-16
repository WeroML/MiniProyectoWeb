const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, req.url === '/' ? 'colocarNombre.html' : req.url);

    //Obtiene la extensión del archivo
    const extname = path.extname(filePath);
    
    //Define el tipo de contenido (MIME Type)
    const contentType = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'application/javascript',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.woff': 'font/woff',
        '.woff2': 'font/woff2',
    }[extname] || 'application/octet-stream';

    //Verifica si el archivo existe
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if(err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
            return;
        }

        //Lee y envía el archivo con el MIME Type correcto
        fs.readFile(filePath, (err, content) => {
            if(err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('500 Internal Server Error');
                return;
            }

            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        });
    });
});

server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}/`);
});
