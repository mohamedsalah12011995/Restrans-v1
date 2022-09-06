import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportApplicationComponent } from './report-application.component';

describe('ReportApplicationComponent', () => {
  let component: ReportApplicationComponent;
  let fixture: ComponentFixture<ReportApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
