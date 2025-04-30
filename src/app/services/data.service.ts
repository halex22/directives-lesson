import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable  } from '@angular/core';
import { Student } from '../models/student';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  readonly BASE_URL = 'https://68109d6d27f2fdac2412125c.mockapi.io/'

  constructor(private http: HttpClient) { 
    
  }

  getStudents(): Observable<Student[]> {
    const url = this.BASE_URL + 'students/'
    return this.http.get<Student[]>(url)
  }

  getStudentById(id: string): Observable<Student> {
    const url = this.BASE_URL + 'students/' + id
    return this.http.get<Student>(url)
  }

  deleteStudent(id: string): Observable<any> {
    const url = this.BASE_URL + 'students/' + id
    return this.http.delete<any>(url,  { responseType: 'json', observe: 'response' }).pipe(
      tap((response) => {
        console.log('Status:', response.status);
        console.log('Deleted student:', response.body);
      })
    )
  }

  createStudent(student: Student) {}

  modifiedStudent(id: string, marks: number[]): Observable<Student> {
    const url = this.BASE_URL + 'students/' + id
    return this.http.put<Student>(url, {marks: marks})
  }
}
