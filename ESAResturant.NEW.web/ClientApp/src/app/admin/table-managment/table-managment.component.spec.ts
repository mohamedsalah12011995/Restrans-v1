import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableManagmentComponent } from './table-managment.component';

describe('TableManagmentComponent', () => {
  let component: TableManagmentComponent;
  let fixture: ComponentFixture<TableManagmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableManagmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
