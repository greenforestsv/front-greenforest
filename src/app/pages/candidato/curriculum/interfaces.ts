export interface ExperienciaProfesional {
  titulo: string;
  empresa: string;
  fecha: string;
  descripcion?: string;
}

export interface Educacion {
  titulo: string;
  institucion: string;
  fecha: string;
  descripcion?: string;
}

export interface Habilidad {
  id: number;
  nombre: string;
}

export interface Idioma {
  id: number;
  nombre: string;
  nivel: string;
}

export interface InformacionPersonal {
  nombre: string;
  titulo: string;
  ubicacion: string;
  correo: string;
  telefono: string;
  descripcion: string;
}

export interface Curriculum {
  id: number;
  perfil: InformacionPersonal;
  experiencias: ExperienciaProfesional[];
  educacion: Educacion[];
  habilidades: Habilidad[];
  idiomas: Idioma[];
}
