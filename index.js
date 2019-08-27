// Import packages
const express = require('express')
const morgan = require('morgan')
const m = require('./helpers/middlewares')
const uuid = require('uuid');
const _ = require('lodash');
// App
const app = express()
const expressJwt = require('express-jwt');
const api = require('./route.js');
const fs = require('fs')
// Morgan
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



const filename = './data/dev.json';
const devFile = require('./data/dev.json');
const helper = require('./helpers/helper.js')
const PORT = process.env.PORT || 1337

// First route
app.get('/', (req, res) => {
    res.json({ message: 'Hello world' })
})

app.post('/register',m.checkFieldsRegister, async (req, res) => {
  console.log('************* register ****************');
  let uid = uuid.v1();
  console.log('------:',uid);
  let dev = {
    "id":uid,
    "name":req.body.name,
  	"password":req.body.password,
  	"contactNo":req.body.contactNo,
  	"city":req.body.city,
  	"pinNo":req.body.pinNo
  }
  // console.log(dev);
  let array = fs.existsSync(filename) ? JSON.parse(fs.readFileSync(filename, 'utf8')) : [];
  let exist = _.findIndex(array,function(data){
    return data.name == dev.name
  });
  console.log('exist: ',exist);
  if(exist < 0){
    array.push(dev);
    helper.writeJSONFile(filename, array);
    const token = await helper.signToken({"id":dev.id});
    res.status(200).send({
      "token": token,
    });
  } else {
    res.json({
      "message": "Dev already exists.",
    });
  }


})
app.use('/auth', expressJwt({
  secret: 'test123',
}),async function(req, res, next) {
  let row = await helper.approveDev(devFile,req.user.id);
  if(row) next();
  else res.status(401).send('invalid token...');

});
app.use('/auth', api);

app.use(function (err, req, res, next) {
 if (err.name === 'UnauthorizedError') {
   res.status(401).send('invalid token...');
 }
});


// Starting server
const server = app.listen(PORT, () =>
  console.log(`Server listening on port ${PORT}`)
)
