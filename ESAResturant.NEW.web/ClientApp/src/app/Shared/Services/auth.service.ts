import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Token } from './token';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse, HttpParams, HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../users/Models/User';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private AccountsUrl: string = environment.baseUrl + 'api/Accounts/';
  private Token: Token;

  public CurrentLang: string = 'ar';

  public user: User = new User();


  constructor(private myrouter: Router, private http: HttpClient, public translate: TranslateService) {
    this.Token = new Token();

  }

  logout(): void {
    localStorage.setItem('isLoggedIn', "false");
    localStorage.setItem('isLocked', "true");

    localStorage.removeItem('tokenObj');
    this.Token = null;
  }

  getCurrentLang() {
    var currentLang = JSON.parse(localStorage.getItem('CurrentLang'));
    return currentLang;

    //if (this.currentLang == '') {
    //this.currentLang = this.authService.getCurrentLang();
    //  this.translate.use(this.currentLang);
    //} else {
    //  this.currentLang = translate.currentLang;
    //}
    //this.changeTitle(this.currentLang);

  }

  lock(): void {
    localStorage.setItem('isLoggedIn', "false");
    localStorage.setItem('isLocked', "true");
    this.Token = null;
  }


  login(login: any): Observable<Token> {
    //if login valid
    let url = this.AccountsUrl + "login"

    return this.http.post<Token>(url, login).pipe(
      tap(data => {
        if (data != undefined && data != null ) {
          this.Token = data;
          localStorage.setItem('isLoggedIn', "true");
          localStorage.setItem('isLocked', "false");
          localStorage.setItem('tokenObj', JSON.stringify(this.Token));
        }
      }, error => {
        console.log(error);
      }),
      catchError(this.handleError)
    );
  }

  public getUser() {
   // var user = JSON.parse(localStorage.getItem('tokenObj'));
    var user = JSON.parse(localStorage.getItem('User'));
    return user;
  }

  public getToken(): string {
    this.Token = JSON.parse(localStorage.getItem('tokenObj'));

    if (this.Token == null || this.Token == undefined || this.Token.authToken == '') {
      return null;
    }
    return this.Token.authToken;//localStorage.getItem('token');
  }

  public getBoxMonyId(): number {
    if (this.Token == null || this.Token == undefined) {
      return null;
    }
    return this.Token.boxMonyTypeId;
  }

  public getUserId(): string{
    if (this.Token == null || this.Token == undefined) {
      return null;
    }
    return this.Token.userId;
  }
  public getUserType(): number {
    this.Token = JSON.parse(localStorage.getItem('tokenObj'));

    if (this.Token == null || this.Token == undefined || this.Token.authToken == '') {
      return null;
    }
    return this.Token.userTypeId;
  }

  public getCurrentUserName(): string {
    this.Token = JSON.parse(localStorage.getItem('tokenObj'));

    if (this.Token == null || this.Token == undefined || this.Token.authToken == '') {
      return null;
    }
    return this.Token.userName;//localStorage.getItem('token');
  }

  ///Check If this User Logged in or not 
  public isAuthenticated(): boolean {

    // get the token
    const token = this.getToken();
    if (token == '' || token == undefined || token == null || localStorage.getItem('isLoggedIn') === "false" || localStorage.getItem('isLocked') === "true") {
      return false;
    }
    else {
      return true;
    }
  }

  ///check is Roles permitted for roles or not
  ///this method like check if any of this  roles Exist in current token or not  
  public isInRoles(roles: string[]): boolean {

    const token = this.getToken();
    if (token) {

      if (this.Token.userName == 'admin') {
        return true;
      }

      for (var role of roles) {
        var roleindex = this.Token.roles.findIndex(tokenrole => tokenrole == role);
        if (roleindex > -1) {
          return true;
        }
      }
      return false;
    }
    return false;  //false 
  }

  public IsInRole(role: string): boolean {

    if (this.Token) {
      var roleindex = this.Token.roles.findIndex(r => r == role);
      if (roleindex > -1) {
        return true;
      }
      else {
        return false;
      }

    }
    return false;

  }


  public HasItemCategory(ITemCategoryId: number): boolean {

    if (this.Token) {

      if (this.Token.itemCategories == null || this.Token.itemCategories == '') {
        return false;
      }

      else {
        var roleindex = this.Token.itemCategories.split(',').map(Number).findIndex(r => r == ITemCategoryId);
        if (roleindex > -1) {
          return true;
        }
        else {
          return false;
        }

      }

    }
    return false;

  }




  public CheckResetToken(checkResetModel: any): Observable<boolean> {
    //if login valid
    let url = this.AccountsUrl + "CheckResetToken"


    return this.http.post<boolean>(url, checkResetModel).pipe(
      tap(data => { }, error => {
        console.log("err" + error);
      }),
      catchError(this.handleError)
    );

  }


  public ForgetPassword(email: string): Observable<boolean> {
    let url = this.AccountsUrl + "ForgetPassword"
    const param = new HttpParams()
      .append('email', email.toString())

    return this.http.get<boolean>(url, { params: param }).pipe(
      tap(data => { }),
      catchError(this.handleError)
    );
  }


  public changePassword(checkResetModel: any): Observable<boolean> {
    //if login valid
    let url = this.AccountsUrl + "ChangePassword"


    return this.http.post<boolean>(url, checkResetModel).pipe(
      tap(data => { }, error => {
        console.log("err" + error);
      }),
      catchError(this.handleError)
    );
  }



  private handleError(err: HttpErrorResponse) {

    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    return throwError(errorMessage);
  }



}
