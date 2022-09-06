import { Injectable } from '@angular/core';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastWrapperService {

  constructor() {

  }
  public requestNumberOrderChanged = new Subject();
  public requestNumberBillIdChanged = new Subject();
  public requestNumberTableChanged = new Subject();

  public TableNo = new BehaviorSubject(null);
  public CurrentDateUser = new BehaviorSubject(null);
  public Bill = new Subject();

  public ItemPriceSubject = new Subject();

  public requestDateChanged = new Subject();

  //Subject For Sucsess toaster 
  public SucssesToaster = new Subject();

  public ErrorToaster = new Subject();
  public tablePost = new Subject();
  public getTable = new Subject();



}
