import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessDenaidComponent } from './access-denaid.component';

describe('AccessDenaidComponent', () => {
  let component: AccessDenaidComponent;
  let fixture: ComponentFixture<AccessDenaidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessDenaidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessDenaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
