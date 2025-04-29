import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Student } from '../../models/student';

@Component({
  selector: 'li[student-card]',
  imports: [RouterLink],
  templateUrl: './student-card.component.html',
  styleUrl: './student-card.component.scss'
})
export class StudentCardComponent {
  @Input({required:true, alias: 'student-info'}) student!: Student
}
