import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  private apiUrl = '/api/coworking/gittogether/is-ambassador';
  constructor(private http: HttpClient) {}
  is_ambassador(id: number): Observable<any> {
    const params = new HttpParams().set('id', id);
    return this.http.get(this.apiUrl, {
      params
    });
  }
}
