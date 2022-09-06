import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTaxesComponent } from './report-taxes.component';

describe('ReportTaxesComponent', () => {
  let component: ReportTaxesComponent;
  let fixture: ComponentFixture<ReportTaxesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportTaxesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportTaxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
