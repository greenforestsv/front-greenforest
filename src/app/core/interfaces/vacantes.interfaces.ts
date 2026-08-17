export interface Vacante {
  title: string;
  description: string;
  ends_on: string;
  min_salary: number;
  max_salary: number;
  workday_type: string;
  workday: string[];
  skills: string[];
  tools: string[];
  requirements: string[];
  payment_form: string;
  number_of_vacancies: number;
  vehicle?: boolean;
}

export interface GetVacanteDto extends Vacante {
  id: string;
  created_at: string;
  is_new: boolean;
  contract_type: string;
  area: string;
  format: string;
  payment_dates: string;
  status: string;
  department: string;
  original_tenant_id: string;
  normalized_name: string;
  original_job_id?: string;
}

export interface GetDetalleVacanteDto {
  id: string;
  title: string;
  availability: string;
  contract_type: string;
  department: string;
  description: string;
  format: string;
  level_experience: string;
  max_salary: string;
  min_salary: string;
  number_of_vacancies: string;
  payment_form: string;
  processes: string[];
  requirements: string[];
  skills: string[];
  tools: string[];
  vehicle: boolean;
  workday: string[];
  workday_type: string;
}

export interface CreateVacanteDto extends Vacante {
  availability: string;
  level_experience: string;

  contract_type: number;
  department: number;
  format: number;
  processes: number[];
}

export interface PatchVacanteDto extends Vacante {
  availability: string;
  level_experience: string;

  contract_type: number;
  department: number;
  format: number;
  processes: number[];
}

export interface FilterJobListDto {
  name?: string;
  department?: string;
  format?: string;
  min_salary?: string;
  max_salary?: string;
}

export interface GetProcesoDto {
  id: number;
  name: string;
  description?: string;
  orden: number;
  fixed: boolean;
  status?: string[];
}
