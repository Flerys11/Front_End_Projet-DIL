import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, Client } from '../services/auth.service';
import { ProductService, Product } from '../services/product.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currentUser = signal<Client | null>(null);
  productOfTheDay = signal<Product | null>(null);
  imageError = false;

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.authService.currentUser();
    if (!user) {
      this.router.navigate(['/']);
      return;
    }
    this.currentUser.set(user);

    this.productService.getProductOfTheDay().subscribe({
      next: (product) => {
        this.productOfTheDay.set(product);
        this.imageError = false; // Reset error flag when a new product loads
      },
      error: (err) => {
        console.error('Erreur de récupération du produit du jour', err);
      }
    });
  }

  getProductEmoji(libelle: string | undefined): string {
    if (!libelle) return '🎁';
    const lower = libelle.toLowerCase();
    if (lower.includes('chaudron')) return '🏺';
    if (lower.includes('cape')) return '🧥';
    if (lower.includes('anneau')) return '💍';
    return '🎁';
  }

  addToCart(quantity: string): void {
    const qty = parseInt(quantity, 10);
    const product = this.productOfTheDay();
    if (product && qty > 0) {
      alert(`⚔️ Félicitations ! Vous avez ajouté ${qty}x "${product.libelle}" à votre sac à dos d'aventurier !`);
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
