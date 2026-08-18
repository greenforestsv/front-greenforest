import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import {
  FilterAspirantListDto,
  GetAspirantListDto,
  PatchAspirantDto,
  PrivateAspirant,
  PublicAspirant,
} from '../interfaces/aspirant.interfaces';
import { PaginatedRequest, PaginatedResponse } from '../../core/interfaces/pagination.interface';

@Injectable({
  providedIn: 'root',
})
export class AspirantesService {
  /* CONSTRUCTOR */
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  /* GET ASPIRANTE ME */
  getAspirantMe() {
    return this.http.get<PrivateAspirant>(`${this.apiUrl}/aspirant/profile`);
  }

  /* GET ASPIRANTE PÚBLICO*/
  getPublicAspirant(id: string) {
    return this.http.get<PublicAspirant>(`${this.apiUrl}/aspirant/profile/${id}`);
  }

  /* PATCH APIRANTE */
  patchAspirant(data: PatchAspirantDto) {
    return this.http.patch(`${this.apiUrl}/aspirant/profile`, data);
  }

  /* GET APIRANTES */
  getAspirants({ limit, offset, filters }: PaginatedRequest<FilterAspirantListDto>) {
    let params = new HttpParams().set('limit', limit).set('offset', offset);

    if (filters?.name) {
      params = params.set('name', filters?.name);
    }

    if (filters?.profession) {
      params = params.set('profession', filters?.profession);
    }

    if (filters?.skills?.length) {
      params = params.set('skills', JSON.stringify(filters.skills));
    }

    return this.http.get<PaginatedResponse<GetAspirantListDto>>(`${this.apiUrl}/aspirant/list`, {
      params,
    });
  }
}
