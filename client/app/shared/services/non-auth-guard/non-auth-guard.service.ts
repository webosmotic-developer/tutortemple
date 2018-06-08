import {Injectable, Inject} from '@angular/core';

import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {AuthService} from '../auth-service/auth.service';



@Injectable({
    providedIn: 'root'
})
export class NonAuthGuardService implements CanActivate {

    constructor(public authService: AuthService, public router: Router, @Inject(PLATFORM_ID) private platformId: Object) {
    }

    /**
     * check Activate.
     * @param {object} route
     * @param {object} state
     */
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
            if (localStorage.getItem('AUTH_TOKEN')) {
                this.router.navigate(['dashboard']);
                return false;
            } else {
                return true;
            }
        }
    }
}
