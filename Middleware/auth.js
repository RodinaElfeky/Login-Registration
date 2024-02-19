import jwt from 'jsonwebtoken'
import userModel from '../DB/Models/user.model.js'

export const auth = () => {
    return async (req,res,next) => {
       let {authorization} = req.headers
     if(authorization && authorization.startsWith('Bearer')){
        let token = authorization.split(" ")[1]
        let verified = jwt.verify(token,process.env.JWTKEY)
        if(verified){
         let user = await userModel.findById(verified.id)
          if(user){
            req.user = user
            next()
           } else {
            res.json({message :"invalid user"})
            }
        }else {
          res.json({message : "invalid token"})
       }
     }else {
        
        res.json({message : "invalid token or not sent"})
       }
       
    }
}