import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { ReportCustomerComponent } from './report-customer.component';

let component: ReportCustomerComponent;
let fixture: ComponentFixture<ReportCustomerComponent>;

describe('ReportCustomer component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ReportCustomerComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(ReportCustomerComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});
