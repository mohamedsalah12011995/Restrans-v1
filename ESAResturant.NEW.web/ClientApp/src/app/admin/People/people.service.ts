import { environment } from 'src/environments/environment';
import { Injectable, } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { People } from './Models/people';
import { PeopleType } from './Models/peopleType';
import { PeopleCategory } from './Models/peopleCategory';
//import 'rxjs/add/operator/map';

@Injectable()
export class peopleService {
  private PeopleUrl: string = environment.baseUrl + 'api/People/';

  constructor(private http: HttpClient) {

  }

  getAllPeoples(): Observable<People[]> {

    let url = this.PeopleUrl + "GetPeoples";

    return this.http.get<People[]>(url).pipe(
      tap(data => {
       
      }),
      catchError(this.handleError)
    );
  }

  getAllPeopleByPhoneOrName(key :string): Observable<People[]> {

    let url = this.PeopleUrl + "GetPeoplesByNameOrPhone";
    const param = new HttpParams()
      .append('key', key.toString());


    return this.http.get<People[]>(url,{ params: param }).pipe(
      tap(data => {
      }),
      catchError(this.handleError)
    );
  }



  getLastPeople(): Observable<People> {

    let url = this.PeopleUrl + "GetLastPeople";

    return this.http.get<People>(url).pipe(
      tap(data => {

      }),
      catchError(this.handleError)
    );
  }

  InsertOrUpdatePeople(People: People): Observable<People> {

    let url = this.PeopleUrl + "InsertOrUpdatePeople"
    //xx= JSON.stringify(custModel);
    return this.http.post<People>(url, People).pipe(
      tap(data => {
      }),
      catchError(this.handleError)
    );
  }


  getPeopleById(PeopleId: number): Observable<People> {
    let url = this.PeopleUrl + "GetPeoplesById"
    const param = new HttpParams()
      .append('PeopleId', PeopleId.toString())
    let People = this.http
      .get(url, { params: param }).pipe(
        map((response: Response) => {
          var x: any = response
          return x;
        }));
    return People;
  }

  deletePeople(PeopleId: number): Observable<People> {
    let url = this.PeopleUrl + "DeletePeople"
    const param = new HttpParams().append('id', PeopleId.toString())
    return this.http.delete(url, { params: param }).pipe(
      map((response: Response) => {
        var x: any = response
        return x;
      }));
  }


  getAllPeopleTypes(): Observable<PeopleType[]> {

    let url = this.PeopleUrl + "GetPeopleTypes";

    return this.http.get<PeopleType[]>(url).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }


  getAllPeopleCategories(): Observable<PeopleCategory[]> {

    let url = this.PeopleUrl + "GetPeopleCategories";

    return this.http.get<PeopleCategory[]>(url).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
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
    console.error(errorMessage);
    return throwError(errorMessage);
  }











  // People

  //GetAllPeople() {
  //  return this.http.get(this.Url_base + 'api/People/Getpeoples/')
  //    .map(res => res.json());
  //}
  //AddPeople(p) {
  //  return this.http.post(this.Url_base + 'api/People/PostPeople/', p)
  //    .map((res: Response) => res.json());
  //}
  //EditPeople(id, p) {
  //  return this.http.put(this.Url_base + 'api/People/PutPeople/' + id, p)
  //    .map(res => res.json());
  //}
  //DeletePeople(id) {
  //  return this.http.delete(this.Url_base + 'api/People/DeletePeople/' + id)
  //    .map(res => res.json());
  //}
  //GetPeopleByPeopleType(id: number) {
  //  return this.http.get(this.Url_base + 'api/People/GetPeopleByPeopleType/' + id)
  //    .map(res => res.json());
  //}

  //// PeopleCategory
  //GetAllPeopleCategory() {
  //  return this.http.get(this.Url_base + 'api/PeopleCategories/GetpeopleCategories/')
  //    .map(res => res.json());
  //}
  //GetPeopleCategoryById(p) {
  //  return this.http.get(this.Url_base + 'api/PeopleCategories/GetPeopleCategory/' + p)
  //    .map(res => res.json());
  //}

  //// People_Type
  //GetAllPeopleType() {
  //  return this.http.get(this.Url_base + 'api/PeopleTypes/GetpeopleTypes')
  //    .map(res => res.json());
  //}
  //AddPeopleCategory(p) {
  //  return this.http.post(this.Url_base + 'api/PeopleCategories/PostPeopleCategory/', p)
  //    .map(res => res.json());
  //}
  //EditPeopleCategory(id, p) {
  //  return this.http.put(this.Url_base + 'api/PeopleCategories/PutPeopleCategory/' + id, p)
  //    .map(res => res.json());
  //}
  //DeletePeopleCategory(p) {
  //  return this.http.delete(this.Url_base + 'api/PeopleCategories/DeletePeopleCategory/' + p)
  //    .map(res => res.json());
  //}
}

