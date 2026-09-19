import userModel from "../models/userModels.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { accessToken , refreshToken} from "../services/tokenService.js"

export const signup = async (req, res) =>{
    try{
         // console.log(req.body)

    // check weather the email already exist or not

    const match = await userModel.findOne({email:req.body.email})
     
    if (match){
        return  res.status(409).json({msg:"Email already exist"})
    }

    // Create User

    const user = new userModel(req.body)
    await user.save()
    res.status(201).json({msg:"user created successfully"})

    }

    catch (error){
        res.status(400).json({msg:"internal server error"})
    }
    // console.log(req.body)

    // check weather the email already exist or not

    const match = await userModel.findOne({email:req.body.email})
     
    if (match){
        return  res.status(409).json({msg:"Email already exist"})
    }

    // Create User

    const user = new userModel(req.body)
    await user.save()
    res.status(201).json({msg:"user created successfully"})
}

  // login


export const login = async (req, res) =>{
    try {
        console.log(req.body)
       const user = await userModel.findOne({email:req.body.email})
    //   console.log(user)
    if(!user){
       return res.status(404).json({msg:"invalid useremail"})
    }
    //password check
    const frontpass = req.body.password
    const dbpass = user.password
    const match = await bcrypt.compare(frontpass,dbpass)
    console.log(match)
    if(!match){
       return res.status(404).json({msg:"invalid credentials"})
    }
     const acc = await accessToken(user)
     const ref = await refreshToken(user)
     res.cookie("refToken" , ref , {httpOnly:true})
    res.status(200).json({msg:"login successfully" , accessToken:acc})
        
    } catch (error) {
           res.status(200).json({msg:"user not found"})
        
    }
}
    export const refresh = async (req, res) =>{
    try {
           const ref = req.cookies.refToken
           const match  = jwt.verify(ref, process.env.REFRESH_SECRET)
           console.log(match)

           if(!match){
            return  res.status(400).json({msg:"invalid refresh token"})
           }
         
         const acc =  jwt.sign({id:
      match.id, email:match.email}, process.env.ACCESS_SECRET, {expiresIn:"15m"})

      res.status(200).json({msg : "new access token generated" , acc:accessToken})
        
    } catch (error) {
        res.status(400).json({msg:"cookie error"})
    }
}


export const logout = async (req, res) =>{
    try {
        
        
    } catch (error) {
        
    }
}