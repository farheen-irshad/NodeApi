import {Router} from "express"
import {index, deletepage, createpage, updatepage, showbyid} from "../controllers/userController.js"
import Authenticate from "../middleWare/authenticate.js"
const userRoutes = Router()

userRoutes.get ("/" , Authenticate , index)

userRoutes.get ("/showid/:id" , showbyid)

userRoutes.post ("/create" , createpage)

userRoutes.put ("/update/:id" , updatepage)


userRoutes.delete ("/delete/:id" , deletepage)


export default userRoutes
