var express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const responseTime = require('response-time')
const routes = require('./routes')
const app = express()

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
};

//create a cors middleware
app.use(function(req, res, next) {
  //set headers to allow cross origin request.
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cors(corsOptions))
app.options('*', cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(responseTime())

app.use('/', routes)

app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// Start the server...
const server = app.listen(process.env.PORT || 5000, () => {
  console.log(`Listening on port ${server.address().port}`)
})

module.exports = server
