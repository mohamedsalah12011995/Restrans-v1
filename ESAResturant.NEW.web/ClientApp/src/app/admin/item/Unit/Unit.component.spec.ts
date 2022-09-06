import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { UnitComponent } from './Unit.component';

let component: UnitComponent;
let fixture: ComponentFixture<UnitComponent>;

describe('Unit component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ UnitComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(UnitComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});
