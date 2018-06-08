import {ChangeDetectorRef, Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {strictEqual} from 'assert';
import {AuthService} from '../../services/auth-service/auth.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private currentState: string;
  public hideTransparant = true;
  public isLoggedIn: boolean;

  constructor(public el: ElementRef,
              private _router: Router,
              private authService: AuthService,
              private chRef: ChangeDetectorRef,
              private toastr: ToastrService) {
    this._router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.currentState = e.url;

        if (this.currentState.indexOf('home') > -1) {
          this.hideTransparant = false;
        } else {
          this.hideTransparant = true;
        }
      }
        this.fnUpdateMemberVariable();
    });
  }

  @HostListener('window:scroll', ['$event'])

  checkScroll() {
    if (this.currentState.indexOf('home') > -1) {
      const componentPosition = this.el.nativeElement.children[0].children;
      const scrollPosition = window.pageYOffset;
      if (scrollPosition >= 130) {
        componentPosition[0].classList.remove('navbar-transparent');
        componentPosition[1].classList.remove('navbar-transparent');
      } else {
        componentPosition[0].classList.add('navbar-transparent');
        componentPosition[1].classList.add('navbar-transparent');
      }
    }
  }

    fnUpdateMemberVariable() {
        this.isLoggedIn = this.authService.fnIsLoggedIn();
        this.chRef.detectChanges();
    }

    fnSignOut() {
        this.authService.fnSignOut()
            .then(() => {
                this._router.navigate(['']);
                this.toastr.success('See you soon.');
                this.fnUpdateMemberVariable();
            });
    }

  ngOnInit() {
  }

}
