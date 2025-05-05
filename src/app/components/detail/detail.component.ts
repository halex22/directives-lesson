import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Student } from '../../models/student';
import { DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
 

@Component({
  selector: 'app-detail',
  imports: [DatePipe, ReactiveFormsModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent {
  route = inject(ActivatedRoute)
  service = inject(DataService)
  router = inject(Router)
  authService = inject(AuthService)

  student?: Student

  newMark = new FormControl<number>(0, {
    validators: [Validators.required, Validators.min(0), Validators.max(10)],
  })

  get isMarkInvalid() {
    return  this.newMark.errors
  }

  constructor() {
    const id = this.route.snapshot.paramMap.get('id')!
    this.service.getStudentById(id).subscribe({
      next: data => {
        console.log(data)
        this.student = data
      },
      error: err => {
        console.error(err)
        this.router.navigate(['/'])
      }
    })
  }

  openDialog() {
    const dia = document.getElementById('deleteDialog')! as HTMLDialogElement
    dia.open = true
  }

  processDelete() {
    const id = this.student?.id
    if (!id) return 
    this.service.deleteStudent(id).subscribe({
      next: data =>  {
        if (data) this.router.navigate(['/']) 
      },
      error: err => console.error(err),
    })
  }

  onMarkAdd() {
    const id = this.student?.id
    if (!id) return

    const oldMarks = this.student?.marks ?  [...this.student?.marks ] : []
    const newMarks: number[] = [...oldMarks, this.newMark.value!]

    this.service.modifiedStudent(id, newMarks).subscribe({
      next: modifiedStudent => this.student = modifiedStudent,
      error: err => console.error(err)
    })
    
  }

  editWithFetch(id: string, newMarks: number[]) {
    const url = 'https://68109d6d27f2fdac2412125c.mockapi.io/students/' + id
    fetch(url, {
      method: 'PUT',
      headers: {'content-type':'application/json'},
      body: JSON.stringify({marks: newMarks})
    })
    .then(res => {
      console.log(res)
      return res.json()
    })
    .then(data => this.student = data)
    .catch(err => console.error(err))
  }
}
