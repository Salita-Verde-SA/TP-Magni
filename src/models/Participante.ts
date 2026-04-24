export type Modalidad = 'Presencial' | 'Virtual' | 'Hibrido'
export type Nivel = 'Principiante' | 'Intermedio' | 'Avanzado'
export type Tecnologia = 'React' | 'Angular' | 'Vue' | 'Node' | 'Python' | 'Java'

export class Participante {
  id: number
  nombre: string
  email: string
  edad: number
  pais: string
  modalidad: Modalidad
  tecnologias: Tecnologia[]
  nivel: Nivel
  aceptaTerminos: boolean

  // Construye un participante y asigna un id basado en timestamp.
  constructor(
    nombre: string,
    email: string,
    edad: number,
    pais: string,
    modalidad: Modalidad,
    tecnologias: Tecnologia[],
    nivel: Nivel,
    aceptaTerminos: boolean,
  ) {
    this.id = Date.now()
    this.nombre = nombre
    this.email = email
    this.edad = edad
    this.pais = pais
    this.modalidad = modalidad
    this.tecnologias = tecnologias
    this.nivel = nivel
    this.aceptaTerminos = aceptaTerminos
  }
}
