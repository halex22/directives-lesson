import { HttpClient } from '@angular/common/http';
import { Injectable  } from '@angular/core';
import { Student } from '../models/student';
import { Observable } from 'rxjs';

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

  createStudent(student: Student) {}

  modifiedStudent(student: Student) {}
}
