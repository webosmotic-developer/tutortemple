import {Injectable, Inject} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {AuthService} from '../auth-service/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(public authService: AuthService, public router: Router, @Inject(PLATFORM_ID) private platformId: Object) {
    }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const url: string = state.url;
        return this.fnCheckAuthenticate(url);
    }

    /**
     * check Authenticate.
     * @param {string} url
     */
    private fnCheckAuthenticate(url: string): boolean {
        if (isPlatformBrowser(this.platformId)) {
            if (this.authService.fnGetToken()) {
                return true;
            } else {
                this.fnDeleteData();
                this.router.navigate(['home']);
                return false;
            }
        } else {
            return true;
        }
    }

    /**
     * Delete all storage data
     */
    private fnDeleteData() {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.removeItem('AUTH_TOKEN');
        }
    }
}
