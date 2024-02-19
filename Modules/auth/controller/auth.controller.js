import bcryptjs from 'bcryptjs'
import userModel from '../../../DB/Models/user.model.js'
import jwt from 'jsonwebtoken'
import { sendToEmail } from '../../../services/sendEmail.js'
import {
	StatusCodes,
	getReasonPhrase
} from 'http-status-codes';
import  {nanoid}  from 'nanoid'





export const signUp = async (req,res) => {
     try {
        let {userName,email,password,cpassword} = req.body
        if(password == cpassword){
            let user = await userModel.findOne({email})
            if(user){
                res.status(StatusCodes.BAD_REQUEST).json("you are already registered")
            } else {
                let hashedpassword = bcryptjs.hashSync(password,parseInt(process.env.SaltRound))
                let saveUser = new userModel({userName,email,password:hashedpassword})
                let saved = await saveUser.save()
                let token = jwt.sign({id:saved._id},process.env.CONFIRMEMAILKEY,{expiresIn:60})
                let refreshToken = jwt.sign({id:saved._id},process.env.CONFIRMEMAILKEY,{expiresIn:60*60}) 

                let BASELINK = `${req.protocol}://${req.headers.host}${process.env.BASE_URL}`
                let message = `<a href = "${BASELINK}/auth/confirmEmail/${token}">Please click here to verify your email</a>
                <br>
                <br>
                <a href = "${BASELINK}/auth/refreshToken/${refreshToken}">Click here to refreshToken</a>`
                sendToEmail(saved.email,message)
                res.status(StatusCodes.CREATED).json({message:"Done",saved,status:getReasonPhrase(StatusCodes.CREATED)})
            }
        }else {
            res.json({message:"password not matched"})
        }
        
     } catch (error) {
         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"Catch Error"})
         console.log(error)
     }
   
}

export const confirmEmail = async (req,res) => {
    let {token} = req.params
    let decoded = jwt.verify(token,process.env.CONFIRMEMAILKEY)
    if(!decoded){
        res.json({message:"invalid token"})
    }else {
        let user = await userModel.findById(decoded.id)
        if (!user){
            res.json({message:"Your are not registered"})
        }else {
            if(user.isConfirmed){
                res.json({message:"you are already confirmed"})
            }else {
                let updatedUser = await userModel.findByIdAndUpdate(user._id,{isConfirmed:true})
                res.json({message:"Confirmed successfully , you can login now"})
            }
            
        }

    }
}

export const login = async (req,res) => {
  try {
    let {email,password} = req.body
  let user = await userModel.findOne({email})
  if(!user){
       res.status(400).json({message:"you need to register first"})
  }else {
      let matched = bcryptjs.compareSync(password,user.password)
      if(matched){
        if(user.isConfirmed){
            let token = jwt.sign({isLogin:true,id:user._id},process.env.JWTKEY)
            res.status(200).json({message:"Welcome",token})
        }
      }else {
        res.status(422).json({message:"invalid password"})
      }
  }
    
  } catch (error) {
    res.status(500).json({message:"Catch Error"})
    
  }
}

export const refreshToken = async (req,res) =>{
    let {token} = req.params
    console.log(req.params)
    let decoded = jwt.verify(token,process.env.CONFIRMEMAILKEY)
    if(!decoded || !decoded.id){
        res.json({message : "invalid token or id"})
    }else {
        let user = await userModel.findById(decoded.id)
        if(!user){
            res.json({message:"user didn't register"})
            
        }else {
            if(user.confirmEmail){
                res.json({message:"Already confirmed"})
            }else{
                let token = jwt.sign({id:user._id},process.env.CONFIRMEMAILKEY)
                let BASELINK = `${req.protocol}://${req.headers.host}${process.env.BASE_URL}`
                let message = `<a href = "${BASELINK}/auth/confirmEmail/${token}">This is the second email</a>`
                
               sendToEmail(user.email,message)
               res.json({message:"Done please check your email"})


            }

        }

    }
}

export const sendCode = async (req,res) => {
    try {
        let {email} = req.body
        let user = await userModel.findOne({email})
    if(!user){
        res.json({message:"You didn't register yet"})
    }else {
        let OTPCode = nanoid() 
        await userModel.findByIdAndUpdate(user._id, { code: OTPCode })
        console.log(user.code)
        let message = `your OTPCode is ${OTPCode}`
        sendToEmail(email,message)
        res.json({message:"please check your email"})
    }
    } catch (error) {
        console.log(error)
    }
    
}

export const forgetPassword = async (req,res) => {
    try {
        let {code,email,password} = req.body
    if (!code){
        res.json({message:"Invalid code"})
    } else {
        let user = await userModel.findOne({email,code})
         if(!user){
          res.json({message:" invalid email"})
         }else {
        const hashedpass = await bcryptjs.hash(password,parseInt(process.env.SaltRound))
        let updatedUser = await userModel.findByIdAndUpdate(user._id,{code:null,password:hashedpass},{new:true})
        res.json({message:"Success",updatedUser})
      }
    }
    
    } catch (error) {
        res.json({message:"Error",error})
    }
    

}