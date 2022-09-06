import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemBuyComponent } from './item-buy.component';

describe('ItemBuyComponent', () => {
  let component: ItemBuyComponent;
  let fixture: ComponentFixture<ItemBuyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemBuyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
