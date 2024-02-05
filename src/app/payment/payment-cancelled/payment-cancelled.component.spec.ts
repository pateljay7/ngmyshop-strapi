import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentCancelledComponent } from './payment-cancelled.component';

describe('PaymentCancelledComponent', () => {
  let component: PaymentCancelledComponent;
  let fixture: ComponentFixture<PaymentCancelledComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentCancelledComponent]
    });
    fixture = TestBed.createComponent(PaymentCancelledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
