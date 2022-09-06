import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { TaxesComponent } from './Taxes.component';

let component: TaxesComponent;
let fixture: ComponentFixture<TaxesComponent>;

describe('Taxes component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ TaxesComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(TaxesComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});
