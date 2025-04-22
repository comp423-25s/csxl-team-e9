import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherPairingsService {
  private baseUrl = 'http://localhost:1560/api/coworking/gittogether/teacher';
  private pairingsUrl = `${this.baseUrl}/coursepairings`;

  constructor(private http: HttpClient) {}

  async getTeacherCoursePairings(clas: string): Promise<any> {
    const params = new HttpParams().set('clas', clas);
    return firstValueFrom(this.http.get<any>(this.pairingsUrl, { params }));
  }

  async deleteMatches(clas: string): Promise<any> {
    const params = new HttpParams().set('clas', clas);
    return firstValueFrom(this.http.delete<any>(this.pairingsUrl, { params }));
  }

  // Optional: Add error handling wrapper
  private async handleRequest<T>(request: Promise<T>): Promise<T> {
    try {
      return await request;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }
}
