import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'


const app = express()
const PORT = Number(process.env.PORT ?? 3000)
const MONGO_URL =
  process.env.MONGO_URL ?? 'mongodb://localhost:27017/registro-evento'

app.use(cors())
app.use(express.json())


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
  {
    versionKey: false,
  },
)


const Participante = mongoose.model('Participante', participanteSchema)


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

  const payload = req.body
  const result = await Participante.findOneAndUpdate({ id }, payload, { new: true })

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


app.use((err, _req, res, _next) => {
  res.status(500).json({ error: err?.message ?? 'Error inesperado' })
})

mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`API escuchando en http://localhost:${PORT}`)
    })
  })
  .catch((error) => {
    console.error('Error al conectar con MongoDB', error)
    process.exit(1)
  })
