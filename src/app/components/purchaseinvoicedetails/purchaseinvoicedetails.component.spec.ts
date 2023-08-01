import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseinvoicedetailsComponent } from './purchaseinvoicedetails.component';

describe('PurchaseinvoicedetailsComponent', () => {
  let component: PurchaseinvoicedetailsComponent;
  let fixture: ComponentFixture<PurchaseinvoicedetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseinvoicedetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseinvoicedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
