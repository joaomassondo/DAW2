import mongoose from 'mongoose'

const imagemSchema = new mongoose.Schema({
  url: { type: String, required: true },
  descricao: { type: String, required: true },
  criadoEm: { type: Date, default: Date.now },
})

const Imagem = mongoose.model('Imagem', imagemSchema)
export default Imagem
