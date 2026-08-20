export interface Vacante {
  title: string;
  description: string;
  ends_on?: string;
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

export interface VacanteFormDto extends Vacante {
  availability: string;
  level_experience: string;
  contract_type: number;
  department: number;
  format: number;
  processes: number[];
}

export interface GetVacanteDto extends Vacante {
  id: string;
  created_at: string;
  is_new: boolean;
  contract_type: number;
  area: string;
  format: number;
  payment_dates: string;
  status: string;
  department: string;
  original_tenant_id: string;
  normalized_name: string;
  original_job_id?: string;
}

export type CreateVacanteDto = VacanteFormDto;
export type PatchVacanteDto = Partial<VacanteFormDto>;

export interface GetDetalleVacanteDto extends Vacante {
  id: string;
  availability: string;
  contract_type: string;
  department: string;
  format: string;
  level_experience: string;
  processes: number[];
}

export interface FilterJobListDto {
  name?: string;
  department?: number;
  format?: number;
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
