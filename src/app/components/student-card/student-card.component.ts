import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Student } from '../../models/student';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'li[student-card]',
  imports: [RouterLink, DatePipe],
  templateUrl: './student-card.component.html',
  styleUrl: './student-card.component.scss'
})
export class StudentCardComponent {
  @Input({required:true, alias: 'student-info'}) student!: Student
}
