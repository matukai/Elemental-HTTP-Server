const http = require('http');
const fs = require('fs');
const querystring = require('querystring');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  // console.log('request method:' + req.method);
  // console.log('request uri:' + req.url);
  // console.log('request http version:' + req.httpVersion);

  //switch between different methods
  switch (req.method) {
    case 'GET':
      getRequestHandler(req, res);
      break;

    case 'POST':
      postHandler(req, res)
      break;

    default:
      response.end();
      break;
  }


}) //end server


function getRequestHandler(req, res) {
  let uri = req.url;

  fs.readFile('./public' + uri, {encoding: 'utf8'}, (err, data) => {
    if (err) {
      fs.readFile('./public/404.html', {encoding: 'utf8'}, (err, data) => {
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

// gets called when post
function postHandler (req, res) {
  let name;
  let symbol;
  let atmoicNumber;
  let description;

  req.on('data', function (data) {
    createElement(data, res);

  })// end on data

}// end postHandler


function createElement (data, res) {
  let parseRequest = querystring.parse(data.toString());
  let elementIndex =   `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>The Elements - ${parseRequest.elementName}</title>
    <link rel="stylesheet" href="/css/styles.css">
  </head>
  <body>
    <h1>${parseRequest.elementName}</h1>
    <h2>${parseRequest.elementSymbol}</h2>
    <h3>Atmoic number ${parseRequest.elementAtmoicNumber}</h3>
    <p>${parseRequest.elementDescription}</p>
    <p><a href="/">back</a></p>
  </body>
  </html>`

  fs.writeFile('./public/' + parseRequest.elementName + '.html', elementIndex, (err) => {
    if (err) throw err;

    setPostHeader(res);
    res.write(JSON.stringify({'success' : true}));
    return res.end();

  })// end writeFile


}// end createElement


server.listen(PORT, () => {
  console.log(`server listening to port: ${PORT}`)
});

function setSuccessHeader(res) {
  res.setHeader('Content-Type', 'text/html');
  res.writeHead('200', 'OK');
};

function setFailureHeader(res) {
  res.setHeader('Content-Type', 'text/html');
  res.writeHead('404', 'Not Found');
};

function setPostHeader(res){
  res.setHeader('Content-Type', 'application/json');
  res.writeHead('200', 'OK');
}

