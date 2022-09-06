import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentsItemComponent } from './components-item.component';

describe('ComponentsItemComponent', () => {
  let component: ComponentsItemComponent;
  let fixture: ComponentFixture<ComponentsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentsItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
