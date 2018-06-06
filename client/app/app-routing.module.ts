import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {SignInComponent} from './components/sign-in/sign-in.component';
import {HowItWorksComponent} from './components/how-it-works/how-it-works.component';
import {ContactsComponent} from './components/contacts/contacts.component';
import {NonAuthGuardService} from './shared/services/non-auth-guard/non-auth-guard.service';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {AuthGuardService} from './shared/services/auth-guard/auth-guard.service';

const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]},
    {path: 'home', component: HomeComponent},
    {path: 'signin', component: SignInComponent, canActivate: [NonAuthGuardService]},
    {path: 'signup', component: SignUpComponent, canActivate: [NonAuthGuardService]},
    {path: 'how-it-works', component: HowItWorksComponent},
    {path: 'contacts', component: ContactsComponent},
    {path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
