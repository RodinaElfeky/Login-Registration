import userModel from "../../../DB/Models/user.model.js"
import bcryptjs from 'bcryptjs'

export const updatePassword = async (req,res) => {
    try {
        let {currentpassword,newpassword,newcpassword} = req.body
        if(newpassword == newcpassword){
          let user = await userModel.findById(req.user._id)
          let matched = await bcryptjs.compare(currentpassword,user.password)
          if(matched){
            let hashedpass = await bcryptjs.hash(newpassword,parseInt(process.env.saltRound))
            let updatedUser = await userModel.findByIdAndUpdate(user._id,{password:hashedpass},{new:true})
            res.json({message:"updated successfully",updatedUser})
          }else {
            res.json({message:"current password invalid"})
          }
        }else {
            res.json({message:"newpassword doesn't match newcpassword"})
        }
        
    } catch (error) {
        console.log(error)
        
    }
   
}