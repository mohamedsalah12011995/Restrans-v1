import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportItemsComponent } from './report-items.component';

describe('ReportItemsComponent', () => {
  let component: ReportItemsComponent;
  let fixture: ComponentFixture<ReportItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
