import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { CV } from '../interfaces/cv.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AspirantesService {
  /* CONSTRUCTOR */
  constructor(private http: HttpClient) {}
  private apiUrl = environment.apiUrl;

  /* GET CURRICULUM */
  getCV() {
    return this.http.get<CV>(`${this.apiUrl}/aspirant/cv`);
  }
}
