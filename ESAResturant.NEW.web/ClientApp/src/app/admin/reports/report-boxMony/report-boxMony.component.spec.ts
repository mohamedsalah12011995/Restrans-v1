import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportBoxMonyComponent } from './report-boxMony.component';

describe('ReportApplicationComponent', () => {
  let component: ReportBoxMonyComponent;
  let fixture: ComponentFixture<ReportBoxMonyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportBoxMonyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportBoxMonyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
