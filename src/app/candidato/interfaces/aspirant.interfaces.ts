export interface PublicAspirant {
  id: string;

  first_name?: string;

  second_name?: string;

  first_surname?: string;

  second_surname?: string;

  profile_photo?: string;
}

export interface PrivateAspirant extends PublicAspirant {
  dni?: string;

  birth_date?: Date;

  gender?: string;

  email?: string;

  phone?: string;
}
