import { Injectable, Inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Printer } from '../Models/Printer';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable()
export class PrinterService {

  private BasePrinterUrl: string = environment.baseUrl + 'api/Printer/';


  public PrinterAdded = new Subject();




  constructor(private http: HttpClient) {

  }

  All_PrinterDevice(): Observable<any[]> {

    let url = this.BasePrinterUrl + "GetAllPrinterDevice";

    return this.http.get<any[]>(url).pipe(
      //tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  All_Print(): Observable<Printer[]> {
    let url = this.BasePrinterUrl + "GetPrinters";
    return this.http.get<Printer[]>(url).pipe(
      //tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError));
  }

  deletePrinter(id: number): Observable<Printer> {
    let url = this.BasePrinterUrl + "DeletePrinter"
    const param = new HttpParams().append('id', id.toString())
    return this.http.delete(url, { params: param }).pipe(
      map((response: Response) => {
        var x: any = response
        return x;
      }));
  }

  getPrintersById(id: number): Observable<Printer> {
    let url = this.BasePrinterUrl + "GetPrintersById"
    const param = new HttpParams()
    .append('id', id.toString())
    let printer = this.http
      .get(url, { params: param }).pipe(
        map((response: Response) => {
        var x: any = response
          return x;
        }));
    return printer;
  }


  InsertOrUpdatePrinter(print: Printer): Observable<Printer> {
    let url = this.BasePrinterUrl + "InsertOrUpdatePrinter"
    return this.http.post<Printer>(url, print).pipe(
    catchError(this.handleError));
  }

  cunfirmPrint(name: string): Observable<any> {
    let url = this.BasePrinterUrl + "CunfirmPrint"

    return this.http.post<any>(url, name).pipe(
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
