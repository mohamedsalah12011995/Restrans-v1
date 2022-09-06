import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { ItemPriceComponent } from './item-price.component';

let component: ItemPriceComponent;
let fixture: ComponentFixture<ItemPriceComponent>;

describe('itemPrice component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ItemPriceComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(ItemPriceComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});
