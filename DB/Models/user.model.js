import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    code : {
        type : String 
    },
    userName : String,
    email : {
        type: String,
        required : true
    },
    password : {
        type: String,
        required : true
    },
    profilePic : String,
    isConfirmed :{
        type : Boolean,
        default : false
    }},
    
    {
        timestamps : true
    }
    
)

const userModel = new mongoose.model("user",userSchema)

//userModel.schema.add({code : String});
export default userModel