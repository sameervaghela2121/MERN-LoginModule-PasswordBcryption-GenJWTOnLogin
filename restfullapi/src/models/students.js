require('dotenv').config()
const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const studentSchema = new mongoose.Schema({
    name: {
        type:String,
        requried:true,
        minlength:3
    },
    email: {
        type:String,
        required:true,
        unique:[true,"Email id allready present"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email")
            }
        }
    },
    phone: {
        type:Number,
        min:10,
        required:true,
    },
    address: {
        type:String,
        required:true,

    },
    password: {
        type:String,
        required:true,
    }
},{
    timestamps : true,
}
)

//Generating Token Begins Here!
studentSchema.methods.generateAuthToken = async function(){
    try {
        const token = jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY);
        console.log("This is token: ",token);
        // this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    } catch (error) {
        console.log("Error: ",error);
    }
}
//Generating Token Ends Here!


//Creating a new Collection

const Student = new mongoose.model('Student',studentSchema);

module.exports = Student;