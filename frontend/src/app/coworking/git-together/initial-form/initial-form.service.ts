import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IFService {
  private apiUrl = '';
  constructor(private http: HttpClient) {}
  generate_answers(
    one: number,
    two: number,
    three: number,
    four: number,
    five: number
  ): void {
    this.http
      .post<IFService>(this.apiUrl, {
        one: one,
        two: two,
        three: three,
        four: four,
        five: five
      })
      .subscribe();
  }
}
