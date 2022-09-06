import { environment } from 'src/environments/environment';
import { Injectable ,} from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { PagedData } from 'src/app/Shared/classes/page-data';
import { ItemCategory } from './../Models/ItemCategory';

@Injectable()
export class ItemCategoryService {
  private ItemCategoryUrl: string = environment.baseUrl + 'api/ItemCategory/';

  constructor(private http: HttpClient) {

  }

  getAllItemCategories(): Observable<ItemCategory[]> {

    let url = this.ItemCategoryUrl + "GetAllItemCategories";

    return this.http.get<ItemCategory[]>(url).pipe(
      tap(data => { }),
      catchError(this.handleError)
    );
  }

  InsertOrUpdateItemCategory(itemCategory: ItemCategory): Observable<ItemCategory> {

    let url = this.ItemCategoryUrl + "InsertOrUpdateItemCategory"
    //xx= JSON.stringify(custModel);
    return this.http.post<ItemCategory>(url, itemCategory).pipe(
      tap(data => {
      }),
      catchError(this.handleError)
    );
  }




  getItemCategoryById(id: number): Observable<ItemCategory> {
    let url = this.ItemCategoryUrl + "GetItemCategoryById"
    const param = new HttpParams()
    .append('id', id.toString())
    let ItemCategory = this.http
      .get(url, { params: param }).pipe(
        map((response: Response) => {
          var x: any = response
          return x;
        }));
    return ItemCategory;
  }

  deleteItemCategory(categoryId: number): Observable<ItemCategory> {
    let url = this.ItemCategoryUrl + "DeleteItemCategory"
    const param = new HttpParams().append('id', categoryId.toString())
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
