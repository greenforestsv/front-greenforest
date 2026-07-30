export interface Postulacion {
  id: number;
  name: string;
  company: string;
  status: 'A' | 'P' | 'E' | 'O';
}

export interface ApplicationResponseDto {
  name: string;
  job_title: string;
  original_job_id: string;
  original_tenant_id: string;
  id: string;
  applied_at: Date;
}
