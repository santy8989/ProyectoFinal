import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfeGuard implements CanActivate {
  constructor(private router: Router){}

  canActivate() {
    // console.log("asdasd",localStorage.getItem('Tipo'))
    let tipo = atob(localStorage.getItem('Tipo'));
    // console.log("testeo guard",tipo)
    if (tipo != "Profesor" && tipo != "Admin") {
        this.router.navigate(['/dashboard']);
        return false;
    }
    return true;
  }
  
}
