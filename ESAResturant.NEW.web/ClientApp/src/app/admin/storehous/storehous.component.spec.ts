import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorehousComponent } from './storehous.component';

describe('StorehousComponent', () => {
  let component: StorehousComponent;
  let fixture: ComponentFixture<StorehousComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorehousComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorehousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
