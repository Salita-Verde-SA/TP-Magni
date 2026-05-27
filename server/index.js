import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import { MercadoPagoConfig, Preference } from 'mercadopago'

const app = express()
const PORT = Number(process.env.PORT ?? 3000)
const MONGO_URL = process.env.MONGO_URL ?? 'mongodb://localhost:27017/registro-evento'
const JWT_SECRET = process.env.JWT_SECRET ?? 'jwt_secreto_tp7_desarrollo'

const MERCADO_PAGO_ACCESS_TOKEN = process.env.MERCADO_PAGO_ACCESS_TOKEN

const mpClient = new MercadoPagoConfig({
  accessToken: MERCADO_PAGO_ACCESS_TOKEN
})

app.use(cors())
app.use(express.json())

// ─── Schemas ───────────────────────────────────────────────────────────────────

const usuarioSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    rol: { type: String, enum: ['ADMIN', 'CONSULTA'], required: true },
  },
  { versionKey: false },
)

const participanteSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true, index: true },
    nombre: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    edad: { type: Number, required: true },
    pais: { type: String, required: true },
    modalidad: { type: String, required: true },
    tecnologias: { type: [String], default: [] },
    nivel: { type: String, required: true },
    aceptaTerminos: { type: Boolean, required: true },
  },
  { versionKey: false },
)

const Usuario = mongoose.model('Usuario', usuarioSchema, 'usuarios_db')
const Participante = mongoose.model('Participante', participanteSchema)

// ─── Seed usuarios ──────────────────────────────────────────────────────────────

const seedUsuarios = async () => {
  const count = await Usuario.countDocuments()
  if (count === 0) {
    await Usuario.insertMany([
      { username: 'admin', password: 'admin123', rol: 'ADMIN' },
      { username: 'consulta', password: 'consulta123', rol: 'CONSULTA' },
    ])
    console.log('Usuarios creados: admin/admin123 (ADMIN) | consulta/consulta123 (CONSULTA)')
  }
}

// ─── JWT Middleware ─────────────────────────────────────────────────────────────

const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'No autorizado' })
    return
  }
  const token = authHeader.split(' ')[1]
  try {
    req.usuario = jwt.verify(token, JWT_SECRET)
    next()
  } catch {
    res.status(401).json({ error: 'Token inválido o expirado' })
  }
}

// ─── Rutas públicas ─────────────────────────────────────────────────────────────

app.post('/login', async (req, res) => {
  const { username, password } = req.body
  const usuario = await Usuario.findOne({ username, password })
  if (!usuario) {
    res.status(401).json({ error: 'Credenciales inválidas' })
    return
  }
  const token = jwt.sign(
    { username: usuario.username, rol: usuario.rol },
    JWT_SECRET,
    { expiresIn: '8h' },
  )
  res.json({ token, usuario: { username: usuario.username, rol: usuario.rol } })
})

app.post('/pago/preferencia', async (req, res) => {
  const { id, nombre, precio, back_urls } = req.body

  if (!MERCADO_PAGO_ACCESS_TOKEN) {
    res.status(500).json({ error: 'Falta configurar la variable MERCADO_PAGO_ACCESS_TOKEN en el servidor' })
    return
  }

  try {
    const preference = new Preference(mpClient)
    const successUrl = back_urls?.success || 'http://localhost:5173/pago-exitoso'
    const failureUrl = back_urls?.failure || 'http://localhost:5173/pago-fallido'
    const pendingUrl = back_urls?.pending || 'http://localhost:5173/pago-pendiente'

    const body = {
      items: [
        {
          id: id,
          title: nombre,
          quantity: 1,
          unit_price: Number(precio),
          currency_id: 'ARS',
        },
      ],
      back_urls: {
        success: successUrl,
        failure: failureUrl,
        pending: pendingUrl,
      }
    }

    if (successUrl.startsWith('https') || successUrl.includes('localhost')) {
      body.auto_return = 'approved'
    }

    const response = await preference.create({ body })
    res.json({ id: response.id, init_point: response.init_point })
  } catch (error) {
    console.error('Error al crear preferencia de Mercado Pago:', error)
    res.status(500).json({ error: error.message || 'Error al crear la preferencia de pago' })
  }
})

// ─── Rutas protegidas ───────────────────────────────────────────────────────────

app.use('/participantes', verificarToken)

app.get('/participantes', async (_req, res) => {
  const participantes = await Participante.find().sort({ id: -1 })
  res.json(participantes)
})

app.post('/participantes', async (req, res) => {
  const payload = req.body
  if (!payload.id) {
    payload.id = Date.now()
  }
  const participante = await Participante.create(payload)
  res.status(201).json(participante)
})

app.put('/participantes/:id', async (req, res) => {
  const id = Number(req.params.id)
  if (Number.isNaN(id)) {
    res.status(400).json({ error: 'ID invalido' })
    return
  }
  const result = await Participante.findOneAndUpdate({ id }, req.body, { new: true })
  if (!result) {
    res.status(404).json({ error: 'Participante no encontrado' })
    return
  }
  res.json(result)
})

app.delete('/participantes/:id', async (req, res) => {
  const id = Number(req.params.id)
  if (Number.isNaN(id)) {
    res.status(400).json({ error: 'ID invalido' })
    return
  }
  const result = await Participante.deleteOne({ id })
  if (!result.deletedCount) {
    res.status(404).json({ error: 'Participante no encontrado' })
    return
  }
  res.status(204).send()
})

app.delete('/participantes', async (_req, res) => {
  await Participante.deleteMany({})
  res.status(204).send()
})

// ─── Error handler ──────────────────────────────────────────────────────────────

app.use((err, _req, res, _next) => {
  res.status(500).json({ error: err?.message ?? 'Error inesperado' })
})

// ─── Start ──────────────────────────────────────────────────────────────────────

mongoose
  .connect(MONGO_URL)
  .then(async () => {
    await seedUsuarios()
    app.listen(PORT, () => {
      console.log(`API escuchando en http://localhost:${PORT}`)
    })
  })
  .catch((error) => {
    console.error('Error al conectar con MongoDB', error)
    process.exit(1)
  })
