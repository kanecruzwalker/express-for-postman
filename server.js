const express = require("express");
const app = express();

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
    ]
}


app.get('/', (req,res) => {
    res.send("Root Page Works");
})

app.post('/signin', (req,res) => {
    res.send("signin");
})

app.listen(3000, ()=> {
    console.log("Server listening on PORT 3000");
})