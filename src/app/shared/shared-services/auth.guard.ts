import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const username = localStorage.getItem('username');
    if (username === null) {
      this.router
          .navigate(['/', 'login'])
          .then(() => console.log('Navigated to login page...'));
      return false;
    } else {
      return true;
    }
  }
}
