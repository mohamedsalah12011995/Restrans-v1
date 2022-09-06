import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { billInvoiceComponent } from './bill-invoice.component';

let component: billInvoiceComponent;
let fixture: ComponentFixture<billInvoiceComponent>;

describe('BillInvoice component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ billInvoiceComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(billInvoiceComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});
