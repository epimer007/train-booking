const express = require('express');
const app = express();
const mysql = require('mysql');

const con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root1",
    database:"train"
});

app.use(express.json());

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });




//User registration endpoint
app.post('/register',(req,res)=>{
    let uname = req.body.uname;
    let pass = req.body.pass;
    console.log(uname,pass);

    var q = "INSERT INTO user (username, pass) VALUES (?,?)";
    con.query(q,[uname,pass],function (err, result) {
    if (err) throw err;
    console.log("user registered");
    })

});


//User login endpiont
app.get('/login',(req,res)=>{

    uname = req.body.uname;
    pass = req.body.pass;

    quname = "SELECT username,pass FROM user where username=? AND pass=?";
    
    con.query(quname,[uname,pass],(err,results)=>{
        
        if(err){
            console.log(err);
        }
        
        if(results.length > 0){
            res.send("Success");
        }
        else{
            res.send("Unsuccessful");
        }
    })

});



//Admin endpoint
app.post('/admin',(req,res)=>{

    const api_key = 'hello-231'

    const admin_key = req.body.key;
    
    
    if(admin_key==api_key){
    
    const tid = req.body.tid;    
    const train_name = req.body.tname;
    const source = req.body.source;
    const dest = req.body.dest;
    const tseats = req.body.tseats;

    
        res.send("Train added");
    

         qtrain = "INSERT INTO trains (train_id,train_name,source,destination,total_seats) VALUES (?,?,?,?) ";
         qavail = "INSERT INTO seats_avial (train_id,available_seats,sourc,destination) VALUES (?,?,?,?)";
         con.query(qtrain,[tid,train_name,source,dest,tseats],(err,results)=>{
             if(err){
                 console.log(err);
             } 
         })

         con.query(qavail,[tid,tseats,source,dest],(err,results)=>{
            if(err){
                console.log(err);
            } 
        })
         
    }
    else{
        console.log("invalid admin");
    }
    

})


//Available trains endpoint
app.get('/trains',(req,res)=>{
    source = req.body.source;
    dest = req.body.dest;
    qav="SELECT * FROM seats_avail where sourc=? AND destination=?";

    con.query(qav,[source,dest],(err,results)=>{
        res.send(results);
    })
 
        
})




//Booking endpoint

app.post('/book',(req,res)=>{
    uid = req.body.uid;
    tid = req.body.tid;
    bseats = req.body.seats;

    qbook = "INSERT INTO bookings(userid,trainid,booked_seats) VALUES (?,?,?)";
    qup = "UPDATE seats_avail SET available_seats = available_seats - ? WHERE train_id=?";

    con.query(qbook,[uid,tid,bseats],(err,results)=>{
        if(err){
            console.log(err);
        }

        if(results.length > 0){
            res.send("booked");
        }
    })

    con.query(qup,[bseats,tid],(err,results)=>{
        if(err){
            console.log(err);
        }
        if(results.length > 0){
            console.log("updated");
        }
    })

})


//Booking details endpoint

app.get('/details',(req,res)=>{
    uid = req.body.uid;
    qdet = "SELECT * FROM bookings WHERE userid=?";

    con.query(qdet,[uid],(err,results)=>{
        res.send(results);
    })
})




app.listen(3000);