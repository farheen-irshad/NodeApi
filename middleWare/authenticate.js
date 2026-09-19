 import jwt from "jsonwebtoken"
 
 
 const Authenticate  = (req,res,next) => {
       try{
        const authtoken  = req.headers.authorization
        const actualtoken = authtoken.split(" ")[1]
        jwt.verify(actualtoken , process.env.ACCESS_SECRET)
        console.log(actualtoken)
          //  console.log(match)

          next()
       } catch(error){
            res.status(400).json({msg:"token required"})
       }
}


export default Authenticate