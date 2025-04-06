import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatchesService {
  private apiUrl = 'http://localhost:1560/api/coworking/gittogether/matches';
  constructor(private http: HttpClient) {}
  get_matches(clas: string, pid: number): Observable<any> {
    const params = new HttpParams().set('clas', clas).set('pid', pid);
    return this.http.get<MatchesService>(this.apiUrl, {
      params
    });
  }
}
