import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';

export interface Product {
  id: number;
  attributes: Attributes;
}
export interface Attributes {
  createdAt: '2024-01-16T03:57:36.804Z';
  updatedAt: '2024-01-17T08:49:19.751Z';
  publishedAt: '2024-01-16T03:59:00.195Z';
  title: 'CB 2';
  slug: 'productCB2';
  description: null;
  category: 'tshirt';
  size: null;
  color: 'white';
  price: 1230;
  availableQty: 10;
  image: null | Image;
  weight: null;
  rating: number;

  // createdAt: string;
  // updatedAt: string;
  // publishedAt: string;
  // title: string;
  // slug: string;
  // description?: string | null;
  // category: string;
  // size?: string | null;
  // color: string;
  // price: number;
  // availableQty: number;
  // image: Image;
}
export interface Image {
  data?: Data | null;
}
export interface Data {
  id: number;
  attributes: Attributes1;
}
export interface Attributes1 {
  name: string;
  alternativeText?: null;
  caption?: null;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: null;
  provider: string;
  provider_metadata?: null;
  createdAt: string;
  updatedAt: string;
}
export interface Formats {
  thumbnail: Thumbnail;
}
export interface Thumbnail {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path?: null;
  size: number;
  width: number;
  height: number;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  constructor(private productService: ProductService) {}
  productList: Product[] = [];
  BASE_URL = this.productService.URL;
  ngOnInit(): void {
    this.productService.fetchProducts().subscribe({
      next: (res: any) => {
        console.log('res', res);
        this.productList = res['data'];
      },
    });
  }
}
