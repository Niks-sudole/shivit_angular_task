import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Company } from '../model/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyserviceService {

  private baseUrl = 'http://localhost:8080/api/company';

  constructor(private http: HttpClient) {}

  getCompanies(page: number, size: number): Observable<any> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<any>(this.baseUrl, { params });
  }

  saveCompany(company: Company): Observable<Company> {
    return this.http.post<Company>(this.baseUrl, company);
  }

  updateCompany(id: number, company: Company): Observable<Company> {
    return this.http.put<Company>(`${this.baseUrl}/${id}`, company);
  }
}
