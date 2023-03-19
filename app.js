// getting-started.js

const express = require("express");
const path = require("path");
const app = express();
const port = 80;
const mongoose = require('mongoose');
const bodyparser = require("body-parser")
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
  
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const contactSchema = new mongoose.Schema({
    name : String,
    phone : String,
    email : String,
    address : String,
    gender : String
  });

const contact = mongoose.model('contact',contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})


app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res)=>{
    var myData = new contact(req.body);
    myData.save().then( () =>{
        res.send("This item has been saved to the database ")
    }).catch( () =>{
        res.status(404).send("Item was not save to the database")
    });


    // res.status(200).render('contact.pug');
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});