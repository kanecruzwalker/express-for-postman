const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require('cors');
const app = express();
const knex = require('knex');
const register = require('./controllers/Register');
const signin = require('./controllers/Signin');
const Signin = require("./controllers/Signin");

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

app.post('/signin', (req, res) => {Signin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req,res) => {
    const { id } = req.params;

    db.select('*').from('users').where({
        id: id
    })
    .then(user => {
        if (user.length){
            res.json(user[0]);
        }else{
            res.status(400).json('Not Found')
        }
    })
    .catch(err => res.status(400).json('error getting user'));

})

app.put('/image', (req,res) =>{
    const { id } = req.body;

    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get count'))
})









app.listen(3000, ()=> {
    console.log("Server listening on PORT 3000");
})