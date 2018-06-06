import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SignupService {
    public users: any [];

    constructor() {
    }

    registerUser(useData: any) {

        if (!localStorage.getItem('tutorUserdata')) {
            this.users = [useData];
        } else {
            this.users = JSON.parse(localStorage.getItem('tutorUserdata'));
            this.users.push(useData);
        }
        localStorage.setItem('tutorUserdata', JSON.stringify(this.users));
        return true;
    }
}
