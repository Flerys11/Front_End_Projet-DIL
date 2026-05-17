import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  libelle: string;
  prix: number;
  stock: number;
  isProduitDuJour: boolean;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/api/products/of-the-day';

  constructor(private http: HttpClient) {}

  getProductOfTheDay(): Observable<Product> {
    return this.http.get<Product>(this.apiUrl);
  }
}
