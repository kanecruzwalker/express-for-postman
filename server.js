const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require('cors');
const app = express();
const knex = require('knex');
const register = require('./controllers/Register');
const Signin = require("./controllers/Signin");
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'stone',
      password : '',
      database : 'face-recognition'
    }
  });

db.select('*').from('users').then(data => {
  console.log(data);
});

app.use(bodyParser.json());
app.use(cors())

app.get('/', (req,res) => {
    res.send(database.users);
})

app.post('/signin', Signin.handleSignin(db, bcrypt))

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})

app.put('/image', (req,res) => {image.handleImage(req, res, db)})

app.post('/imageurl', (req,res) => {image.handleApiCall(req, res)})







app.listen(3000, ()=> {
    console.log("Server listening on PORT 3000");
})