import {Component, OnInit} from '@angular/core';
import {Constant} from '../../shared/constant';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../shared/services/auth-service/auth.service';

interface SignUp {
    email: string;
    password: string;
    roles: string;
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
    public tooltip: boolean;


    constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {
        this.signUpObj = {
            'email': '',
            'password': '',
            'roles': '',
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

    // register new  user
    fnSignUp() {
        const signUpObj = {
            email: this.signUpObj.email,
            password: this.signUpObj.password,
            roles: this.signUpObj.roles
        };
        if (signUpObj) {
            this.authService.fnSignUp(signUpObj).then(() => {
                this.router.navigate(['signin']);
                this.toastr.success(' User has been registered successfully!', 'Success!');
            }).catch((error: any) => {
                if (error) {
                    this.router.navigate(['signup']);
                    this.toastr.error('Something went wrong. Please try again', 'Error!');
                }
            });
        }

    }

    fnSignInOauth = (provider) => {
        window.location.href = '/api/auth/' + provider;
    }
}
