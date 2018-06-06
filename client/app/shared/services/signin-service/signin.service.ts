import {Injectable} from '@angular/core';
import * as _ from 'lodash';

@Injectable({
    providedIn: 'root'
})
export class SigninService {

    constructor() {
    }

    checkUserAuthentication(email, password) {
        if (localStorage.getItem('tutorUserdata')) {
            const userData = JSON.parse(localStorage.getItem('tutorUserdata'));
            const isuserValid = _.find(userData, {'email': email, 'password': password});
            if (isuserValid) {
                localStorage.setItem('tutorToken', btoa(JSON.stringify(isuserValid)));
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}
