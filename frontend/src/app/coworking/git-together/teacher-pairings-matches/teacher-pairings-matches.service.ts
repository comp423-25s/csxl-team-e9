import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherPairingsService {
  private baseUrl = '/api/coworking/gittogether';
  private pairingsUrl = `${this.baseUrl}/teacher/coursepairings`;
  private deleteURL = `${this.baseUrl}/teacher/del/teacherpairings`;

  constructor(private http: HttpClient) {}

  getTeacherCoursePairings(clas: string): Observable<any> {
    const params = new HttpParams().set('clas', clas);
    return this.http.get<any>(this.pairingsUrl, { params });
  }

  deleteMatches(clas: string): Observable<any> {
    const params = new HttpParams().set('clas', clas);
    return this.http.delete<any>(this.deleteURL, { params });
  }

  deleteSingleMatch(clas: string, pid1: number, pid2: number): Observable<any> {
    const params = new HttpParams()
      .set('clas', clas)
      .set('pid', pid1.toString())
      .set('pid_two', pid2.toString());
    return this.http.delete<any>(`${this.baseUrl}/del/teachermatch`, {
      params
    });
  }
}
