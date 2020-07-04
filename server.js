const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const app = express();

app.use(bodyParser.json());

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
    if (req.body.email === database.users[0].email && 
        req.body.password === database.users[0].password){
            res.json("success");
        }else{
            res.status(400).json("error logging in");
        }
})

app.post('/register', (req,res) => {
    const { email, name, password } = req.body

    bcrypt.hash(password, null, null, function(err, hash) {
        console.log(hash);
    });
    
    database.users.push({
        id:'789',
        name: name,
        email: email,
        password: password,
        joined: new Date()
    })

    res.json(database.users[database.users.length-1]);
    
})

app.get('/profile/:id', (req,res) => {
    const { id } = req.params;
    let found = false;

    database.users.forEach(user => {
        if (user.id === id) {
             res.json(user);
        }
    })
    if (!found) {
        res.status(400).json('not found');
    }
})

app.put('/image', (req,res) =>{
    const { id } = req.body;
    let found = false;

    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++
            return res.json(user.entries);
        }
    })
    if (!found) {
        res.status(400).json('not found');
    }
})




// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });




app.listen(3000, ()=> {
    console.log("Server listening on PORT 3000");
})