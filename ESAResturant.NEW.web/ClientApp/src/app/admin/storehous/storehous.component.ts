import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../Shared/Components/header/header.component';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-storehous',
  templateUrl: './storehous.component.html',
  styleUrls: ['./storehous.component.css']
})
export class StorehousComponent implements OnInit {

  currentLang: string = "";
  pageTitle: string = "";

  constructor(private titleService: Title, public translate: TranslateService) {

    this.currentLang = translate.currentLang;
    this.changeTitle(this.currentLang);

  }

  ngOnInit() {
  }

  changeTitle(language) {
    if (language == 'ar') {
      this.pageTitle = "المخزن";
      this.titleService.setTitle(this.pageTitle);
    }
    if (language == 'en') {
      this.pageTitle = "Store House";
      this.titleService.setTitle(this.pageTitle);
    }
  }

  
}
