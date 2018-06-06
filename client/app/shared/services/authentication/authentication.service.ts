import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor() {
    }

    public fnCheckUserLogin() {
        return localStorage.getItem('tutorToken') ? true : false;
    }

    public fnRemoveToken() {
        localStorage.removeItem('tutorToken');
    }

}
