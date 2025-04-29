import { Component, DestroyRef, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Student } from '../../models/student';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
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


}
