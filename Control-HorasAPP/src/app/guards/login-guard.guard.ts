import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router){}

  canActivate() {
    let usuario = localStorage.getItem('Nombre');
    // console.log("testeo guard",usuario)
    if (usuario == null) {
        this.router.navigate(['/login']);
        return false;
    }
    return true;
  }
  
}
