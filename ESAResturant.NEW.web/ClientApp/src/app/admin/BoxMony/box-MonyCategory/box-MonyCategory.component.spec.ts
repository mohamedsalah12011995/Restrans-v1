import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxMonyCategoryComponent } from './box-MonyCategory.component';

describe('ReportApplicationComponent', () => {
  let component: BoxMonyCategoryComponent;
  let fixture: ComponentFixture<BoxMonyCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxMonyCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxMonyCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
