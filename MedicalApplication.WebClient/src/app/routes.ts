import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
// import { UserComponent } from './components/user/user.component';
import { SignUpComponent } from './components/user/sign-up/sign-up.component';
import { SignInComponent } from './components/user/sign-in/sign-in.component';


export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: SignInComponent },
    { path: 'signup', component: SignUpComponent },
    // {
    //     path: 'signup', component: UserComponent,
    //     children: [{ path: '', component: SignUpComponent }]
    // },
    // {
    //     path: 'login', component: UserComponent,
    //     children: [{ path: '', component: SignInComponent }]
    // },
     { path : '', redirectTo: '/home', pathMatch : 'full'}

];
