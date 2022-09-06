import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { reportTodayComponent } from './report-today.component';

let component: reportTodayComponent;
let fixture: ComponentFixture<reportTodayComponent>;

describe('reportToday component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ reportTodayComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(reportTodayComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});
