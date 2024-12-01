import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class SecurityService implements CanActivate {

  realRole: String;

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRole = route.data['expectedRole'];
    const roles = this.tokenService.getAuthorities();
    this.realRole = 'user';
    roles.forEach(role => {
      if (role == 'ROLE_ADMIN') {
        this.realRole = 'admin';
      }
    });
    if (!this.tokenService.getToken() || expectedRole.indexOf(this.realRole) === -1) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
