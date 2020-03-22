const express = require('express')
const bodyParser = require('body-parser')//to read HTTP POST data
const { check, validationResult } = require('express-validator')

const app = express();
app.use('/static',express.static('public'))//static as a imaginery folder
app.set('view engine', 'twig')
app.set('views','./public/views')//to not mentioning path in each place

var jsonParser = bodyParser.json()
var urleancodedParser = bodyParser.urlencoded({extended:false})

app.set('view engine', 'twig')
app.set('views','./public/views')//to not mentioning path in each place


app.get("/",(req,res)=>{
    res.render('index',{title:'login form'})
})

app.post('/login',urleancodedParser,function(req,res){
    res.send('welcome' + req.body.username)
})

app.post("/",urleancodedParser,[
     check('username','Invalid email').isEmail(),
     check('password','password must be in 5 character').isLength({min:5})      
],(req,res)=>{
    const error = validationResult(req)
    console.log(error.mapped())
    if(!error.isEmpty()){
        res.render('index',{title:'index detail',error:error.mapped()})
    }else{
        res.render('login',{title:'user detail',username:req.body.username,password:req.body.password})
    }
});

// app.get("/",(req,res)=>{
//     res.sendFile(__dirname+ '/index.html')
// });
// app.get("/users/:Id?",(req,res)=>{//? if not pass no error
//     if(req.params.Id == undefined){
//         res.send("All user data accessed")
//     }
//     else
//     res.send("User data accessed "+req.params.Id)
// });

// app.get("/flight/:From?.:To?",(req,res)=>{//? if not pass no error
//     res.send("Search for flight From: "+req.params.From+"TO:"+req.params.To)
// });
app.listen(3000,()=>console.log("Running in port 3000"))