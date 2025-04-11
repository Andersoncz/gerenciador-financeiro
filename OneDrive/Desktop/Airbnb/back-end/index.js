import  "dotenv/config"
import express from "express"
import UserRotas from "./dominios/users/rotas.js"




// Importando o mongoose para conectar ao MongoDB
const app = express()
const { PORT } = process.env


// Middleware para analisar o corpo da requisição como JSON
app.use(express.json())
app.use('/users',UserRotas)




//
app.listen(PORT, () => {
    console.log(`servidor rodando na porta ${PORT}`)
})

    




   