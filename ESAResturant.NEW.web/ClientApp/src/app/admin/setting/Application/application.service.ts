import { Injectable, Inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse,HttpParams } from '@angular/common/http';
import { Application } from '../Models/Application';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable()
export class ApplicationService {

  private BaseApplicationUrl: string = environment.baseUrl + 'api/Application/';


  public ApplicationAdded = new Subject();




  constructor(private http: HttpClient) {

  }

  All_ApplicationDevice(): Observable<any[]> {

    let url = this.BaseApplicationUrl + "GetAllApplicationDevice";

    return this.http.get<any[]>(url).pipe(
      //tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  GetAllApplication(): Observable<Application[]> {
    let url = this.BaseApplicationUrl + "GetApplications";
    return this.http.get<Application[]>(url).pipe(
      //tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError));
  }

  deleteApplication(id: number): Observable<Application> {
    let url = this.BaseApplicationUrl + "DeleteApplication"
    const param = new HttpParams().append('id', id.toString())
    return this.http.delete(url, { params: param }).pipe(
      map((response: Response) => {
        var x: any = response
        return x;
      }));
  }

  getApplicationById(id: number): Observable<Application> {
    let url = this.BaseApplicationUrl + "GetApplicationsById"
    const param = new HttpParams()
    .append('id', id.toString())
    let Application = this.http
      .get(url, { params: param }).pipe(
        map((response: Response) => {
        var x: any = response
          return x;
        }));
    return Application;
  }


  InsertOrUpdateApplication(print: Application): Observable<Application> {
    let url = this.BaseApplicationUrl + "InsertOrUpdateApplication"
    return this.http.post<Application>(url, print).pipe(
      //tap(data => { console.log('All: ' + JSON.stringify(data)) }),
      catchError(this.handleError));
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
