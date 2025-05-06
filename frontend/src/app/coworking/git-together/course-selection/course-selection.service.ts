import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseSelectionService {
  private apiUrl = '/api/coworking/gittogether/student/courses';
  constructor(private http: HttpClient) {}

  get_courses(pid: number): Observable<any> {
    const params = new HttpParams().set('pid', pid);
    return this.http.get<CourseSelectionService>(this.apiUrl, {
      params
    });
  }
}
