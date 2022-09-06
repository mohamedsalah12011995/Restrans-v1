import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DOCUMENT } from '@angular/common';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class FullScreenService {
  elem;

  constructor(@Inject(DOCUMENT) private document: any) {
    this.elem = this.document.documentElement;

  }

  public  SucssesToaster = new Subject();
  public ErrorToaster = new Subject();


  openFullscreen() {

    if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
  }

  /* Close fullscreen */
  closeFullscreen() {
    if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }
  }


  closeAllModels() {
    //start bill invoice
    $('#invCatMore').modal('hide');
    $('#invDetails').modal('hide');
    $('#btnMore').modal('hide');
    $('#exampleModalCenter').modal('hide');
    $('#PlaceInv').modal('hide');
    $('#exampleModalCenterPlace').modal('hide');
    $('#exampleModalCenterPlaceByCar').modal('hide');
    $('#tdCount').modal('hide');
    $('#billTableList').modal('hide');
    $('#billDeliveryList').modal('hide');
    $('#billNotTableList').modal('hide');
    $('#invNote').modal('hide');
    $('#deleteConfirmNote').modal('hide');
    $('#printbill').modal('hide');

    //start items
    $('#Categorytemplate').modal('hide');
    $('#Unittemplate').modal('hide');
    $('#ItemSizetemplate').modal('hide');
    $('#ComponentItemtemplate').modal('hide');
    $('#template').modal('hide');

    // start kitchen
    $('#finishBills').modal('hide');

    $('#deleteConfirm').modal('hide');
    $('#currencyTemplate').modal('hide');
    $('#boxCategorytemplate').modal('hide');

    $('#userTypeTemplate').modal('hide');
    $('#userConfirm').modal('hide');

  }

  ToggleSidebar(type): void {
    let body = document.querySelector('body').getAttribute('dir');
    if (type === 'open') {
      if (body === 'ltr') {
        (document.querySelector('.sidebarMenu') as HTMLElement).style.animation = 'slideInLeft 0.5s';
      } else {
        (document.querySelector('.sidebarMenu') as HTMLElement).style.animation = 'slideInRight 0.5s';
      }
      (document.querySelector('.sidebarMenu') as HTMLElement).style.display = 'block';
    }
    else if (type === 'close') {
      
      if (body === 'ltr') {
        (document.querySelector('.sidebarMenu') as HTMLElement).style.animation = 'slideOutLeft 0.5s';
      } else {
        (document.querySelector('.sidebarMenu') as HTMLElement).style.animation = 'slideOutRight 0.5s';
      }
      setTimeout(() => {
        (document.querySelector('.charts') as HTMLElement).classList.remove('col-md-10', 'offset-md-2');
        (document.querySelector('.charts') as HTMLElement).classList.add('col-md-12');
        (document.querySelector('.sidebarMenu') as HTMLElement).style.display = 'none';
      }, 500);
    }
  }
}
