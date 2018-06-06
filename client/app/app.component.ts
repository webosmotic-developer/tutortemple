import {Component, ElementRef} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private currentState: string;
  public hideHeader = true;
  public hideFooter = true;

  constructor(public el: ElementRef,
              private _router: Router) {
    this._router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.currentState = e.url;
        if (this.currentState.indexOf('signup') > -1 || this.currentState.indexOf('signin') > -1) {
          this.hideHeader = true;
          this.hideFooter = true;
        } else {
          this.hideHeader = false;
          this.hideFooter = false;
        }
      }
    });
  }

}
