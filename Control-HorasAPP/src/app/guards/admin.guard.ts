import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router){}

  canActivate() {
    console.log("asdasd",localStorage.getItem('Tipo'))
    let tipo = atob(localStorage.getItem('Tipo'));
    console.log("testeo guard",tipo)
    if (tipo != "1") {
        this.router.navigate(['/dashboard']);
        return false;
    }
    return true;
  }
  
}
