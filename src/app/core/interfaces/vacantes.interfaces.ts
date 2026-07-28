export interface Vacante {
  id: number;
  title: string;
  description: string;
  salary_range: string;
  tags: string[];
}

export interface VacantesResponse {
  qty: number;
  data: Vacante[];
}

export interface CrearVacante {
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
}
