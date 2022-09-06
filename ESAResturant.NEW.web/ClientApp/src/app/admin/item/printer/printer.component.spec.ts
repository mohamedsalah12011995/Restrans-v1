import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { PrinterComponent } from './printer.component';

let component: PrinterComponent;
let fixture: ComponentFixture<PrinterComponent>;

describe('printer component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ PrinterComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(PrinterComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});
