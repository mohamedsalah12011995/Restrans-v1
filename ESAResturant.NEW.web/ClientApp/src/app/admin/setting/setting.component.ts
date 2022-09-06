import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../Shared/Components/header/header.component';
import { PrinterService } from '../item/printer/printer.service';
import { Printer } from '../item/Models/Printer';
import { SettingesService } from './setting.service';
import { ToastWrapperService } from '../Shared/toast-wrapper.service';
import { Setting } from './Models/Setting';

@Component({
	selector: 'app-setting',
	templateUrl: './setting.component.html',
	styleUrls: ['./setting.component.css'],
	providers: [PrinterService, SettingesService]
})
export class SettingComponent implements OnInit {
	Setting: Setting;
	CountrySetting: Setting;
	PrintSetting: Setting;
	EditPriceSetting: Setting;
	EditTaxesSetting: Setting;
	ListPublicSetting: Setting[] = [];
	listPrinter: Printer[] = [];
	print: Printer;
	constructor(public TosterService: ToastWrapperService, private srvPrinter: PrinterService, private srvSetting: SettingesService) {
		this.print = new Printer();
		this.Setting = new Setting();
		this.CountrySetting = new Setting();
		this.PrintSetting = new Setting();
		this.EditPriceSetting = new Setting();
      this.EditTaxesSetting = new Setting();
      this.GetPrinter();
      this.GetSettings();
	}

	ngOnInit() {
		this.HideSlider();
		this.GetPrinter();
		this.GetSettings();
	}

	GetPrinter() {
		this.srvPrinter.All_Print().subscribe(data => this.listPrinter = data);
	}
	GetSettings() {
		this.srvSetting.getAllSetting().subscribe(data => {
			this.CountrySetting = data.find(s=> s.name == 'Country');
			console.log(this.CountrySetting);
			this.PrintSetting = data.find(s=> s.name == 'Print');
			console.log(this.PrintSetting);
			this.EditPriceSetting = data.find(s=> s.name == 'EditPrice');
			console.log(this.EditPriceSetting);
			this.EditTaxesSetting = data.find(s=> s.name == 'EditTaxes');
			console.log(this.EditTaxesSetting);
		});
	}

	AddOrUpdateSetting(type) {
		if (type === 'add') {
			this.CountrySetting.name = 'Country';
			this.PrintSetting.name = 'Print';
			this.EditPriceSetting.name = 'EditPrice';
			this.EditTaxesSetting.name = 'EditTaxes';
			this.ListPublicSetting = [this.CountrySetting, this.PrintSetting, this.EditPriceSetting, this.EditTaxesSetting];
			this.ListPublicSetting.forEach(element => {
				element.isDelete = false;
				this.srvSetting.InsertOrUpdateSetting(element).subscribe(data => {
					this.GetSettings();
				});
				this.TosterService.SucssesToaster.next("تم الحفظ بنجاح");
				this.clear();
			});
		}
	
		if (type === 'edit') {
		  this.srvSetting.InsertOrUpdateSetting(this.Setting).subscribe(data => {
				this.GetSettings();
		  });
		  this.TosterService.SucssesToaster.next("تم التعديل  بنجاح");
		}
	}
	clear(){

	}
	HideSlider() {
		HeaderComponent.prototype.ToggleSidebar('close');
	}
  
}
