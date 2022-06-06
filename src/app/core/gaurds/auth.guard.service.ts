import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { StorageKeys } from '../modals/storage-keys.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate, CanLoad {
  constructor(private router: Router) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const isLoggedIn = localStorage.getItem(StorageKeys.TOKEN);
    if (!!isLoggedIn) {
      return true;
    }
    this.router.navigateByUrl('/login');
    return false;
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const isLoggedIn = localStorage.getItem(StorageKeys.TOKEN);
    if (!!isLoggedIn) {
      return true;
    }
    this.router.navigateByUrl('/login');
    return false;
  }
}
