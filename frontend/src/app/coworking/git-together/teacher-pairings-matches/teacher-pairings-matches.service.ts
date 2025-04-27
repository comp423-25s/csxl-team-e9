import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherPairingsService {
  private baseUrl = '/api/coworking/gittogether';
  private pairingsUrl = `${this.baseUrl}/teacher/coursepairings`;
  private deleteURL = `${this.baseUrl}/teacher/del/teacherpairings`;

  constructor(private http: HttpClient) {}

  async getTeacherCoursePairings(clas: string): Promise<any> {
    const params = new HttpParams().set('clas', clas);
    try {
      const response = await firstValueFrom(
        this.http.get<any>(this.pairingsUrl, { params })
      );
      return response;
    } catch (error) {
      console.error('Error fetching pairings:', error);
      throw error;
    }
  }

  async deleteMatches(clas: string): Promise<any> {
    const params = new HttpParams().set('clas', clas);
    return firstValueFrom(this.http.delete<any>(this.deleteURL, { params }));
  }

  async deleteSingleMatch(
    clas: string,
    pid1: number,
    pid2: number
  ): Promise<any> {
    const params = new HttpParams()
      .set('clas', clas)
      .set('pid', pid1.toString())
      .set('pid_two', pid2.toString());
    return firstValueFrom(
      this.http.delete<any>(`${this.baseUrl}/del/teachermatch`, { params })
    );
  }
}
