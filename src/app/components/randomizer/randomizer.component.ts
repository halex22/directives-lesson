import { Component } from '@angular/core';
import { Student } from '../../models/student';
import { DataService } from '../../services/data.service';
import { StudentCardComponent } from '../student-card/student-card.component';

@Component({
  selector: 'app-randomizer',
  imports: [StudentCardComponent],
  templateUrl: './randomizer.component.html',
  styleUrl: './randomizer.component.scss'
})
export class RandomizerComponent {

  students: Student[] = []
  private _groupMembers = 2

  constructor(private service: DataService) { }

  ngOnInit(): void {
    this.service.getStudents().subscribe({
      next: data => {
        console.log(data)
        this.students = data
      }, 
      error: err => console.error(err)
    })
  }

  set groupMembers(val: number) {
    if (val > 4) return
    this._groupMembers = val
  }

  randomizeStudents() {
    const availableStudents = structuredClone(this.students)
    let newCouple = []

    while (availableStudents.length) {
      const randomIndex = Math.floor(Math.random() * availableStudents.length)
      const pickedStudent = availableStudents.splice(randomIndex, 1)[0]
      newCouple.push(pickedStudent)
    }
    console.log(newCouple)
    this.students = newCouple
  }
}
