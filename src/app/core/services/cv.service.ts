import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { CV, Education, WorkExperience } from '../interfaces/cv.interfaces';

@Injectable({
  providedIn: 'root',
})
export class CvService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  /* POST WORK EXPERIENCE */
  createWorkExperience(body: WorkExperience[]) {
    return this.http.post(`${this.apiUrl}/central/work-experiences`, body);
  }

  /* POST EDUCATION */
  createEducation(body: Education[]) {
    return this.http.post(`${this.apiUrl}/central/educations`, body);
  }

  /* PATCH WORK EXPERIENCE */
  updateWorkExperience(body: WorkExperience, id: number) {
    return this.http.patch(`${this.apiUrl}/central/work-experiences/${id}`, body);
  }

  /* PATCH EDUCATION */
  updateEducation(body: Education, id: string) {
    return this.http.patch(`${this.apiUrl}/central/educations/${id}`, body);
  }

  /* GET CURRICULUM */
  getCV() {
    return this.http.get<CV>(`${this.apiUrl}/aspirant/cv`);
  }
}
