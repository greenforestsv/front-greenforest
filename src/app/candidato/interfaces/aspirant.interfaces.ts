export interface PublicAspirant {
  id: string;
  first_name?: string;
  second_name?: string;
  first_surname?: string;
  second_surname?: string;
  profile_photo?: string;
  skills: string[];
  profession: string;
}

export interface PrivateAspirant extends PublicAspirant {
  dni?: string;
  birth_date?: Date;
  gender?: string;
  email?: string;
  phone?: string;
}

export interface PatchAspirantDto {
  first_name: string;
  second_name?: string;
  first_surname: string;
  second_surname?: string;
  birth_date: string;
  gender: string;
  email: string;
  phone: string;
  country: string;
  department: string;
  profession?: string;
  address?: string;
}

export interface FilterAspirantListDto {
  name?: string;
  profession?: string;
  skills?: string[];
}
