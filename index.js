const express = require('express')
const db = require('./db');

const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json());



app.get('/', function (req, res) {
  res.send('Welcome to the Hotel')
})


const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes')

app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);
app.listen(3000, () =>{
    console.log("Server is running on port 3000")
})