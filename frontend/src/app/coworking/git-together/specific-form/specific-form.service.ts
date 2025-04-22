import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SFService {
  private apiUrl = '/api/coworking/gittogether/specific';
  constructor(private http: HttpClient) {}
  generate_response(
    value: String,
    pid: number,
    contact_info: String,
    clas: String,
    first_name: String
  ): void {
    this.http
      .post<SFService>(this.apiUrl, {
        value: value,
        pid: pid,
        contact_info: contact_info,
        clas: clas,
        first_name: first_name
      })
      .subscribe((x) => console.log(x));
  }
}
