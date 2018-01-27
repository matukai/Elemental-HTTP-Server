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

function postHandler (req, res) {
  let name;
  let symbol;
  let atmoicNumber;
  let description;

  req.on('data', function (data) {
    // let request = data.toString();
    // console.log(request)
    let parseRequest = querystring.parse(data.toString());
    console.log(parseRequest);



    name = parseRequest.elementName;
    console.log('element name: ' + name)
    symbol = parseRequest.elementSymbol;
    atomicNumber = parseRequest.elementAtmoicNumber;
    description = parseRequest.elementDescription;


    fs.writeFile('./public/' + name + '.html', 'TESTBODY', (err) => {
      if (err) throw err;
      console.log('This file has been saved')

      


    })// end writeFile

  })// end on data

}// end postHandler

function generalIndexGenerator(name, symbol, atmoicNumber, description) {
  


}












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

