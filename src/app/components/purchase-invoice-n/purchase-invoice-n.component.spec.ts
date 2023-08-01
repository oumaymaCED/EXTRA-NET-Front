import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseInvoiceNComponent } from './purchase-invoice-n.component';

describe('PurchaseInvoiceNComponent', () => {
  let component: PurchaseInvoiceNComponent;
  let fixture: ComponentFixture<PurchaseInvoiceNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseInvoiceNComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseInvoiceNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
