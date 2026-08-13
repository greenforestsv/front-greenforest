import { Gender } from '../../shared/pipes/gender.pipe';

export interface Representative {
  dni: string;
  first_name: string;
  second_name?: string;
  first_surname: string;
  second_surname?: string;
  birth_date: Date;
  gender: Gender;
  email: string;
  phone: string;
  country: string;
  department: string;
  profession: string;
  address?: string;
  carnet: string;
}

export interface SignupTenantDto {
  tenant_name: string;
  tenant_email: string;
  phone: string;
  cel_phone?: string;
  tenant_alternative_email?: string;
  description: string;
  approach: string[];
  is_multinational?: boolean;
  locations: string[];
  url_profile_photo?: string;
  database_host?: string;
  is_isolate: 'NO' | 'INSTANCE';
  have_carnets?: boolean;
  representative: Representative;
}

export interface SignupTenantResponseDto {
  country: string;
  first_login: boolean;
  name: string;
  token: string;
}

export interface JwtPayload {
  id: string;
  iat: number;
  exp: number;
}

export interface LoginEmployeeDto {
  user?: string;
  email: string;
  password: string;
}

export interface LoginEmployeeResponseDto {
  name: string;
  country: string;
  first_login: boolean;
  token: string;
}
