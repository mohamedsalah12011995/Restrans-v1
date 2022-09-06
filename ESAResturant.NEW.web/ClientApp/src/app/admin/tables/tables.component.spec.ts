import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { TablesComponent } from './tables.component';

let component: TablesComponent;
let fixture: ComponentFixture<TablesComponent>;

describe('tables component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ TablesComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(TablesComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});
