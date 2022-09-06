import { Component, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { HomeService } from '../../../home.service';
import { Title } from '@angular/platform-browser';
import { ToastWrapperService } from '../../toast-wrapper.service';
import { FullScreenService } from '../../../../Shared/fullscreen.service';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [DatePipe, HomeService]

})
/** Header component*/
export class HeaderComponent implements OnChanges{
  /** Header ctor */
  public href: string = "";
  name: string;
  img: any;
  idNumber: number = 0;
  _namePage: string;
  currentuser: any = {};
  IconName = 'menu';
  constructor(private router: Router, private titleService: Title, public TosterService: ToastWrapperService,
              private fullScrean: FullScreenService) {
    this.currentuser = JSON.parse(localStorage.getItem('tokenObj'));
  }
  ngOnInit() {
    this.TosterService.requestNumberBillIdChanged.subscribe((Message: number) => {
      if (Message === -1) {
  
      }

      if (Message == undefined) {
        this.idNumber = 0;
      }
      else {
        this.idNumber = Message;
      }
    });
  }
  ngOnChanges() {

  }

  closeAllModels() {

    this.fullScrean.closeAllModels();
  }

  openClose = 'open';
  ToggleSidebar(type): void {

    this.fullScrean.ToggleSidebar(type);
  }
  Logged_out() {
    localStorage.clear();

    this.router.navigate(['/app-sign-in']);
  }

  active() {
    $('.icon').toggleClass('active');

  }


  //getLastBill() {
  //  this.billService.GetBillLastid().subscribe(data => {})
  //}
  //active() {
  //  $('.icon').on(function () {
  //    $('.icon').toggleClass('active');
  //  })
  //}s

}
