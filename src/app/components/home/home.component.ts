import { Component, DestroyRef, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Student } from '../../models/student';
import { StudentCardComponent } from '../student-card/student-card.component';

@Component({
  selector: 'app-home',
  imports: [ StudentCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  students: Student[] = []

  constructor(private service: DataService, private destroyRef: DestroyRef) { }

  ngOnInit(): void {
    const subscription = this.service.getStudents().subscribe({
      next: data => {
        console.log(data)
        this.students = data
      },
      error: err => console.error(err)
    })
  }

  orderByName() {
    if (!this.students.length) return  
    this.students = this.students.sort((s1, s2) => s1.name.localeCompare(s2.name))
  }

  orderByAge() {
    if (!this.students.length) return
    this.students = this.students.sort((s1, s2) => {
      const time1 = new Date(s1.dob).getTime()
      const time2 = new Date(s2.dob).getTime()
      return time1 - time2
    })    
  }

}
