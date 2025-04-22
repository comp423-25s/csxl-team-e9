import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseSelectionService {
  private apiUrl = '/api/coworking/gittogether/student/courses';
  constructor(private http: HttpClient) {}
  async get_courses(pid: number): Promise<any> {
    const params = new HttpParams().set('pid', pid);
    const data = await firstValueFrom(
      this.http.get<CourseSelectionService>(this.apiUrl, {
        params
      })
    );
    console.log(data);
    return data;
  }
}
