import { Component, OnInit, TemplateRef } from '@angular/core';
import { PeopleCategory } from '../Models/peopleCategory';
import { People } from '../Models/people';
import { DatePipe } from '@angular/common';
import { peopleService } from '../people.service';
import { ToastWrapperService } from '../../Shared/toast-wrapper.service';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from '../../date.adapter';
import { HomeService } from '../../home.service';
import { Title } from '@angular/platform-browser';
import { SettingsService } from '../../Shared/settings.service';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { AuthService } from '../../../Shared/Services/auth.service';
import { ModalOptions, BsModalService, BsModalRef } from 'ngx-bootstrap';


@Component({
	selector: 'app-peoples',
	templateUrl: './peoples.component.html',
	styleUrls: ['./peoples.component.css'],
  providers: [peopleService, DatePipe, HomeService, SettingsService,
		{
			provide: DateAdapter, useClass: AppDateAdapter
		},
		{
			provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
		}]
})
export class PeoplesComponent implements OnInit {

	//disabled = false;
	myDate: any;
	CategoryID: any;
	PeopleID: any;
	_ListPeopleType: any = [];
	_ListPeopleCat: any = [];
	_ListPeople: People[] = [];
	bsConfig: any;

	_SearchListPeople: People[] = [];

	_Clear: any = [];
  modalRef: BsModalRef;

	chk_active: any;
	chk_Remember: any;
	// dateTime: any = Date;

	people: People;
	cat: PeopleCategory;
	//pageTitle: string = "ادارة العملاء";
  minDate: Date = new Date();
  currentLang: string = '';
  pageTitle: string = "";

  constructor(private peopleservice: peopleService, private datepip: DatePipe, public TosterService: ToastWrapperService, private homeServe: HomeService,
    private titleService: Title, private _location: Location, public settings: SettingsService,
    public translate: TranslateService, public authService: AuthService, private modalService: BsModalService) {

    this.currentLang = this.authService.getCurrentLang();
    this.translate.use(this.currentLang);
    this.changeTitle(this.currentLang);

		this.people = new People();
		this.cat = new PeopleCategory();
		this.bsConfig = Object.assign({}, { containerClass: "theme-red" });
		//this.titleService.setTitle(this.pageTitle);

	}

	ngOnInit() {
		//this.titleService.setTitle(this.pageTitle);

		this.myDate = this.datepip.transform(new Date(), 'yyyy-MM-dd');
		// this.myDate = new Date().getFullYear();
		this.GetAllPeopleTypes();
		this.GetAllPeopleCategories()
		this.GetAllPeople();
  }
  navigateBack() {
    this._location.back();
  }


  changeTitle(language) {
    if (language == 'ar') {
      this.pageTitle = "العملاء والموردين";
      this.titleService.setTitle(this.pageTitle);
    }
    if (language == 'en') {
      this.pageTitle = "Customers and Suppliers";
      this.titleService.setTitle(this.pageTitle);
    }
  }

	EventDate(value) {
		this.myDate = value;
	}
	isNotActiveChange(values: any) {
		this.chk_active = values.currentTarget.checked;
	}
	isRemember(values: any) {
		// this.chk_Remember = values.currentTarget.checked;
	}

	Clear() {
		//Clear People
		this.people = new People();
		this.chk_Remember = null;
		this.chk_active = null;
    this.myDate = this.datepip.transform(new Date(), 'yyyy-MM-dd');

	}


	GetAllPeopleTypes() {
		this.peopleservice.getAllPeopleTypes().subscribe(
			peopleTypes => {
				if (print != null) {
					this._ListPeopleType = peopleTypes;
				}
				// this.countryId=5;
			},
			error => console.log(error)
		);
	}




	GetAllPeopleCategories() {
		this.peopleservice.getAllPeopleCategories().subscribe(
			peoplecategoris => {
				if (print != null) {
					this._ListPeopleCat = peoplecategoris;
				}
				// this.countryId=5;
			},
			error => console.log(error)
		);
	}






  InsertOrUpdatePeople(type) {
    if (this.people.name === '' || this.people.phone === '') {
      this.TosterService.ErrorToaster.next('من فضلك أكمل (البيانات)');
      return;
    }
    if (this.people.peopleCategoryId == 0) {
      this.TosterService.ErrorToaster.next('من فضلك اختر (التصنيف)');
    }
    else if (this.people.peopleTypeId == 0) {
      this.TosterService.ErrorToaster.next('من فضلك اختر (عميل - مورد)');
    }
    else {

      this.people.rememberDate = this.myDate;
      //this.people.isNotActive = this.chk_active;
      //this.people.isRemember = this.chk_Remember;
      this.people.isDelete = false;

      if (type == 'add') {
        for (var i = 0; i < this._ListPeople.length; i++) {
          this._ListPeople[i]['PeopleName'];
          if (this.people.name === this._ListPeople[i].name) {
            let msg = this.translate.get("Messages.PEOPLEEXIST").subscribe(msg => {
              this.TosterService.ErrorToaster.next(msg);
            });
            return;
          }
        }

        this.peopleservice.InsertOrUpdatePeople(this.people).subscribe(data => { this.GetAllPeople() });
        let msg = this.translate.get("Messages.SavedSucsses").subscribe(msg => {
          this.TosterService.SucssesToaster.next(msg);
        });
        this.Clear();
      }

      if (type == 'edit') {
        this.peopleservice.InsertOrUpdatePeople(this.people).subscribe(data => { this.GetAllPeople() });
        let msg = this.translate.get("Messages.UpdatedSucsses").subscribe(msg => {
          this.TosterService.SucssesToaster.next(msg);
        });
      }
    }
  }


	GetAllPeople() {
		this.peopleservice.getAllPeoples().subscribe(
			peoples => {
				if (print != null) {
					this._ListPeople = peoples;
					this._SearchListPeople = peoples;
				}
				// this.countryId=5;
			},
			error => console.log(error)
		);
	}



  //DeletePeople(id: number) {
  //  if (confirm("هل تريد تأكيد الحذف ؟")) {
  //    //this.server.EditPeople(id, p).subscribe(data => { this.GetAllPeople(); });
  //    this.peopleservice.deletePeople(id).subscribe(data => {
  //      let msg = this.translate.get("Messages.UpdatedSucsses").subscribe(msg => {
  //        this.TosterService.SucssesToaster.next(msg);
  //      });
  //      this.GetAllPeople();
  //      this.Clear();
  //    });
  //  }
  //}


	GetPeopleByid(p: People) {
		this.people = new People();
		this.people = p;
		//this.chk_Remember = p.isRemember;
		//this.chk_active = p.isNotActive;
	}



	//Serch items

	Serchpeople(name) {

		//console.log(name);
		if (name == null) {
			this._SearchListPeople = this._ListPeople;
		}
		else {
			this._SearchListPeople = this._ListPeople.filter(f => f.name.toLowerCase().includes(name.toLowerCase()));
		}
	}


  deletePeopleConfirm() {
    this.modalRef.hide();
    this.deletepeople(this.people.id)
  }


  deletePeople(template: TemplateRef<any>, people: any) {
    this.modalRef = this.modalService.show(template, <ModalOptions>{ class: 'modal-sm' });
    this.people = people;
  }

  deletepeople(id: number) {
    this.peopleservice.deletePeople(id).subscribe(data => {
      let msg = this.translate.get("Messages.DeletedSucsses").subscribe(msg => {
        this.TosterService.SucssesToaster.next(msg);
      });
      this.GetAllPeople();
      this.Clear();
    });

  }

}
