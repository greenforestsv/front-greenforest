import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import {
  TenantResponseDto,
  PatchTenantDto,
  FilterTenantListDto,
} from '../interfaces/empresa.interface';
import { PaginatedResponse, PaginatedRequest } from '../interfaces/pagination.interface';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmpresasService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  /* GET EMPRESAS */
  getEmpresas({ limit, offset, filters }: PaginatedRequest<FilterTenantListDto>) {
    let params = new HttpParams().set('limit', limit).set('offset', offset);

    if (filters?.name) {
      params = params.set('name', filters?.name);
    }

    if (filters?.country?.length) {
      params = params.set('country', JSON.stringify(filters.country));
    }

    if (filters?.approach?.length) {
      params = params.set('approach', JSON.stringify(filters.approach));
    }

    return this.http.get<PaginatedResponse<TenantResponseDto>>(`${this.apiUrl}/tenant/list`, {
      params,
    });
  }

  /* GET EMPRESA ME*/
  getEmpresaMe() {
    return this.http.get<TenantResponseDto>(`${this.apiUrl}/tenant/my-profile`);
  }

  /* GET EMPRESA ME*/
  patchEmpresa(body: PatchTenantDto) {
    return this.http.patch(`${this.apiUrl}/tenant`, body);
  }

  getDetalleEmpresa(id: string) {
    return this.http.get<TenantResponseDto>(`${this.apiUrl}/tenant/detail/${id}`);
  }
}
