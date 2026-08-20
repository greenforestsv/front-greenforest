import { Language } from '../../core/interfaces/cv.interfaces';

export interface PublicAspirant {
  id: string;
  first_name?: string;
  second_name?: string;
  first_surname?: string;
  second_surname?: string;
  profile_photo?: string;
  skills: string[];
  languages: Language[];
  profession: string;
  country: { name: string; ISO: string };
  department?: { name: string; id: number };
  description: string;
  address?: string;
  dni?: string;
  birth_date?: Date;
  gender?: string;
  email?: string;
  phone?: string;
}

export interface PrivateAspirant extends PublicAspirant {
  dni?: string;
  birth_date?: Date;
  gender?: string;
  email?: string;
  phone?: string;
}

export interface PatchAspirantDto {
  dni?: string;
  first_name?: string;
  second_name?: string;
  first_surname?: string;
  second_surname?: string;
  birth_date?: string;
  gender?: string;
  email?: string;
  phone?: string;
  country?: string;
  department?: number;
  profession?: string;
  address?: string;
  description?: string;
  profile_photo?: string;
  skills?: string[];
}

export interface FilterAspirantListDto {
  name?: string;
  profession?: string;
  skills?: string[];
}

export interface GetAspirantListDto {
  id: string;
  name: string;
  profile_photo: string;
  profession: string;
  skills: string[];
  country: string;
  is_verified: boolean;
  public_profile: boolean;
}
