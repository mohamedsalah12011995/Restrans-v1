import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { ItemSizeComponent } from './item-size.component';

let component: ItemSizeComponent;
let fixture: ComponentFixture<ItemSizeComponent>;

describe('ItemSize component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ItemSizeComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(ItemSizeComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});
