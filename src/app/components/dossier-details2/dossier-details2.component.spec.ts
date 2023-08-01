import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierDetails2Component } from './dossier-details2.component';

describe('DossierDetails2Component', () => {
  let component: DossierDetails2Component;
  let fixture: ComponentFixture<DossierDetails2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DossierDetails2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DossierDetails2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
