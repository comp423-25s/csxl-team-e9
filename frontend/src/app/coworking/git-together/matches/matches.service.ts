import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatchesService {
  private apiUrl = '/api/coworking/gittogether/matches';
  private newMatchapiURL = '/api/coworking/gittogether/new/matches';
  private deleteURL = '/api/coworking/gittogether';
  constructor(private http: HttpClient) {}
  async get_matches(clas: string, pid: number): Promise<any> {
    const params = new HttpParams().set('clas', clas).set('pid', pid);
    const data = await firstValueFrom(
      this.http.get<MatchesService>(this.apiUrl, {
        params
      })
    );
    return data;
  }

  async get_new_matches(clas: string, pid: number): Promise<any> {
    const params = new HttpParams().set('clas', clas).set('pid', pid);
    const data = await firstValueFrom(
      this.http.get<MatchesService>(this.newMatchapiURL, {
        params
      })
    );
    return data;
  }

  async deleteSpecificAnswer(pid: number, clas: string): Promise<any> {
    return firstValueFrom(
      this.http.delete(`${this.deleteURL}/del${pid}/${clas}`)
    );
  }

  async deleteMatch(pid1: number, pid2: number, clas: string): Promise<any> {
    const params = new HttpParams()
      .set('pid', pid1)
      .set('clas', clas)
      .set('pid_two', pid2);
    return firstValueFrom(
      this.http.delete(`${this.deleteURL}/del/studentmatch`, { params })
    );
  }
}
