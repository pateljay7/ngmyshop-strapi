import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/shared/services/order.service';
import { environment } from 'src/environments/environment';
export interface OrderDetails {
  id: number;
  attributes: Attributes;
}
export interface Attributes {
  orderDateTime: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  product?: ProductEntity[] | null;
  transaction: Transaction;
  status: string;
  email: string;
  shippingAddress: string;
  mobile: string;
  receiverName: string;
  estimatedDeliveryDate: string;
  deliveredOn?: null;
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
export interface Transaction {
  id: string;
  url?: null;
  mode: string;
  locale?: null;
  object: string;
  status: string;
  consent?: null;
  created: number;
  invoice?: null;
  ui_mode: string;
  currency: string;
  customer?: null;
  livemode: boolean;
  metadata: MetadataOrPaymentMethodOptions;
  cancel_url: string;
  expires_at: number;
  custom_text: CustomText;
  submit_type?: null;
  success_url: string;
  amount_total: number;
  payment_link?: null;
  setup_intent?: null;
  subscription?: null;
  automatic_tax: AutomaticTax;
  client_secret?: null;
  custom_fields?: null[] | null;
  shipping_cost?: null;
  total_details: TotalDetails;
  customer_email?: null;
  payment_intent: string;
  payment_status: string;
  recovered_from?: null;
  amount_subtotal: number;
  after_expiration?: null;
  customer_details: CustomerDetails;
  invoice_creation: InvoiceCreation;
  shipping_details?: null;
  shipping_options?: null[] | null;
  customer_creation: string;
  consent_collection?: null;
  client_reference_id?: null;
  currency_conversion?: null;
  payment_method_types?: string[] | null;
  allow_promotion_codes?: null;
  payment_method_options: MetadataOrPaymentMethodOptions;
  phone_number_collection: PhoneNumberCollection;
  payment_method_collection: string;
  billing_address_collection?: null;
  shipping_address_collection?: null;
  payment_method_configuration_details: PaymentMethodConfigurationDetails;
}
export interface MetadataOrPaymentMethodOptions {}
export interface CustomText {
  submit?: null;
  after_submit?: null;
  shipping_address?: null;
  terms_of_service_acceptance?: null;
}
export interface AutomaticTax {
  status?: null;
  enabled: boolean;
  liability?: null;
}
export interface TotalDetails {
  amount_tax: number;
  amount_discount: number;
  amount_shipping: number;
}
export interface CustomerDetails {
  name: string;
  email: string;
  phone?: null;
  address: Address;
  tax_ids?: null[] | null;
  tax_exempt: string;
}
export interface Address {
  city?: null;
  line1?: null;
  line2?: null;
  state?: null;
  country: string;
  postal_code?: null;
}
export interface InvoiceCreation {
  enabled: boolean;
  invoice_data: InvoiceData;
}
export interface InvoiceData {
  footer?: null;
  issuer?: null;
  metadata: MetadataOrPaymentMethodOptions;
  description?: null;
  custom_fields?: null;
  account_tax_ids?: null;
  rendering_options?: null;
}
export interface PhoneNumberCollection {
  enabled: boolean;
}
export interface PaymentMethodConfigurationDetails {
  id: string;
  parent?: null;
}

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit {
  orderDetails: OrderDetails | null = null;
  URL: string = '';
  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute
  ) {
    this.URL = environment.BASE_URL;
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((data: any) => {
      this.orderService.fetchCompleteOrderDetail(data.params['id']).subscribe({
        next: (res: any) => {
          if (res) this.orderDetails = res['data'];
        },
      });
    });
  }
}
