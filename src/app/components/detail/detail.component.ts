import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Student } from '../../models/student';
 

@Component({
  selector: 'app-detail',
  imports: [],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent {
  route = inject(ActivatedRoute)
  service = inject(DataService)

  student?: Student

  constructor() {
    const id = this.route.snapshot.paramMap.get('id')!
    this.service.getStudentById(id).subscribe({
      next: data => {
        console.log(data)
        this.student = data
      }
    })
  }
}
