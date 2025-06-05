import mongoose from "mongoose";

const produtoSchema = new mongoose.Schema({
  nome: String,
  descricao: String,
  categoria: String,
  codigobarra: String,
  validade: Date,
  qtdproduto: Number,
  preco: Number,
  imagem: String,
});

const Produto = mongoose.model("Produto", produtoSchema);

export default Produto;
