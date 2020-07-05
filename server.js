const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require('cors');
const app = express();
const knex = require('knex')

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

const database = {
    users: [
        {
            id:'123',
            name: 'Mr',
            email: 'mr@email.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id:'456',
            name: 'Ms',
            email: 'ms@email.com',
            password: 'cakes',
            entries: 0,
            joined: new Date()
        }
    ],
    login : [
        {
            id: '123',
            hash: '',
            email: 'mr@email.com',
        }

    ]
}


app.get('/', (req,res) => {
    res.send(database.users);
})

app.post('/signin', (req,res) => {

    // bcrypt.compare("bacon", hash, function(err, res) {
    //      res == true
    // });
    // bcrypt.compare("veggies", hash, function(err, res) {
    //      res = false
    // });

    if (req.body.email === database.users[0].email && 
        req.body.password === database.users[0].password){
            res.json(database.users[0]);
        }else{
            res.status(400).json("error logging in");
        }
})

app.post('/register', (req,res) => {
    const { email, name, password } = req.body

    db('users')
    .returning('*')
    .insert({
        email: email,
        name: name,
        joined: new Date()
    }).then(user => {
        res.json(user[0]);
    }).catch(err => res.status(400).json('unable to register'))
    
    
    // bcrypt.hash(password, null, null, function(err, hash) {
    //     console.log(hash);
    // });
})

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