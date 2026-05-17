import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class HomeComponent {
  loginForm: FormGroup;
  errorMessage = signal<string | null>(null);

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      pseudo: ['', [Validators.required]],
      motDePasse: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.errorMessage.set(null);
      this.authService.login(this.loginForm.value).subscribe({
        next: (client) => {
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.errorMessage.set(err.message || 'Erreur de connexion');
        }
      });
    }
  }
}
