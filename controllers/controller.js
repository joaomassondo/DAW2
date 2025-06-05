import Produto from "../models/Produto.js";
import Usuario from "../models/Usuario.js";
import Imagem from "../models/Imagem.js";
import multer from "multer";
import path from "path";
import mongoose from "mongoose";

export async function home(req, res) {
  try {
    const todasImagens = await Imagem.find();

    function shuffle(array) {
      let currentIndex = array.length,
        randomIndex;

      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }
      return array;
    }

    const imagensAleatorias = shuffle(todasImagens);
    res.render("admin/index", { imagens: imagensAleatorias });
  } catch (error) {
    console.error("Erro ao carregar imagens:", error);
    res.status(500).send("Erro ao carregar a página inicial");
  }
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
export const upload = multer({ storage: storage });

// USUÁRIO

export async function abreaddusuario(req, res) {
  res.render("admin/usuario/addusuario");
}

export async function addusuario(req, res) {
  try {
    await Usuario.create({
      nome: req.body.nome,
      email: req.body.email,
      senha: req.body.senha,
    });
    res.redirect("/admin/usuario/lstusuario");
  } catch (error) {
    console.error("Erro ao adicionar usuário:", error);
    res.status(500).send("Erro ao salvar usuário.");
  }
}

export async function listarusuario(req, res) {
  try {
    const usuarios = await Usuario.find({});
    res.render("admin/usuario/lstusuario", { Usuarios: usuarios });
  } catch (err) {
    console.error("Erro ao listar usuários:", err);
    res.status(500).send("Erro ao listar usuários.");
  }
}

export async function filtrarusuario(req, res) {
  res.redirect("/admin/usuario/lstusuario");
}

export async function deletausuario(req, res) {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send("ID inválido");
    }

    const usuarioDeletado = await Usuario.findByIdAndDelete(id);
    if (!usuarioDeletado) {
      return res.status(404).send("Usuário não encontrado para deletar");
    }

    res.redirect("/admin/usuario/lstusuario");
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    res.status(500).send("Erro ao deletar usuário.");
  }
}

export async function abreedtusuario(req, res) {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send("ID inválido");
    }

    const usuario = await Usuario.findById(id);
    if (!usuario) {
      return res.status(404).send("Usuário não encontrado");
    }

    res.render("admin/usuario/edtusuario", { usuario });
  } catch (error) {
    console.error("Erro ao carregar usuário para edição:", error);
    res.status(500).send("Erro ao carregar usuário.");
  }
}

export async function edtusuario(req, res) {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send("ID inválido");
    }

    const usuarioAtualizado = await Usuario.findByIdAndUpdate(
      id,
      {
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
      },
      { new: true }
    );

    if (!usuarioAtualizado) {
      return res.status(404).send("Usuário não encontrado para editar");
    }

    res.redirect("/admin/usuario/lstusuario");
  } catch (error) {
    console.error("Erro ao editar usuário:", error);
    res.status(500).send("Erro ao editar usuário.");
  }
}

// PRODUTO
export async function abreaddproduto(req, res) {
  res.render("admin/produto/addproduto");
}

export async function addproduto(req, res) {
  try {
    console.log("Arquivo recebido:", req.file);

    const {
      nome,
      descricao,
      categoria,
      codigobarra,
      validade,
      qtdproduto,
      preco,
    } = req.body;

    let imagem = "";

    if (req.file) {
      imagem = "/uploads/" + req.file.filename;
      console.log("Caminho salvo:", imagem);

      const novaImagem = new Imagem({
        url: imagem,
        descricao: nome || "Imagem de produto",
      });

      await novaImagem.save();
    }

    await Produto.create({
      nome,
      descricao,
      categoria,
      codigobarra,
      validade,
      qtdproduto,
      preco,
      imagem,
    });

    res.redirect("/admin/produto/lstproduto");
  } catch (error) {
    console.error("Erro ao adicionar produto:", error);
    res.status(500).send("Erro ao adicionar produto.");
  }
}

export async function listarproduto(req, res) {
  try {
    const produtos = await Produto.find({});
    res.render("admin/produto/lstproduto", { produtos });
  } catch (err) {
    console.error("Erro ao listar produtos:", err);
    res.status(500).send("Erro ao listar produtos.");
  }
}

export async function filtrarproduto(req, res) {
  res.redirect("/admin/produto/lstproduto");
}

export async function deletaproduto(req, res) {
  try {
    await Produto.findByIdAndDelete(req.params.id);
    res.redirect("/admin/produto/lstproduto");
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    res.status(500).send("Erro ao deletar produto.");
  }
}

export async function abreedtproduto(req, res) {
  try {
    const meuproduto = await Produto.findById(req.params.id);
    res.render("admin/produto/edtproduto", { produto: meuproduto });
  } catch (error) {
    console.error("Erro ao carregar produto para edição:", error);
    res.status(500).send("Erro ao carregar produto.");
  }
}

export async function edtproduto(req, res) {
  try {
    const updateData = {
      nome: req.body.nome,
      descricao: req.body.descricao,
      categoria: req.body.categoria,
      codigobarra: req.body.codigobarra,
      validade: req.body.validade,
      qtdproduto: req.body.qtdproduto,
      preco: req.body.preco,
    };

    if (req.file) {
      updateData.imagem = "/uploads/" + req.file.filename;
    }

    await Produto.findByIdAndUpdate(req.params.id, updateData);
    res.redirect("/admin/produto/lstproduto");
  } catch (error) {
    console.error("Erro ao editar produto:", error);
    res.status(500).send("Erro ao editar produto.");
  }
}
