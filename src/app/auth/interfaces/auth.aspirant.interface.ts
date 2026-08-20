import { Gender } from '../../shared/pipes/gender.pipe';

export interface SignupCandidatoDto {
  dni: string;
  first_name: string;
  second_name?: string;
  first_surname: string;
  second_surname?: string;
  birth_date: Date;
  gender: Gender;
  email: string;
  phone: string;
  address?: string;
  country: string;
  department: number;
}

export interface SignupCandidatoResponse {
  name: string;
  country: string;
  is_verified: boolean;
  token: string;
}

export interface LoginCandidatoDto {
  user?: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  name: string;
  country: string;
  is_verified: boolean;
  token: string;
}

export interface AspirantJwtPayload {
  id: string;
  iat: number;
  exp: number;
}
