import { Injectable } from '@angular/core';
import { catchError, tap, map } from "rxjs/operators";
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { UserType } from './Models/UserType';
@Injectable({
  providedIn: 'root'
})
export class UserTypesService {

  private BaseUserTypesUrl: string = environment.baseUrl + 'api/UserType/';

  constructor(private http: HttpClient) {

  }

  getAllUserTypes(): Observable<UserType[]> {

    let url = this.BaseUserTypesUrl + "GetUserTypes";

    return this.http.get<UserType[]>(url).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  InsertOrUpdateUserTypes(UserTypes: UserType): Observable<UserType> {

    let url = this.BaseUserTypesUrl + "InsertOrUpdateUserType"
    //xx= JSON.stringify(custModel);
    return this.http.post<UserType>(url, UserTypes).pipe(
      tap(data => {
        console.log('All: ' + JSON.stringify(data));
      }),
      catchError(this.handleError)
    );
  }

  getUserTypesByItemId(id: number): Observable<UserType[]> {
    let url = this.BaseUserTypesUrl + "GetUserTypebyItemId"
    const param = new HttpParams()
      .append('id', id.toString())
    let UserTypes = this.http
      .get(url, { params: param }).pipe(
        map((response: Response) => {
          var x: any = response
          var x

        return x;
        }));
    return UserTypes;
  }


  getUserTypesById(id: number): Observable<UserType> {
    let url = this.BaseUserTypesUrl + "GetUserTypebyId"
    const param = new HttpParams()
      .append('id', id.toString())
    let UserTypes = this.http
      .get(url, { params: param }).pipe(
        map((response: Response) => {
          var x: any = response
          return x;
        }));
    return UserTypes;
  }

  deleteUserTypes(UserTypesId: number): Observable<UserType> {
    let url = this.BaseUserTypesUrl + "DeleteUserType"
    console.log(UserTypesId);
    const param = new HttpParams().append('id', UserTypesId.toString())
    return this.http.delete(url, { params: param }).pipe(
      map((response: Response) => {
        var x: any = response
        return x;
      }));
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
    console.error(errorMessage);
    return throwError(errorMessage);
  }


}
