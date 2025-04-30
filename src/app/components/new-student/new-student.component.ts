import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { countryList } from './contriesArray';

@Component({
  selector: 'app-new-student',
  imports: [ReactiveFormsModule],
  templateUrl: './new-student.component.html',
  styleUrl: './new-student.component.scss'
})
export class NewStudentComponent {
  countries = countryList
  
  studentForm = new FormGroup({
    name: new FormControl<string>('', {
      validators: [Validators.required, Validators.min(4)]
    }),
    surname: new FormControl<string>('', {
      validators: [Validators.required, Validators.min(4)]
    }),
    nationality: new FormControl<string>(this.countries[0], {
      validators: [Validators.required, Validators.min(4)]
    }),
    dob: new FormControl<string>('', {
      validators: [Validators.required]
    }),

  })
  
  showErrors = false

  // isControlInvalid(controlName: string) {
  //   const control = this.studentForm.get(controlName) as AbstractControl
  //   console.log(control)
  //   return control.dirty && control.touched && control.errors
  // }

  onSubmit() {
    console.log(this.studentForm)
    for (const control in this.studentForm.controls) {
      if (Object.prototype.hasOwnProperty.call(this.studentForm.controls, control)) {
        const element = this.studentForm.get(control);
        if (element?.errors) this.showErrors = true
      }
    }
  }
}
