import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { MenuResponse } from '../interfaces/menu.interfaces';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  /* CONSTRUCTOR */
  constructor(private http: HttpClient) {}
  private apiUrl = environment.apiUrl;

  /* GET MENÚ DE ASPIRANTES */
  getAspirantsMenu() {
    return this.http.get<MenuResponse[]>(`${this.apiUrl}/menu/aspirants`);
  }
}
