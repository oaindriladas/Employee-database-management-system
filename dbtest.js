var sql = require('mssql');
var express = require('express');
var app = express();

var config ={
    user: 'sa',
    password: 'Password@123',
    server: 'TLMUGGCORPL0237\\SQL_EXPRESS_2022',
    database: 'University',
    options: {
        encrypt: false,
        useUTC: true,
      }
}
sql.connect(config, function(err)
{
    if(!err)
    console.log("Connection successful");
    else
    console.log(err)
})

app.listen(5050, function()
{
    console.log('Server is running');
})

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

app.get('/students',(request, response)=>
{
    var req= new sql.Request();
        req.query('select * from teacher', function(recordset, err)
        {
            if(err) console.log(err);
            else
            response.send(recordset);
        });
})

app.get('/students/:id',(request, response)=>
{
    var req= new sql.Request();
        req.query('select * from student where student_id= '+ 
        [request.params.id], function(recordset, err)
        {
            if(err) console.log(err);
            else
            response.send(recordset);
        });
})

app.get('/insert',(request, response)=>{
    var req= new sql.Request();
    req.query("insert into student values (17, 'Shiva', 8.5)", function(recordset, err)
    {
        if(err) console.log(err);
        else
        response.send("data is inserted");
    });
})

app.get('/update',(request, response)=>
{
    var req = new sql.Request();
    req.query(
        'update student set grade=9.0 WHERE student_id=17', 
        (recordset, err) =>{
        if(err) console.log(err)
        else response.send("Updated!");
    })

})

app.get('/delete/:id',(request, response)=>
{
    var req = new sql.Request();
    req.query(
        'delete from student WHERE student_id='+[request.params.id], 
        (recordset, err) =>{
        if(err) console.log(err)
        else response.send("Record deleted!");
    })

})
