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
