import mongoose from 'mongoose';

const UsuarioSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true },
    senha: { type: String, required: true }
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);
export default Usuario;
