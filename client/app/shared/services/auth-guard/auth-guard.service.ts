import {Injectable} from '@angular/core';
import {AuthenticationService} from '../authentication/authentication.service';
import {CanActivate, Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(public auth: AuthenticationService, public router: Router) {
    }

    canActivate(): boolean {
        if (!this.auth.fnCheckUserLogin()) {
            this.router.navigate(['home']);
            return false;
        } else {
            return true;
        }
    }
}
