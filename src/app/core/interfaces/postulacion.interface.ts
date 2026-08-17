export interface GetPostulacionCandidatoDto {
  applied_at: string;
  id: string;
  job_department: string;
  job_id: string;
  job_title: string;
  process: string;
  status?: string;
  tenant: string;
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
