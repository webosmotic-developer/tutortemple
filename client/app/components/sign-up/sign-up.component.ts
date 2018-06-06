import {Component, OnInit} from '@angular/core';
import {Constant} from '../../shared/constant';
import {SignupService} from '../../shared/services/signup-service/signup.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

interface SignUp {
    email: string;
    password: string;
    cfPassword: string;
}

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
    signUpObj: SignUp;
    public emailRegEx: any = Constant.EMAIL_REG_EX;
    public passwordRegEx: any = Constant.PASSWORD_REG_EX;
    isPasswordMatching: boolean;
    public toltip: boolean;


    constructor(private signUpService: SignupService, private _router: Router, private toastr: ToastrService) {
        this.signUpObj = {
            'email': '',
            'password': '',
            'cfPassword': '',
        };
    }

    ngOnInit() {
    }


    // Check if password and confirm password match
    fnValidatePassword() {
        if (this.signUpObj.password !== this.signUpObj.cfPassword) {
            this.isPasswordMatching = false;
        } else {
            this.isPasswordMatching = true;
        }
    }

    // registered new tutor user
    fnSignUp() {
        if (this.signUpService.registerUser(this.signUpObj)) {
            this._router.navigate(['signin']);
            this.toastr.success('registered successfully!', 'Success!');
        } else {
            this._router.navigate(['signup']);
            this.toastr.error('registered Not successfully!', 'Error!');
        }
    }

    fnSignInOauth = (provider) => {
        window.location.href = '/api/auth/' + provider;
    }
}
