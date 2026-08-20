import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { CV, Education, Language, WorkExperience } from '../interfaces/cv.interfaces';

@Injectable({
  providedIn: 'root',
})
export class CvService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  /* GET CURRICULUM */
  getCV() {
    return this.http.get<CV>(`${this.apiUrl}/aspirant/cv`);
  }

  /* WORK EXPERIENCE */
  createWorkExperience(body: WorkExperience[]) {
    return this.http.post(`${this.apiUrl}/central/work-experiences`, body);
  }
  updateWorkExperience(body: WorkExperience, id: number) {
    return this.http.patch(`${this.apiUrl}/central/work-experiences/${id}`, body);
  }

  /* EDUCATION */
  createEducation(body: Education[]) {
    return this.http.post(`${this.apiUrl}/central/educations`, body);
  }
  updateEducation(body: Education, id: number) {
    return this.http.patch(`${this.apiUrl}/central/educations/${id}`, body);
  }

  /* SKILLS */
  postSkills(skills: string[]) {
    const body = { skills };
    return this.http.post(`${this.apiUrl}/aspirant/skills`, body);
  }
  deleteSkills(skill: string) {
    const body = { skills: [skill] };
    return this.http.delete(`${this.apiUrl}/aspirant/skills`, { body });
  }

  /* LANGUAGES */
  postLanguages(body: Language[]) {
    return this.http.post(`${this.apiUrl}/aspirant/languages`, body);
  }
  patchLanguage({ name, level }: Language) {
    const params = new HttpParams().set('name', name).set('level', level);

    return this.http.patch(`${this.apiUrl}/aspirant/languages`, null, { params });
  }
  deleteLanguages(body: Language[]) {
    return this.http.delete(`${this.apiUrl}/aspirant/languages`, { body });
  }
}
