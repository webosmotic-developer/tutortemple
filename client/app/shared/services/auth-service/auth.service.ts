import {Injectable} from '@angular/core';
import {Constant} from '../../constant';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private _http: HttpClient) {
    }

    fnSignUp(obj: any) {
        return new Promise((resolve, reject) => {
            this._http
                .post(Constant.API_URL + 'api/sign-up', obj)
                .subscribe((response: any) => {
                    resolve(response);
                }, (error) => {
                    reject(error);
                });
        });
    }
}
