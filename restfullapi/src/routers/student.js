const express = require("express");
const router = new express.Router();
const Student = require("../models/students");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
// const auth = require("../middleware/auth");


//Wihtout Async Await
// app.post("/students",(req,res)=>{
//     console.log(req.body);
//     const user = new Student(req.body)

//     user.save()
//     .then(()=>{
//         res.status(201).send(user);
//     })
//     .catch((error)=>{
//         res.status(400).send(error);
//     })

//     // res.send("Hello from the other side");
// })

//With Async Await Starts Here!

// router.post("/students",async(req,res)=>{
    
//     try {
//         const user = new Student(req.body);
//         const createUser = await user.save();
//         res.status(201).send(createUser);
        
//     } catch (error) {
//         res.status(400).send(error)
        
//     }
// })

//With Async Await Ends Here!

//Trying with bcrypt starts here!

router.post("/students",async(req,res)=>{
    try {
        console.log("trying creating user");
        const user = new Student(req.body);
        user.password = await bcrypt.hash(user.password,10);
        // const token = await user.generateAuthToken();
        // console.log("this is token in route:",token);
        // res.cookie("restjwt", token,{
        //     expires:new Date(Date.now()+60000),
        //     httpOnly:true
        // })
        // console.log("Logging Cookie",cookie);
        // console.log("TRYING SAVING USER");
        const createUser = await user.save();
        res.status(201).send(createUser);
    } catch (error) {
        res.status(400).send(error);
    }
})

//Trying with bcrypt starts here!

//Trying Login Route with bcrypt password matching starts here

router.post("/students/login",async(req,res)=>{
    try {
        const user = await Student.findOne({email:req.body.email});
        if(user){
            const validatePassword = await bcrypt.compare(req.body.password,user.password);
            if(validatePassword){
                const token = await user.generateAuthToken();
                // window.localStorage.setItem('ltoken',token);
                // res.cookie("restjwt", token,{
                //     expires:new Date(Date.now()+300000),
                //     httpOnly:true
                // })
                res.status(200).send({user,token});
            }
            else{
                res.status(400).send("Invalid Password");
            }
        }
    } catch (error) {
        res.status(400).send("User Doesn't Exists!");
    }
})

//Trying Login Route with bcrypt password matching starts here

//Showing page after authentication routes starts here

// router.post("/dashboard",auth,async(req,res)=>{
//     res.send("Dashboard Page Running")
// })

//Showing page after authentication routes starts here


//Reading the registered Student Data Starts Here!

router.get("/students",async(req,res)=>{
    try {
        const studentsData = await Student.find();
        res.send(studentsData);

    } catch (error) {
        res.send(error)
        
    }
})

//Reading the registered Student Data Ends Here!

//Getting individual Student Data Starts Here!

// router.get("/students/:id",async(req,res)=>{
//     try {
//         const _id = req.params.id;
//         const studentData = await Student.findById(_id);
//         if(!studentData){
//             res.status(404).send();
//         }
//         else{
//             res.send(studentData);
//         }
        
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })

//Getting individual Student Data Ends Here!


//Updating the student data by its id starts here!

router.patch("/students/:id",async(req,res)=>{
    try {
        const _id = req.params.id;
        const updateStudents = await Student.findByIdAndUpdate(_id,req.body,{
            new:true
        });
        res.send(updateStudents);
        
    } catch (error) {
        res.status(400).send(error);
        
    }
})

//Updating the student data by its id Ends here!

//Deleting Student Data By its Id Starts Here!

router.delete("/students/:id",async(req,res)=>{
    try {
        const _id = req.params.id;
        if(!_id){
            return res.status(400).send();
        }
        else{
            const deleteStudent = await Student.findByIdAndDelete(_id);
            res.send(deleteStudent)
        }
        
    } catch (error) {
        res.status(500).send(error);
    }
})

//Deleting Student Data By its Id Ends Here!

//Login Student Post Starts Here!

router.get("/students/:id",async(req,res)=>{
    try {
        const id = req.params.email;
        // console.log(req.params)
        const studentEData = await Student.findOne({id: id});

        // console.log(studentEData);
        if(!studentEData){
            res.status(404).send();
        }
        else{
            res.send(studentEData);
        }
        
    } catch (error) {
        res.status(500).send(error)
    }
})

//Login Student Post Ends Here!


module.exports = router;