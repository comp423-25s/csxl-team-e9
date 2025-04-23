// // teacher-pairings-matches.service.ts
// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { firstValueFrom } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class TeacherPairingsService {
//   private baseUrl = 'http://localhost:1560/api/coworking/gittogether';
//   private pairingsUrl = `${this.baseUrl}/teacher/coursepairings`;

//   constructor(private http: HttpClient) {}

//   async getTeacherCoursePairings(clas: string): Promise<any> {
//     const params = new HttpParams().set('clas', clas);
//     try {
//       const response = await firstValueFrom(
//         this.http.get<any>(this.pairingsUrl, { params })
//       );
//       return response;
//     } catch (error) {
//       console.error('Error fetching pairings:', error);
//       throw error;
//     }
//   }

//   async getAllStudentsInClass(clas: string): Promise<any> {
//     // This would need to be implemented in your backend
//     // You might need to create a new endpoint that returns all students in a class
//     const params = new HttpParams().set('clas', clas);
//     try {
//       const response = await firstValueFrom(
//         this.http.get<any>(`${this.baseUrl}/teacher/students`, { params })
//       );
//       return response;
//     } catch (error) {
//       console.error('Error fetching students:', error);
//       throw error;
//     }
//   }

//   async deleteMatches(clas: string): Promise<any> {
//     const params = new HttpParams().set('clas', clas);
//     return firstValueFrom(this.http.delete<any>(this.pairingsUrl, { params }));
//   }

//   async deleteSingleMatch(clas: string, matchId: number): Promise<any> {
//     const params = new HttpParams()
//       .set('clas', clas)
//       .set('match_id', matchId.toString());
//     return firstValueFrom(this.http.delete<any>(this.pairingsUrl, { params }));
//   }
// }

// teacher-pairings-matches.service.ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherPairingsService {
  private baseUrl = '/api/coworking/gittogether';
  private pairingsUrl = `${this.baseUrl}/teacher/coursepairings`;

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
    return firstValueFrom(this.http.delete<any>(this.pairingsUrl, { params }));
  }

  async deleteSingleMatch(clas: string, matchId: number): Promise<any> {
    const params = new HttpParams()
      .set('clas', clas)
      .set('match_id', matchId.toString());
    return firstValueFrom(this.http.delete<any>(this.pairingsUrl, { params }));
  }
}
