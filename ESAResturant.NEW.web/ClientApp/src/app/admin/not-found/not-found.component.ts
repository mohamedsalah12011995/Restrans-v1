import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../Shared/Components/header/header.component';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.css']
})
/** NotFound component*/
export class NotFoundComponent {
  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  /** NotFound ctor */
  constructor() {

    }

  ngOnInit() {
  }


}
