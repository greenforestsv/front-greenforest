export interface CV {
  name: string;
  profession: string;
  location: string;
  email: string;
  phone?: string;
  description?: string;
  education?: Education[];
  work_experiences?: WorkExperience[];
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
  title?: string;
  start_date?: string;
  end_date?: string;
  company?: string;
  activities?: string[];
}

export interface Language {
  name?: string;
  level: string;
}
