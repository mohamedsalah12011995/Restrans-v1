import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { CompanyInfoComponent } from './CompanyInfo.component';

let component: CompanyInfoComponent;
let fixture: ComponentFixture<CompanyInfoComponent>;

describe('CompanyInfo component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [CompanyInfoComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
      fixture = TestBed.createComponent(CompanyInfoComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});
