export interface Postulacion {
  id: string;
  name: string;
  job_title: string;
  original_job_id: string;
  original_tenant_id: string;
  applied_at: Date;
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
