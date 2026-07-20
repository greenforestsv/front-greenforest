export interface CreateCV {
  description?: string;
  profile_photo?: string;
  skills?: string[];
  languages?: Language[];
  educations?: Education[];
  works_experience?: WorkExperience[];
}

export interface CV {
  name: string;
  profession: string;
  location: string;
  email: string;
  phone?: string;
  description?: string;
  education?: Education[];
  works_experience?: WorkExperience[];
  languages?: Language[];
  skills?: string[];
}

export interface Education {
  id: number;
  title: string;
  level: string;
  start_date: string;
  end_date: string;
  educational_center: string;
}

export interface WorkExperience {
  id?: number;
  title: string;
  start_date: string;
  end_date?: string | null;
  company: string;
  area: string;
  activities: string[];
}

export interface Language {
  name?: string;
  level: string;
}
