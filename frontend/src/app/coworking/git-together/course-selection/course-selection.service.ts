import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {
  private apiUrl = 'http://localhost:1560/api/coworking/gittogether';
  constructor(private http: HttpClient) {}

  async getCourses() {
    try {
      const response = await this.http.get(`${this.apiUrl}/courses`);
      return response;
    } catch (error) {
      console.error('Error fetching courses:', error);
      return [];
    }
  }

  async deleteCourse(clas: string) {
    try {
      const response = await this.http.delete(
        `${this.apiUrl}/courses/delete/${clas}`
      );
      console.log('Course deleted successfully:', response);
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  }

  async getPid() {
    const token = localStorage.getItem('bearerToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<{ pid: number }>(`${this.apiUrl}/authenticated_pid`, {
      headers
    });
  }
}
