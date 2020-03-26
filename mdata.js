var mongoose = require('mongoose');
//connecting to db
mongoose.connect('mongodb://localhost:27017/employee',{useNewUrlParser: true})
//connection obj
var conn = mongoose.connection
//creating schema or say class
var employeeSchema= new mongoose.Schema({
    name:String,
    email: String,
    etype: String,
    hourlyrate: Number,
    totalHour: Number,
    })

    employeeSchema.methods.totalSalary=function(){
        return this.hourlyrate*this.totalHour
    }
//after schema model is made employee is collecttion name
var employeeModel = mongoose.model('Employee',employeeSchema)
//pass value
var employees = new employeeModel({name:'Sonu',
email:'sonu@gmail.com',
etype:'hourly',
hourlyrate:10,
totalHour:16
})
//catch value
employees.total=employees.totalSalary()
//open connection
conn.on("connected",function(){
    console.log("Connected successfully")
})

conn.on("disconnected",function(){
    console.log("DisConnected successfully")
})

conn.on('error',console.error.bind(console,'connection error:'))

conn.once('open',function(){
    // employees.save(function(err,res){
    //     if(err) throw error//error from up
    //     console.log(res)
    //     conn.close()
    //})
    employeeModel.find(function(err,data){

        if(err) throw error
        console.log(data)
        conn.close()
    })
})
