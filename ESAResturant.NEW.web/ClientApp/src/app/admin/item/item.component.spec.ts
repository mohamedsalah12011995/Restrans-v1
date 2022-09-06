
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { ItemComponent } from './item.component';

let component: ItemComponent;
let fixture: ComponentFixture<ItemComponent>;

describe('Item component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ItemComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(ItemComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});
