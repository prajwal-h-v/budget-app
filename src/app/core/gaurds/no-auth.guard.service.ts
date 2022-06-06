import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlTree,
  UrlSegment,
} from '@angular/router';
import { Observable } from 'rxjs';
import { StorageKeys } from '../modals/storage-keys.enum';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuardService implements CanActivate, CanLoad {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const isLoggined = !!localStorage.getItem(StorageKeys.TOKEN);
    if (isLoggined) {
      this.router.navigateByUrl('/users');
      return false;
    }
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const isLoggined = !!localStorage.getItem(StorageKeys.TOKEN);
    if (isLoggined) {
      this.router.navigateByUrl('/users');
      return false;
    }
    return true;
  }
}
