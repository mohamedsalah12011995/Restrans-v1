import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';


interface status {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  constructor(private homeServe: HomeService) { }

  ngOnInit() {
    this.homeServe.displayNamePages();

  }
  statuses: status[] = [
    { value: 'active-0', viewValue: 'Active' },
    { value: 'inactive-1', viewValue: 'Inactive' }
  ];
 
}
