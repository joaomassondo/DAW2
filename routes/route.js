import express from 'express'
import upload from '../config/multer.js'
import Imagem from '../models/Imagem.js'

import {
  home,
  abreedtusuario,
  edtusuario,
  deletausuario,
  listarusuario,
  filtrarusuario,
  abreaddusuario,
  addusuario,
  abreaddproduto,
  addproduto,
  abreedtproduto,
  edtproduto,
  listarproduto,
  filtrarproduto,
  deletaproduto,
} from '../controllers/controller.js'

const router = express.Router()

router.get('/', home)

// Usuário
router.get('/admin/usuario/addusuario', abreaddusuario)
router.post('/admin/usuario/addusuario', addusuario)

router.get('/admin/usuario/lstusuario', listarusuario)
router.post('/admin/usuario/lstusuario', filtrarusuario)

router.get('/admin/usuario/delusuario/:id', deletausuario)

router.get('/admin/usuario/edtusuario/:id', abreedtusuario)
router.post('/admin/usuario/edtusuario/:id', edtusuario)

// Produto
router.get('/admin/produto/addproduto', abreaddproduto)
router.post('/admin/produto/addproduto', upload.single('imagem'), addproduto)

router.get('/admin/produto/edtproduto/:id', abreedtproduto)
router.post(
  '/admin/produto/edtproduto/:id',
  upload.single('imagem'),
  edtproduto
)

router.get('/admin/produto/lstproduto', listarproduto)
router.post('/admin/produto/lstproduto', filtrarproduto)

router.get('/admin/produto/delproduto/:id', deletaproduto)

// Upload imagem
router.post('/admin/imagens/add', upload.single('imagem'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('Arquivo não enviado.')
    }

    const { descricao } = req.body
    const imagemUrl = '/uploads/' + req.file.filename

    await Imagem.create({ url: imagemUrl, descricao })

    res.redirect('/admin/imagens/add')
  } catch (error) {
    console.error(error)
    res.status(500).send('Erro ao adicionar imagem')
  }
})

export default router
