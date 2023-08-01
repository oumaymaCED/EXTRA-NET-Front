import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesInvoicesdetailsComponent } from './sales-invoicesdetails.component';

describe('SalesInvoicesdetailsComponent', () => {
  let component: SalesInvoicesdetailsComponent;
  let fixture: ComponentFixture<SalesInvoicesdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesInvoicesdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesInvoicesdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
