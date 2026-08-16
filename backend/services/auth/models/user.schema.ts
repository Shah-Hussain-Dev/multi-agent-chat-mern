import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
    {
        firebaseUID:{
            type:String,
            unique:true
        },
        name:String,
        email:{
            type:String,
            unique:true
        },
        password:{
            type:String,

        },
        avatar:String
    },{
    timestamps:true
})


const User =  mongoose.model("User",userSchema);
export default User