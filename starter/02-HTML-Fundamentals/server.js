const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // Determine the file path based on the request URL
  const filePath = path.join(
    __dirname,
    req.url === '/' ? 'index.html' : req.url
  );

  // Determine the content type based on the file extension
  const extname = path.extname(filePath);
  let contentType = 'text/html';
  switch (extname) {
    case '.jpg':
    case '.jpeg':
      contentType = 'image/jpeg';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.js':
      contentType = 'application/javascript';
      break;
  }

  // Read and serve the file
  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // File not found
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404: File Not Found');
      } else {
        // Other server error
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500: Internal Server Error');
      }
    } else {
      // Serve the file with the correct content type
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
});

server.listen(3001, () => {
  console.log('Server running at http://localhost:3001');
});
