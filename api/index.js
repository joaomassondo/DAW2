import express from 'express'
import path, { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import mongoose from 'mongoose'
import routes from '../routes/route.js'
import { createServer } from 'http';

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()

app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.set('views', resolve(__dirname, 'views'))
app.use(express.static('public'))

app.use(express.static(path.join(__dirname, 'public')))

app.use(routes)

//MongoDB
const url =
  'mongodb+srv://joaomassondo:prlAglZmgoPDGPLc@m633jvw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster11'

mongoose
  .connect(url)
  .then(() => console.log('Servidor Online'))
  .catch((err) => console.error('Erro MongoDB:', err))

// Start
app.listen(3000, () => {
  console.log('Rodando: 3000')
})
