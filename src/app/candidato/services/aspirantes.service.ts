import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { CV, CreateCV } from '../interfaces/cv.interfaces';
import { PatchAspirantDto, PrivateAspirant } from '../interfaces/aspirant.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AspirantesService {
  /* CONSTRUCTOR */
  constructor(private http: HttpClient) {}
  private apiUrl = environment.apiUrl;

  /* GET ASPIRANTE ME */
  getAspirantMe() {
    return this.http.get<PrivateAspirant>(`${this.apiUrl}/aspirant/me`);
  }

  /* GET CURRICULUM */
  getCV() {
    return this.http.get<CV>(`${this.apiUrl}/aspirant/cv`);
  }

  /* PATCH CURRICULUM */
  patchCV(body: CreateCV) {
    return this.http.patch<CV>(`${this.apiUrl}/aspirant/cv`, body);
  }

  /* PATCH APIRANTE */
  patchApirant(data: PatchAspirantDto) {
    return this.http.patch(`${this.apiUrl}/aspirant`, data);
  }
}
