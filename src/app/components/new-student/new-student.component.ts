import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { countryList } from './contriesArray';
import { IsValidDate } from './dateValidator';
import { FormControlOptions } from '@angular/forms';

const commonValidation: FormControlOptions = {
  validators: [Validators.required, Validators.minLength(4)],
  // updateOn: 'change'
}

@Component({
  selector: 'app-new-student',
  imports: [ReactiveFormsModule],
  templateUrl: './new-student.component.html',
  styleUrl: './new-student.component.scss'
})
export class NewStudentComponent {
  countries = countryList
  
  studentForm = new FormGroup({
    name: new FormControl<string>('', commonValidation),
    surname: new FormControl<string>('', commonValidation),
    nationality: new FormControl<string>(this.countries[0]),
    dob: new FormControl<string>('', {
      validators: [Validators.required, IsValidDate()],
      updateOn: 'change'
    }),
  }, {updateOn: 'submit'})

  showErrors(controlName: string) {
    const control = this.studentForm.get(controlName);
    return control?.invalid && control.touched
  }

  onSubmit() {

    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched(); 
      return;
    }
  }
}
