import "dotenv/config";
import mongoose from "mongoose";

const { MONGO_URL } = process.env;

export const connectDB = async () => {

try {
    await mongoose.connect(MONGO_URL);
  console.log("MongoDB conectado com sucesso");
} catch (error) {
  console.log("Erro ao conectar no MongoDB", error);
}
} 