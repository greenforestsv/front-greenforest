import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { TenantResponseDto, PatchTenantDto } from '../interfaces/empresa.interface';

@Injectable({
  providedIn: 'root',
})
export class EmpresasService {
  /* CONSTRUCTOR */
  constructor(private http: HttpClient) {}

  apiUrl = environment.apiUrl;

  /* GET EMPRESAS */
  getEmpresas() {
    return this.http.get<TenantResponseDto[]>(`${this.apiUrl}/tenant/list`);
  }

  /* GET EMPRESA ME*/
  getEmpresaMe() {
    return this.http.get<TenantResponseDto>(`${this.apiUrl}/tenant`);
  }

  /* GET EMPRESA ME*/
  patchEmpresa(body: PatchTenantDto) {
    return this.http.patch(`${this.apiUrl}/tenant`, body);
  }
}
