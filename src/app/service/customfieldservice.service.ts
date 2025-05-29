import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CustomField } from '../model/customfield';

@Injectable({
  providedIn: 'root'
})
export class CustomfieldserviceService {

  private baseUrl = 'http://localhost:8080/api/custom-fields/module';

  constructor(private http: HttpClient) {}

  getCustomFields(moduleId: number): Observable<CustomField[]> {
    return this.http.get<CustomField[]>(`${this.baseUrl}/${moduleId}`);
  }
}
