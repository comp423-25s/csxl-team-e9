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

  get_matches(clas: string, pid: number): Observable<any> {
    const params = new HttpParams().set('clas', clas).set('pid', pid);
    return this.http.get<MatchesService>(this.apiUrl, {
      params
    });
  }

  get_new_matches(clas: string, pid: number): Observable<any> {
    const params = new HttpParams().set('clas', clas).set('pid', pid);
    return this.http.get<MatchesService>(this.newMatchapiURL, {
      params
    });
  }

  deleteSpecificAnswer(pid: number, clas: string): Observable<any> {
    return this.http.delete(`${this.deleteURL}/del${pid}/${clas}`);
  }

  deleteMatch(pid1: number, pid2: number, clas: string): any {
    const params = new HttpParams()
      .set('pid', pid1)
      .set('clas', clas)
      .set('pid_two', pid2);
    let returnVal;
    this.http
      .delete(`${this.deleteURL}/del/studentmatch`, { params })
      .subscribe((x) => {
        returnVal = x;
      });
    return returnVal;
  }
}
