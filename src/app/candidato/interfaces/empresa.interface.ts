export interface Empresa {
  id: number;
  avatar_image?: string;
  name: string;
  industry: string;
  country: string;
  ascensos_internos: number;
  rotacion: number;
  beneficios_reales: number;
  reputacion_alta: boolean;
  solicito_acceso: boolean;
  vacantes: number;
}
