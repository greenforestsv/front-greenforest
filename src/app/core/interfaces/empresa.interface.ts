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

export interface PatchTenantDto {
  name: string;
  phone: string;
  cell_phone: string;
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
