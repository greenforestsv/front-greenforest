import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { GetCountryDto } from '../interfaces/catalogos.interfaces';

@Injectable({
  providedIn: 'root',
})
export class CatalogosService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  /* GET REGIONS */
  getRegions() {
    return this.http.get(`${this.apiUrl}/regions/list`);
  }
  /* GET COUNTRIES */
  getCountries() {
    return this.http.get<GetCountryDto[]>(`${this.apiUrl}/countries/list`);
  }
  /* GET STATES */
  getStates() {
    return this.http.get(`${this.apiUrl}/states/list`);
  }
}
