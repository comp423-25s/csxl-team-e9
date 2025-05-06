import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IFService {
  private apiUrl = '/api/coworking/gittogether/';
  constructor(private http: HttpClient) {}
  generate_answers(
    one: number,
    two: number,
    three: number,
    four: number,
    five: number,
    pid: number
  ): void {
    this.http
      .post<IFService>(this.apiUrl, {
        one: one,
        two: two,
        three: three,
        four: four,
        five: five,
        pid: pid
      })
      .subscribe((x) => console.log(x));
  }
}
