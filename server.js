const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials/');
app.set('view engine','hbs');


app.use((req,res,next)=>{
  var now = new Date().toString();
  console.log(`${now}: ${req.method} ${req.url}`);
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log',log + '\n',(err) =>{
    if(err){
      console.log('unable to append to server.log');
    }
  });
  next();
});

// app.use((req,res,next)=>{
//   res.render('maintenance.hbs', {
//     pageTitle:'Maintenance Page',
//     welcome:"Page under Construction will be right Back"
//   });
// });

app.use(express.static(__dirname + "/public"));

hbs.registerHelper('getCurrentYear',() =>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text) =>{
  return text.toUpperCase();
});

app.get('/',(req, res) => {
  res.render('home.hbs', {
    pageTitle:'Main Home Page',
    welcome:"Welcome to the Home Page"
  });
});

app.get('/about', (req,res) => {
  res.render('about.hbs', {
    pageTitle:'Cool About Page',
  });
});

app.get('/bad', (req,res) => {
  res.send({
    errorMessage: "Request not Available !",
  });
});

app.listen(3000, () => {
  console.log('server is up on port 3000');
});
