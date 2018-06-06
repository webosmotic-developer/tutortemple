import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthenticationService} from '../authentication/authentication.service';

@Injectable({
    providedIn: 'root'
})
export class NonAuthGuardService implements CanActivate {

    constructor(public auth: AuthenticationService, public router: Router) {
    }

    canActivate(): boolean {
        if (this.auth.fnCheckUserLogin()) {
            this.router.navigate(['dashboard']);
            return false;
        } else {
            return true;
        }
    }
}
