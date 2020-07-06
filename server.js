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

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; 

const db = knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl: true,
    }
  });

db.select('*').from('users').then(data => {
  console.log(data);
});

app.use(bodyParser.json());
app.use(cors())

app.get('/', (req,res) => {res.send(`it is working`)})

app.post('/signin', Signin.handleSignin(db, bcrypt))

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})

app.put('/image', (req,res) => {image.handleImage(req, res, db)})

app.post('/imageurl', (req,res) => {image.handleApiCall(req, res)})


app.listen(process.env.PORT || 3000, ()=> {
    console.log(`Server listening on ${process.env.PORT}`);
})