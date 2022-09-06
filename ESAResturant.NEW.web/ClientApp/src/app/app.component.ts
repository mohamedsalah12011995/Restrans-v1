import { Component, ViewContainerRef } from '@angular/core';
import { ToastWrapperService } from './admin/Shared/toast-wrapper.service';
import { ToastsManager } from 'ng6-toastr';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { HeaderComponent } from './admin/Shared/Components/header/header.component';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from './Shared/Services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Resturant';
  currentLang: string = '';

  constructor(public toastr: ToastsManager, public TosterService: ToastWrapperService, vcr: ViewContainerRef,
    public translate: TranslateService, private titleService: Title, public authService: AuthService) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  ngOnInit() {
    this.TosterService.SucssesToaster.subscribe((Message: string) => {
      this.toastr.success(Message, 'Success!');

    });

    this.TosterService.ErrorToaster.subscribe((Message: string) => {

      this.toastr.error(Message, 'Error!');

    });

    this.currentLang = this.authService.getCurrentLang();
    if (this.currentLang == null || undefined) {
      this.currentLang = 'ar';
    }
    this.translate.use(this.currentLang);
    this.rtlLang();

    setTimeout(() => {
      if (this.currentLang == '' || this.currentLang == 'ar') {
        this.titleService.setTitle(' إيزاك للمطاعم ');
      }
      else if (this.currentLang == 'en') {
        this.titleService.setTitle(' Easacc Restaurants ');
      }
    }, 500);




  }

  rtlLang() {
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
