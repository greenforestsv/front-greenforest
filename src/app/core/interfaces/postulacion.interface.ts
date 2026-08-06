export interface Postulacion {
  id: string;
  name: string;
  job_title: string;
  original_job_id: string;
  original_tenant_id: string;
  applied_at: Date;
  status: 'A' | 'P' | 'E' | 'O';
}

export interface GetPostulacionCandidatoDto {
  application_id: string;
  applied_at: string;
  central_job: string;
  process: string;
  status: string;
  tenant_normalized_name: string;
  title: string;
}

export interface ApplicationResponseDto {
  name: string;
  job_title: string;
  original_job_id: string;
  original_tenant_id: string;
  id: string;
  applied_at: Date;
}

export interface GetCandidatoDto {
  applied_at: string;
  aspirant_name: string;
  skills?: string[];
  status: string;
  aspirant_id: string;
  profile_photo?: string;
  public_profile: boolean;
}
