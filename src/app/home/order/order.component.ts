import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';
import { environment } from 'src/environments/environment';
export interface Order {
  id: number;
  attributes: Attributes;
}
export interface Attributes {
  status: string;
  estimatedDeliveryDate: string;
  deliveredOn?: null;
  product?: ProductEntity[] | null;
  counter: number;
}
export interface ProductEntity {
  id: number;
  product: Product;
  quantity: number;
}
export interface Product {
  id: number;
  size?: null;
  slug: string;
  color: string;
  image: Image;
  price: number;
  title: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  description?: null;
  publishedAt: string;
  availableQty: number;
}
export interface Image {
  id: number;
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  size: number;
  width: number;
  height: number;
  caption?: null;
  formats: Formats;
  provider: string;
  createdAt: string;
  updatedAt: string;
  folderPath: string;
  previewUrl?: null;
  alternativeText?: null;
  provider_metadata?: null;
}
export interface Formats {
  large: LargeOrSmallOrMediumOrThumbnail;
  small: LargeOrSmallOrMediumOrThumbnail;
  medium: LargeOrSmallOrMediumOrThumbnail;
  thumbnail: LargeOrSmallOrMediumOrThumbnail;
}
export interface LargeOrSmallOrMediumOrThumbnail {
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
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  orderList: Order[] = [];
  URL: string = '';
  constructor(private orderService: OrderService) {
    this.URL = environment.BASE_URL;
  }

  ngOnInit(): void {
    this.orderService.fetchOrder().subscribe({
      next: (res: any) => {
        this.orderList = res['data'];
      },
    });
  }
}
