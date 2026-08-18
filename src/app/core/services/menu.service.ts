import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { MenuResponse } from '../interfaces/menu.interfaces';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  /* GET MENÚ DE ASPIRANTES */
  getAspirantsMenu() {
    return this.http.get<MenuResponse[]>(`${this.apiUrl}/central/menu`);
  }

  /* GET MENÚ DE EMPRESAS */
  getTenantMenu() {
    return this.http.get<MenuResponse[]>(`${this.apiUrl}/tenant/menu`);
  }
}
