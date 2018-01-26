const http = require('http');
const fs = require('fs');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  console.log('request method:' + req.method);
  console.log('request uri:' + req.url);
  console.log('request http version:' + req.httpVersion);


  //switch between different
  switch (req.method) {
    case 'GET':
      getRequestHandler(req, res);
      break;

    case 'POST':
      break;

    default:
      response.end();
      break;
  }


}) //end server

function getRequestHandler(req, res) {
  let uri = req.url;

  fs.readFile('./public' + uri, {encoding: 'utf8'}, (err, data) => {
    console.log(data)
    console.log(err)
    if (err) {
      fs.readFile('./public/404.html', {
        encoding: 'utf8'
      }, (err, data) => {
        if (err) {
          res.write('500 server error file not found');
          return res.end();
        }
        setFailureHeader(res);
        res.write(data.toString());
        return res.end();
      })
    }else{
      setSuccessHeader(res);
      res.write(data.toString());
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