export interface Postulacion {
  id: number;
  name: string;
  company: string;
  status: 'A' | 'P' | 'E' | 'O';
}
