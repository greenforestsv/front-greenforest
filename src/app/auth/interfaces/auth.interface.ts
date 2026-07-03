export interface SignupCandidatoDto {
  dni: string;
  first_name: string;
  second_name?: string;
  first_surname: string;
  second_surname?: string;
  birth_date: Date;
  gender: 'M' | 'F' | 'U';
  email: string;
  phone: string;
  address?: string;
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
  token: string;
}

export interface JwtPayload {
  id: string;
  iat: number;
  exp: number;
}
