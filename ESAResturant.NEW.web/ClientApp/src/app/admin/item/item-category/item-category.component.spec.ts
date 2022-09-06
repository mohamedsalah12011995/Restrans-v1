import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { ItemCategoryComponent } from './item-category.component';

let component: ItemCategoryComponent;
let fixture: ComponentFixture<ItemCategoryComponent>;

describe('ItemCategory component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ItemCategoryComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(ItemCategoryComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});
