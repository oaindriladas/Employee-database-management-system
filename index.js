const express = require('express');
const mongoose = require('mongoose');
const app = express();
const addteacher = require('./addTeacher');

app.use(express.json());

const username = "oaindrila";
const password = "Oana@1988";
const cluster = "university";
const dbname = "teachers";

mongoose.connect(
  'mongodb://127.0.0.1:27017/college',
  // `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`, 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error: "));
db.once("open", function()
{
    console.log("Connected successfully");
})

app.use(addteacher);

app.get('/',(request, response) => {
  response.sendFile(path.join(__dirname+'/index.html'));
  //response.sendFile('C:\Users\oaindrila.das\OneDrive - Times Group\Documents\Development\nodeprojects\AtlasTest'+'/index.html');
  })
  
app.get('/views/addEmp.html',(request, response) => {
  response.sendFile(path.join(__dirname+'/views/addEmp.html'));
})  //redirects the page

app.get('/views/updateEmp.html',(request, response) => {
  response.sendFile(path.join(__dirname+'/views/updateEmp.html'));
})

app.get('/views/delEmp.html',(request, response) => {
  response.sendFile(path.join(__dirname+'/views/delEmp.html'));
})
app.listen(5000,() =>
{
    console.log("port running 5000");
})