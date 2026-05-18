export type Modalidad = 'Presencial' | 'Virtual' | 'Hibrido'
export type Nivel = 'Principiante' | 'Intermedio' | 'Avanzado'
export type Tecnologia = 'React' | 'Angular' | 'Vue' | 'Node' | 'Python' | 'Java'

export interface Participante {
  id: number
  nombre: string
  email: string
  edad: number
  pais: string
  modalidad: Modalidad
  tecnologias: Tecnologia[]
  nivel: Nivel
  aceptaTerminos: boolean
}

export interface FormularioParticipante {
  nombre: string
  email: string
  edad: string
  pais: string
  modalidad: Modalidad
  tecnologias: Tecnologia[]
  nivel: Nivel
  aceptaTerminos: boolean
}

export const STORAGE_KEY = 'registro-eventos-participantes'

export const PAISES = ['Argentina', 'Chile', 'Uruguay', 'Mexico', 'Espana']
export const MODALIDADES: Modalidad[] = ['Presencial', 'Virtual', 'Hibrido']
export const TECNOLOGIAS: Tecnologia[] = [
  'React',
  'Angular',
  'Vue',
  'Node',
  'Python',
  'Java',
]
export const NIVELES: Nivel[] = ['Principiante', 'Intermedio', 'Avanzado']

export const FORMULARIO_INICIAL: FormularioParticipante = {
  nombre: '',
  email: '',
  edad: '',
  pais: 'Argentina',
  modalidad: 'Presencial',
  tecnologias: [],
  nivel: 'Principiante',
  aceptaTerminos: false,
}

export const PARTICIPANTES_INICIALES: Participante[] = [
  {
    id: 1,
    nombre: 'Juan Perez',
    email: 'juan@mail.com',
    edad: 25,
    pais: 'Argentina',
    modalidad: 'Presencial',
    tecnologias: ['React', 'Node'],
    nivel: 'Intermedio',
    aceptaTerminos: true,
  },
]

export const colorFondoTarjeta = (nivel: Nivel): string => {
  if (nivel === 'Principiante') return 'bg-emerald-100'
  if (nivel === 'Intermedio') return 'bg-yellow-100'
  return 'bg-rose-100'
}

export const colorTextoNivel = (nivel: Nivel): string => {
  if (nivel === 'Principiante') return 'text-emerald-700'
  if (nivel === 'Intermedio') return 'text-amber-700'
  return 'text-rose-600'
}