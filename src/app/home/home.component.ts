import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class HomeComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      pseudo: ['', [Validators.required, Validators.minLength(3)]],
      motDePasse: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/
          )
        ]
      ]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Connexion avec :', this.loginForm.value);

    }
  }
}
