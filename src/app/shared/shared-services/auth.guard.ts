import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {LocalStoreService} from './local-store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private ls: LocalStoreService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const username = this.ls.getItem('username');
    if (username === null) {
      this.router
        .navigate(['/', 'sessions', 'sign-in'])
        .then(() => console.log('Navigated to sign in page...'));
      return false;
    } else {
      return true;
    }
  }
}
