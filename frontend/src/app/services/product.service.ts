import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/products';
  private categoryUrl = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) {}

  getProductsList(categoryId: number): Observable<Product[]> {
    const url = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}&size=100`;

    return this.httpClient
      .get<GetResponse>(url)
      .pipe(map((response) => response._embedded.products));
  }

  getProductCategoryList(): Observable<ProductCategory[]> {
    return this.httpClient
      .get<GetProductCategoryResponse>(this.categoryUrl)
      .pipe(map((response) => response._embedded.description));
  }
}

interface GetResponse {
  _embedded: { products: Product[] };
}

interface GetProductCategoryResponse {
  _embedded: {
    description: ProductCategory[];
  };
}
