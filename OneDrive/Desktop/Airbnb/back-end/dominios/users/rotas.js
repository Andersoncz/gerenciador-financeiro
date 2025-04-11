import {Router} from 'express';
import User from "./model.js"
import {connectDB} from "../../config/db.js"
import bcrypt from "bcryptjs"

const rotas = Router()
const bcryptSalt = bcrypt.genSaltSync()

rotas.get ('/', async (req,res) => {
    connectDB()

    try {
        const userDoc = await User.find()
        res.json(userDoc)
    }
    catch (error) {
        res.status(500).json(error)
    }
})

rotas.post("/", async (req, res)=>{
    connectDB()

     const {name, email, password} = req.body
     //criptografando a senha
     const encryptedPassword =  bcrypt.hashSync(password, bcryptSalt)

try{

    const newUserDoc = await User.create({
        name,
        email,
        password: encryptedPassword,
    })

    res.json(newUserDoc)}
    catch (error) {
        res.status(500).json(error)
    }
})

export default rotas
// export default rotas