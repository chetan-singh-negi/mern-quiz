const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const app=express();
const path=require('path');
app.use(cors());
app.use(express.json({extended:false}));
mongoose.connect('mongodb+srv://chetan:chetan%409410@cluster0.q8u0hcq.mongodb.net/quiz?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("you are succesfully connected with mongodb server");
}).catch((err)=>console.log(err));
const studentSchema=mongoose.Schema({
    name:String,
    studentId:String
})
const testSchema=mongoose.Schema({
    studentID:String,
    name:String,
    gmail:String,
    marks:Number
})
const student=mongoose.model('student',studentSchema);
const test=mongoose.model('test',testSchema);
const port=process.env.PORT||8000;
app.post('/studentLogin',async(req,res)=>{
    const data=req.body.id;
    const result=await student.findOne({studentId:data});
    res.json(result);
})
app.post('/test',async(req,res)=>{
    const result=await test.find();
    res.json(result);
})
app.post('/completeTest',async(req,res)=>{
    const data=req.body.id;
    const result=await test.findOne({studentID:data});
    res.json(result);
})
app.post('/addMember',async(req,res)=>{
    const result=await test.insertMany([{studentID:req.body.id,name:req.body.name,gmail:req.body.gmail,marks:req.body.m}]);
    res.json(result);
})
app.listen(port,()=>{
    console.log(`you are listen at port number ${port}`)
})