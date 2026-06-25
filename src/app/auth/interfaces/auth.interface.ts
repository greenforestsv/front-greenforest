export interface SignupCandidatoDto {
  email: string;
  password: string;
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
