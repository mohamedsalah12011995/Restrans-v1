import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Title } from '@angular/platform-browser';
import { document } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import { AuthService } from '../Shared/Services/auth.service';
import { SettingsService } from './Shared/settings.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [HomeService]
})
export class AdminComponent implements OnInit {
  public href: string = "";
  currentLang: string = '';
  _namePage: string;
  showrqustnumber: boolean = false;
  constructor(private titleService: Title, private router: Router, public authService: AuthService, private setting: SettingsService) { }

  ngOnInit() {
    this.href = this.router.url;
    this.rtlLang()
  }

  rtlLang() {
    this.currentLang = this.authService.getCurrentLang();
    if (this.currentLang == 'ar') {
      document.getElementById('theme').setAttribute('href', '');
      document.querySelector('body').setAttribute('dir', 'rtl');
    }
    else if (this.currentLang == 'en') {
      document.getElementById('theme').setAttribute('href', 'assets/css/style-en.css');
      document.querySelector('body').setAttribute('dir', 'ltr');
    }
  }

  
}
