export interface Vacante {
  id: string;
  title: string;
  description: string;
  created_at: Date;
  ends_on: Date;
  is_new: boolean;
  min_salary: number;
  max_salary: number;
  workday_type: string;
  workday: string[];
  contract_type: string;
  area: string;
  format: string;
  payment_dates: string;
  skills: string[];
  tools: string[];
  requirements: string[];
  status: string;
  department: string;
  payment_form: string;
  original_tenant_id: string;
  normalized_name: string;
  original_job_id?: string;
  vehicle?: boolean;
  number_of_vacancies: number;
}

export interface VacantesResponse {
  qty: number;
  data: Vacante[];
}
