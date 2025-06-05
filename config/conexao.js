
import mongoose from "mongoose";

const url = "mongodb+srv://joaomassondo:prlAglZmgoPDGPLc@m633jvw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster11"

const conexao = await mongoose.connect(url)

export default conexao;