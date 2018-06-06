import {Component, OnInit} from '@angular/core';
import {Constant} from '../../shared/constant';
import {SigninService} from '../../shared/services/signin-service/signin.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

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

    constructor(private signinService: SigninService, private toastr: ToastrService, private _router: Router) {
        this.signInObj = {
            'email': '',
            'password': ''
        };
    }

    ngOnInit() {
    }

    fnCheckAuthentication() {
        if (this.signinService.checkUserAuthentication(this.signInObj.email, this.signInObj.password)) {
            this.toastr.success('Login successfully!', 'Success!');
            this._router.navigate(['dashboard']);

        } else {
            this.toastr.error('Email and password invalid!', 'Error!');
        }
    }
}
