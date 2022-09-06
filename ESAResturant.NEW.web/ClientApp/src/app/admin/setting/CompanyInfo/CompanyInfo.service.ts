import { Injectable, Inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { CompanyInfo } from 'src/app/users/Models/CompanyInfo';

@Injectable()
export class CompanyInfoService {

  private BaseCompanyInfoUrl: string = environment.baseUrl + 'api/CompanyInfo/';

  constructor(private http: HttpClient) {

  }

  getAllCompanyInfo(): Observable<CompanyInfo[]> {

    let url = this.BaseCompanyInfoUrl + "GetCompanyInfo";

    return this.http.get<CompanyInfo[]>(url).pipe(
      tap(data => { }),
      catchError(this.handleError)
    );
  }

  InsertOrUpdateCompanyInfo(companyInfo: CompanyInfo): Observable<CompanyInfo> {

    let url = this.BaseCompanyInfoUrl + "InsertOrUpdateCompanyInfo"
    //xx= JSON.stringify(custModel);
    return this.http.post<CompanyInfo>(url, companyInfo).pipe(
      tap(data => {
      }),
      catchError(this.handleError)
    );
  }




  getCompanyInfoById(id: number): Observable<CompanyInfo> {
    let url = this.BaseCompanyInfoUrl + "GetCompanyInfobyId"
    const param = new HttpParams()
      .append('id', id.toString())
    let CompanyInfo = this.http
      .get(url, { params: param }).pipe(
        map((response: Response) => {
          var x: any = response
          return x;
        }));
    return CompanyInfo;
  }

  deleteCompanyInfo(CompanyInfoId: number): Observable<CompanyInfo> {
    let url = this.BaseCompanyInfoUrl + "DeleteCompanyInfo"
    const param = new HttpParams().append('id', CompanyInfoId.toString())
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
