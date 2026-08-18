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

export interface TenantResponseDto {
  id: string;
  name: string;
  locations: string[];
  approach: string[];
  url_profile_photo?: string;
  description: string;
  is_verified?: boolean;
}

export interface PerfilEmpresaDto {
  active_jobs: number;
  alternative_email: string;
  approach: string[];
  avg_valorations: number;
  cel_phone: string;
  description: string;
  email: string;
  employees: number;
  favorites: number;
  id: string;
  is_multinational: boolean;
  is_verified: boolean;
  locations: string[];
  name: string;
  normalized_name: string;
  phone: string;
  url_profile_photo: string;
  vinculation_date: string;
  website: string;
}

export interface PatchTenantDto {
  name: string;
  phone: string;
  cel_phone: string;
  locations: string[];
  approach: string[];
  url_profile_photo?: string;
  description: string;
}

export interface FilterTenantListDto {
  name?: string;
  country?: string[];
  approach?: string[];
}
