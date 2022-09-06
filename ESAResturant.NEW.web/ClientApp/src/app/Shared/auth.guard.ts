import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router, CanLoad, UrlSegment, Route  } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router, public authService: AuthService ){}



  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    var Allowedroles = next.data.roles;

    if (this.authService.isAuthenticated()) {  //if user logged in 
      if (this.authService.isInRoles(Allowedroles)) {
        ///if have permit 
        return true;
      }
      else {
        ///Accsess Denaid  
        this.router.navigate(['/access-denied']);
      }
    }
    else {    //this user dosn't login 
       this.router.navigate(['/login']);
      return false;

    }
    return true;
  }



  ////can loaded as  child 
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

    

    if (!this.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }



  verifyLogin(url) : boolean{
    if(!this.isLoggedIn()){
      this.router.navigate(['/Login']);
        return false;
    }
    else if(this.isLoggedIn()){
        return true;
    }
}
  public isLoggedIn(): boolean{

    let status = false;
    if (localStorage.getItem('isLoggedIn') == "true" || localStorage.setItem('isLocked', "false")){
      status = true;
    }
    else{
      status = false;
    }
    return status;
}

}
