import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';

export interface Client {
  id?: number;
  prenom: string;
  nom: string;
  pseudo: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth/login';

  currentUser = signal<Client | null>(null);

  constructor(private http: HttpClient) {
    const savedUser = typeof localStorage !== 'undefined' ? localStorage.getItem('currentUser') : null;
    if (savedUser) {
      this.currentUser.set(JSON.parse(savedUser));
    }
  }

  login(credentials: { pseudo: string; motDePasse: string }): Observable<Client> {
    return this.http.post<Client>(this.apiUrl, credentials).pipe(
      tap(client => {
        this.currentUser.set(client);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('currentUser', JSON.stringify(client));
        }
      }),
      catchError(error => throwError(() => new Error('Identifiants invalides')))
    );
  }

  logout() {
    this.currentUser.set(null);
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('currentUser');
    }
  }
}
