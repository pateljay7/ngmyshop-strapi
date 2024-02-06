import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}
  URL = 'http://localhost:1337';
  processingOrder = new Subject();

  fetchOrder() {
    return this.http.get(
      `${this.URL}/api/orders?fields[0]=status&fields[1]=estimatedDeliveryDate&fields[2]=deliveredOn&fields[3]=product`
    );
  }
  fetchCompleteOrderDetail(id: string) {
    return this.http.get(`${this.URL}/api/orders/${id}`);
  }

  makePrePaymentForOrder(payload: any) {
    return this.http.post(`${this.URL}/api/transaction/pre-payment`, payload);
  }
  setPrePaymentConfirmation(
    order_id: string,
    cart_id: string,
    session_id: string
  ) {
    return this.http.post(
      `${this.URL}/api/transaction/success`,
      {},
      {
        params: {
          order_id,
          session_id,
          cart_id,
        },
      }
    );
  }
}
