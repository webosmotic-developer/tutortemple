import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {NavbarComponent} from './shared/components/navbar/navbar.component';
import {FooterComponent} from './shared/components/footer/footer.component';
import {HomeComponent} from './components/home/home.component';
import {CardComponent} from './shared/components/card/card.component';
import {SlickSliderComponent} from './shared/components/slick-slider/slick-slider.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HoverImageComponent} from './shared/components/hover-image/hover-image.component';
import {HomeSearchComponent} from './shared/components/home-search/home-search.component';
import {TypeaheadModule} from 'ngx-bootstrap/typeahead';
import {FormsModule} from '@angular/forms';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {SignInComponent} from './components/sign-in/sign-in.component';

import {ReadJsonService} from './shared/services/read-json-service/read-json.service';
import {HowItWorksComponent} from './components/how-it-works/how-it-works.component';
import {ContactsComponent} from './components/contacts/contacts.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {ToastrModule} from 'ngx-toastr';
import {AuthGuardService} from './shared/services/auth-guard/auth-guard.service';
import {NonAuthGuardService} from './shared/services/non-auth-guard/non-auth-guard.service';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {AuthService} from './shared/services/auth-service/auth.service';
import {InterceptorProvider} from './shared/interceptor';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        FooterComponent,
        HomeComponent,
        CardComponent,
        SlickSliderComponent,
        HoverImageComponent,
        HomeSearchComponent,
        SignUpComponent,
        SignInComponent,
        HowItWorksComponent,
        ContactsComponent,
        DashboardComponent
    ],
    imports: [
        BrowserModule.withServerTransition({appId: 'tutor-temple'}),
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        BsDropdownModule.forRoot(),
        TypeaheadModule.forRoot(),
        BrowserAnimationsModule, // required animations module
        ToastrModule.forRoot(({
            timeOut: 2500,
            positionClass: 'toast-top-right',
            preventDuplicates: true,
        })) // ToastrModule added
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: InterceptorProvider, multi: true},
        ReadJsonService,
        AuthService,
        AuthGuardService,
        NonAuthGuardService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
