
import {tap} from 'rxjs/operators';
import { Injectable } from '@angular/core';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { ToastWrapperService } from 'src/app/admin/Shared/toast-wrapper.service';

//import { SlimLoadingBarService } from '@cime/ngx-slim-loading-bar';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService, private myrouter: Router, public TosterService: ToastWrapperService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let newHeaders = {};
    if (request.body instanceof FormData) {
      newHeaders = {
        'Authorization': `Bearer ${this.auth.getToken()}`
      };
    }
    else {
      newHeaders = {
        'Authorization': `Bearer ${this.auth.getToken()}`,
        'Content-Type': "application/json"
      };
    }
    request = request.clone({
      setHeaders: newHeaders
    });

    //request = request.clone({
    //  setHeaders: {
    //    Authorization: `Bearer ${this.auth.getToken()}`,
    //    //  'content':"application/json",
    //    //  'content-type':"application/x-www-form-urlencoded"
    //    'Content-Type': "application/json"
    //    // "dataType": "json",

    //  }
    //});

    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {


      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        
   
        if (err.status == 403) //if Forbidden not match the role 
        {
          this.TosterService.ErrorToaster.next("OOOh Sorry !!   You don't have permission to take this action ... ");
        }
        if (err.status == 401) //if Forbidden not match the role 
        {
          this.TosterService.ErrorToaster.next("You are not authorized or  Token may Expired  ... ");
          this.auth.logout();
          this.myrouter.navigate['/'];
        }
      }
    }));
  }
}
