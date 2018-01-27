const http = require('http');
const fs = require('fs');
const qs = require('querystring');

//new module part of node
const path = require('path')
//ES6 way of bringing in methods from module export default index.js
const { getHandler, postHandler} = require('./handlers')


const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {

  //switch between different
  switch (req.method) {
    case 'GET':
      getRequestHandler(url, res);
      break;

    case 'POST':
      postHandler(url,res, body);
      break;

    default:
      res.writeHead(405, 'Method not allowed')
      response.end();
      break;
  }
}) //end server


//   .. takes you up a directory








function getRequestHandler(url, res) {
  let uri = req.url;
  
  fs.readFile('./public' + uri, {encoding: 'utf8'}, (err, data) => {
    if (err) {
      

      res.writeHead(200, 'OK');
      res.write(data)
      return res.end();
    }
  });

} //end getRequestHandler

server.listen(PORT, () => {
  console.log(`server listening to port: ${PORT}`)
});

function setSuccessHeader(res) {
  res.setHeader('Content-Type', 'text/html');
};

function setFailureHeader(res) {
  //res.setHeader('Content-Type', 'text/html');
  res.writeHead('404', 'Not Found');
};

