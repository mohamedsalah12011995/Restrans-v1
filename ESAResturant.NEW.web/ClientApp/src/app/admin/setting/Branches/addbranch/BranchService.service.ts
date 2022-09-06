import { Injectable, Inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Branch } from '../../Models/Branch';

@Injectable()
export class BranchService {

  private BaseBranchUrl: string = environment.baseUrl + 'api/Branches/';

  constructor(private http: HttpClient) {

  }

  getAllBranches(): Observable<Branch[]> {

    let url = this.BaseBranchUrl + "GetBranches";

    return this.http.get<Branch[]>(url).pipe(
      tap(data => { }),
      catchError(this.handleError)
    );
  }

  InsertOrUpdateBranch(Branch: Branch): Observable<Branch> {

    let url = this.BaseBranchUrl + "InsertOrUpdateBranch"
    //xx= JSON.stringify(custModel);
    return this.http.post<Branch>(url, Branch).pipe(
      tap(data => {
      }),
      catchError(this.handleError)
    );
  }




  GetBranchById(id: number): Observable<Branch> {
    let url = this.BaseBranchUrl + "GetBranchById"
    const param = new HttpParams()
      .append('id', id.toString())
    let Branch = this.http
      .get(url, { params: param }).pipe(
        map((response: Response) => {
          var x: any = response
          return x;
        }));
    return Branch;
  }

  deleteBranch(BranchId: number): Observable<Branch> {
    let url = this.BaseBranchUrl + "DeleteBranch"
    const param = new HttpParams().append('id', BranchId.toString())
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
