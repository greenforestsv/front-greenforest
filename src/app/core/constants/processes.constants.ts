export interface Process {
  id: number;
  name: string;
}

export const PROCESSES: Process[] = [
  {
    id: 1,
    name: 'POSTULADO',
  },
  {
    id: 2,
    name: 'REVISIÓN',
  },
  {
    id: 3,
    name: 'PRESELECCIÓN',
  },
  {
    id: 4,
    name: 'ENTREVISTA TELEFÓNICA',
  },
  {
    id: 5,
    name: 'ENTREVISTA TÉCNICA',
  },
  {
    id: 6,
    name: 'ENTREVISTA PSICOMÉTRICA',
  },
  {
    id: 7,
    name: 'OFERTA LABORAL',
  },
  {
    id: 8,
    name: 'CONTRATADO',
  },
  {
    id: 9,
    name: 'RECHAZADO',
  },
];
