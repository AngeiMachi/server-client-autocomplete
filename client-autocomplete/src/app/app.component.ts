import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'autocomplete-client';
  apiEndpoint = 'http://localhost:3000/autocomplete';
  form!:FormGroup;
  constructor(private fb: FormBuilder ) {

  }
  ngOnInit(): void {
    this.form = this.fb.group({
      autocomplete: ['', [Validators.required]],
    });
  }

  onOptionSelected(option: string): void {
    console.log('Option selected: ', option);
   
    
  }
  onOptionSelectedForm(option: string): void {

    this.form.patchValue({ autocomplete: option });
    this.form.markAsDirty();
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
    } else {
      console.log('Form invalid');
    }
  }
}


