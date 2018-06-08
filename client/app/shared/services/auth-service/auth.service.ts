import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Constant} from '../../constant';
import {HttpClient} from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import * as _ from 'lodash';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private token: any;
    private userInfo: any;

    constructor(private _http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
        if (isPlatformBrowser(this.platformId)) {
            if (localStorage.getItem('AUTH_TOKEN')) {
                this.token = this._fnParseJWT(localStorage.getItem('AUTH_TOKEN'));
            }
        }
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

    /**
     * User sign in.
     * @param {object} obj
     * */
    fnSignIn(obj: any) {
        return new Promise((resolve, reject) => {
            this._http
                .post(Constant.API_URL + 'api/auth/login', obj)
                .subscribe((response: any) => {
                    if (response && response.token) {
                        if (isPlatformBrowser(this.platformId)) {
                            localStorage.setItem('AUTH_TOKEN', response.token);
                        }
                        this.token = this._fnParseJWT(response['token']);
                    }
                    resolve(response);
                }, (error) => {
                    reject(error);
                });
        });
    }

    /**
     * User sign out.
     * */
    fnSignOut() {
        return new Promise((resolve, reject) => {
            this.token = '';
            if (isPlatformBrowser(this.platformId)) {
                localStorage.removeItem('AUTH_TOKEN');
            }
            resolve();
        });
    }


    /**
     * Parse token
     * */
    private _fnParseJWT(str: any) {
        const base64Url = str.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }

    /**
     * Get user token
     * */
    fnGetToken(): any {
        return this.token;
    }

    /**
     * Get user is logged in or not
     * */
    fnIsLoggedIn(): any {
        return _.isObject(this.token);
    }


}
