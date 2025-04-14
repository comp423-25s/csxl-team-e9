import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {
  private apiUrl = 'http://localhost:1560/api/coworking/gittogether';
  constructor(private http: HttpClient) {}
  async deleteCourse(courseCode: string) {
    try {
      const response = await this.http.delete(
        `${this.apiUrl}/delete_course/${courseCode}`
      );
      console.log('Course deleted successfully:', response);
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  }
  async getCourses() {
    try {
      const response = await this.http.get(`${this.apiUrl}/get_courses`);
      return response;
    } catch (error) {
      console.error('Error fetching courses:', error);
      return [];
    }
  }
}
