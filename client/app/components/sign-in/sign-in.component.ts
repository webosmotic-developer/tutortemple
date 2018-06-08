import {Component, OnInit} from '@angular/core';
import {Constant} from '../../shared/constant';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {AuthService} from '../../shared/services/auth-service/auth.service';

interface SignIn {
    email: string;
    password: string;
}

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
    signInObj: SignIn;
    public emailRegEx: any = Constant.EMAIL_REG_EX;
    public passwordRegEx: any = Constant.PASSWORD_REG_EX;

    constructor(private authService: AuthService, private toastr: ToastrService, private router: Router) {
        this.signInObj = {
            'email': '',
            'password': ''
        };
    }

    ngOnInit() {
    }

    fnSignIn() {
        this.authService.fnSignIn(this.signInObj)
            .then((response: any) => {
                if (response && response.token) {
                    this.router.navigate(['dashboard']);
                    this.toastr.success('Welcome to Tutor Temple.');
                }
            })
            .catch((error) => {
                this.toastr.error('Login failed, incorrect email or password.');
            });
    }

    fnSignInOauth = (provider) => {
        window.location.href = '/api/auth/' + provider;
    }
}
