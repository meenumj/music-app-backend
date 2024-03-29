const mongoose=require("mongoose")

const userSchema = new mongoose.Schema(
    {           Name:String,
                Age: String,
                Mobile:String,
                Gender:String,
                Email:String,
                Password:String,
                ConfirmPassword:String
            }        
)


module.exports=mongoose.model("users",userSchema)