export interface ProcessColumn {
  key: string;
  title: string;
}

export const PROCESSES: ProcessColumn[] = [
  {
    key: 'POSTULADO',
    title: 'Aplicados',
  },
  {
    key: 'P',
    title: 'Preselección',
  },
  {
    key: 'E',
    title: 'Entrevista',
  },
  {
    key: 'O',
    title: 'Oferta',
  },
];
