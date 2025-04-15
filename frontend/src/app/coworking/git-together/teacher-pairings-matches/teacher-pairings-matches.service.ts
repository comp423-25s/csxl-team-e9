import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeacherPairingsService {
  private apiUrl = '/teacher/coursepairings';
  constructor(private http: HttpClient) {}

  async getTeacherCoursePairingsAsync(clas: string): Promise<any> {
    const params = new HttpParams().set('clas', clas);
    return this.http.get<any>(this.apiUrl, { params });
  }
}
