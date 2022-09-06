import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { PagedData } from '../Shared/classes/page-data';
import { User } from './Models/User';
import { RoleViewModel } from '../admin/user-managment/Models/RoleViewModel';
import { CompanyInfo } from './Models/CompanyInfo';
import { UserDate } from './Models/UserDate';
import { SettingsService } from '../admin/Shared/settings.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private BaseUserUrl: string = environment.baseUrl + 'api/User/';
  private AccountsUrl: string = environment.baseUrl + 'api/Accounts/';
  private UserDateUrl: string = environment.baseUrl + 'api/UserDate/';
  private BaseCompanyInfoUrl: string = environment.baseUrl + 'api/CompanyInfo/';

  public rolesLookup: RoleViewModel[] = new Array();  
  public CompanyInfoSubject = new Subject();


  constructor(private http: HttpClient, public settings: SettingsService) {

    this.rolesLookup.push(new RoleViewModel("DashBoard", "الرئيسية", "DashBoard"));
    this.rolesLookup.push(new RoleViewModel("Items","ادارة اصناف البيع" , "Sell Items  Managment"));
   // this.rolesLookup.push(new RoleViewModel("AddItem", "اضافة صنف بيع جديد", "Add New  Item "));
    //this.rolesLookup.push(new RoleViewModel("EditItem", " تعديل صنف بيع موجود", "Edit Item"));
    //this.rolesLookup.push(new RoleViewModel("DeleteItem", "بحذف صنف بيع", "Delete Item"));


    this.rolesLookup.push(new RoleViewModel("BuyItems", "ادارة اصناف الشراء ", "Items Buy Managment"));
    //this.rolesLookup.push(new RoleViewModel("AddBuyItem", "اضافة صنف شراء جديد", "Add New Buy Item "));
    //this.rolesLookup.push(new RoleViewModel("EditBuyItem", " تعديل صنف شراء موجود", "Edit Buy Item"));
    //this.rolesLookup.push(new RoleViewModel("DeleteBuyItem", "بحذف صنف شراء", "Delete BuyItem"));


    //this.rolesLookup.push(new RoleViewModel("BillPurchases", "فاتورة المشتريات", "Bill Purchases"));

    this.rolesLookup.push(new RoleViewModel("AddBillInvoice", "اضافة فاتورة بيع  ", "Add Sell Invoice"));
    //this.rolesLookup.push(new RoleViewModel("WaitBillInvoice", "تعليق فاتورة بيع", "WaitBillInvoice "));

    this.rolesLookup.push(new RoleViewModel("Tables", "الطاولات", "Tables "));
    //this.rolesLookup.push(new RoleViewModel("OpenTable", "فتح طاولة جديدة", "Open New Table"));

    this.rolesLookup.push(new RoleViewModel("TablesManagement", "ادارة الطاولات  ", "Managment Tables"));
    //this.rolesLookup.push(new RoleViewModel("AddTable", "اضافة طاولة جديد", "Add New Table"));
    //this.rolesLookup.push(new RoleViewModel("EditTable", " تعديل طاولة موجودة", "Edit Table"));
    //this.rolesLookup.push(new RoleViewModel("DeleteTable", "بحذف طاولة بيع", "Delete Table"));


    this.rolesLookup.push(new RoleViewModel("KitchenScreen", "شاشة المطبخ", "Kitchen Screen"));

    this.rolesLookup.push(new RoleViewModel("DailyReport", "تقرير اليوميه", "Daily Report"));
    this.rolesLookup.push(new RoleViewModel("ApplicationReport", "تقرير التطبيقات ", "Application Report"));
    this.rolesLookup.push(new RoleViewModel("InvoicesReport", "تقرير الفواتير", "Invoices Report "));
    //this.rolesLookup.push(new RoleViewModel("ItemsReport", " تقرير الاصناف", "Items Report "));
    this.rolesLookup.push(new RoleViewModel("ReportTaxs", "تقرير الضرائب", "Taxs Report"));
    this.rolesLookup.push(new RoleViewModel("BoxMonyReport", "تقرير الخزنة", "BoxMony Report"));

    this.rolesLookup.push(new RoleViewModel("userManagment", "ادارة المستخدمين", "User Managment"));

    this.rolesLookup.push(new RoleViewModel("peopleManagment", "ادارة العملاء", "People Managment"));


    this.rolesLookup.push(new RoleViewModel("CurrenciesManagment", "ادارة العملات", "Currencies Managment"));


    this.rolesLookup.push(new RoleViewModel("TaxesManagment", "ادارة الضرائب", "Taxes Managment"));

    this.rolesLookup.push(new RoleViewModel("ApplicationsManagment", "ادارة التطبيقات", "Applications Managment"));

    //this.rolesLookup.push(new RoleViewModel("SettingsManagment", "الاعدادات", "Settings Managment"));

    this.rolesLookup.push(new RoleViewModel("CompanyInfo", "بيانات الشركة", "Company Information"));


    this.rolesLookup.push(new RoleViewModel("UserTypes", "ادارة انواع المستخدمين", "User Types"));
    this.rolesLookup.push(new RoleViewModel("AddBranch", "ادارة الفروع", "Add Branch "));

    //this.rolesLookup.push(new RoleViewModel("Store", "  المخزن ", " Store "));
    this.rolesLookup.push(new RoleViewModel("Menu", " المنيو ", " Menu "));
    //this.rolesLookup.push(new RoleViewModel("CustomerAccount", "  حسابات العملاء ", " Customer Account "));
    this.rolesLookup.push(new RoleViewModel("ChangePassword", "  تغيير الرقم السري ", " Change Password "));





















  }

  CheckLogin(name, pass): Observable<User> {
    let url = this.BaseUserUrl + "Check_Login"
    const param = new HttpParams()
      .append('name', name.toString())
      .append('pass', pass.toString());

    let People = this.http
      .get(url, { params: param }).pipe(
        map((response: Response) => {
          var x: any = response
          return x;
        }));
    return People;
  }

  GetAllUser() {
    let url = this.BaseUserUrl + "GetUsers";
    return this.http.get<User[]>(url).pipe(
      tap(data => { }),
      catchError(this.handleError)
    );
  }

  insertOrUpdateUser(user: User): Observable<User> {

    let url = this.BaseUserUrl + "InsertOrUpdateUser";
    //xx= JSON.stringify(custModel);
    return this.http.post<User>(url, user).pipe(
      tap(data => {
      }),
      catchError(this.handleError)
    );
  }


  getusersPaginated(pageIndex: number, pageSize: number, sortKey: string, sortOrderBY: string, userName: string): Observable<PagedData<User>> {

    let url = this.AccountsUrl + "GetAllUersPaginated";
    const param = new HttpParams()
      .append('pageIndex', pageIndex.toString())
      .append('pageSize', pageSize.toString())
      .append('sortKey', sortKey)
      .append('sortOrderBY', sortOrderBY)
      .append('userName', userName);

    return this.http.post<PagedData<User>>(url, {}, { params: param }).pipe(
      tap(data => {


      }),
      catchError(this.handleError)
    );
  }




  getUsertByUserName(username): Observable<User> {
    let url = this.AccountsUrl + "GetUerProfilebyusername"
    const param = new HttpParams()
      .append('UserName', username.toString())

    return this.http.get<User>(url, { params: param }).pipe(
      tap(data => {

      }),
      catchError(this.handleError)
    );
  }




  getUsertByEmail(email): Observable<User> {
    let url = this.AccountsUrl + "GetUerProfilebyemail"
    const param = new HttpParams()
      .append('Email', email.toString())

    return this.http.get<User>(url, { params: param }).pipe(
      tap(data => {

      }),
      catchError(this.handleError)
    );
  }


  AddUser(request: User): Observable<any> {
    let url = this.AccountsUrl + "register"

    return this.http.post<any>(url, request).pipe(
      tap(data => { }),
      catchError(this.handleError)
    );
  }


  getAllUsers(): Observable<User[]> {

    let url = this.AccountsUrl + "GetAllUers";

    return this.http.get<User[]>(url).pipe(
      tap(data => { }),
      catchError(this.handleError)
    );
  }


  getAllCompanyInfo(): Observable<CompanyInfo[]> {

    let url = this.BaseCompanyInfoUrl + "GetCompanyInfo";

    return this.http.get<CompanyInfo[]>(url).pipe(
      tap(data => { }),
      catchError(this.handleError)
    );
  }


  deleteUser(userName): Observable<User> {
    let url = this.AccountsUrl + "DeleteUser"
    const param = new HttpParams()
      .append('userName', userName.toString())

    return this.http.get<User>(url, { params: param }).pipe(
      tap(data => {

      }),
      catchError(this.handleError)
    );
  }

  //InsertOrUpdateUserDate(userDate: UserDate): Observable<any> {
  //  debugger;
  //  let url = "http://localhost:62606/api/UserDate/InsertOrUpdateUserDate"

  //  return this.http.post(url, userDate).pipe(
  //    tap(data => {
  //      console.log(data);
  //    }),
  //    catchError(this.handleError)
  //  );
  //}

  InsertOrUpdateUserDate(userDate: UserDate) {

    return this.http.post("/api/UserDate/InsertOrUpdateUserDate", userDate)
      .subscribe((data: UserDate) => {
        if (data.currentDate != null) {
          this.settings.isDayOpened = true;
        }
        else {
          this.settings.isDayOpened = false;
          this.settings.RemoveCurrentDate();
        }

        console.log(data);
    });
  }


  getUserDate(user: string): Observable<any> {
    let url = this.UserDateUrl + "GetUserDateModelByUserId"
    const param = new HttpParams().append('User', user)

    return this.http.get<any>(url, { params: param }).pipe(
      tap(data => { }),
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
}
