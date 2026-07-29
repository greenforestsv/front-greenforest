export interface Representative {
  dni: string;
  first_name: string;
  second_name?: string;
  first_surname: string;
  second_surname?: string;
  birth_date: Date;
  gender: 'M' | 'F' | 'U';
  email: string;
  phone: string;
  country: string;
  department: string;
  profession?: string;
  address?: string;
  carnet?: string;
}

export interface SignupTenantDto {
  tenant_name: string;
  tenant_email: string;
  phone: string;
  cell_phone?: string;
  tenant_alternative_email?: string;
  description?: string;
  approach: string[];
  is_multinational: boolean;
  locations: string[];
  url_profile_photo?: string;
  database_host?: string;
  is_isolate?: string;
  have_carnets: boolean;
  representative: Representative;
}
