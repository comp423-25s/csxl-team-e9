import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherPairingsService {
  private apiUrl =
    'http://localhost:1560/api/coworking/gittogether/teacher/coursepairings';
  constructor(private http: HttpClient) {}
}
