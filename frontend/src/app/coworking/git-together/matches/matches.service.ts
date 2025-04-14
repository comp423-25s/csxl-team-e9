import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatchesService {
  private apiUrl = 'http://localhost:1560/api/coworking/gittogether/matches';
  constructor(private http: HttpClient) {}
  async get_matches(clas: string, pid: number): Promise<any> {
    const params = new HttpParams().set('clas', clas).set('pid', pid);
    const data = await firstValueFrom(
      this.http.get<MatchesService>(this.apiUrl, {
        params
      })
    );
    console.log(data);
    return data;
  }
  deleteSpecificAnswer(pid: number, clas: string): Promise<any> {
    return firstValueFrom(
      this.http.delete(`${this.apiUrl}/del/${pid}/${clas}`)
    );
  }
}
