import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  private apiUrl = '/api/coworking/gittogether/is-ambassador';
  constructor(private http: HttpClient) {}
  async is_ambassador(id: number): Promise<Boolean> {
    const params = new HttpParams().set('id', id);
    const data = await firstValueFrom(
      this.http.get<Promise<Boolean>>(this.apiUrl, {
        params
      })
    );
    console.log(data);
    return data;
  }
}
