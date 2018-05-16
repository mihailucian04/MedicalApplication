import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/user/sign-up/sign-up.component';
import { SignInComponent } from './components/user/sign-in/sign-in.component';
import { RootComponent } from './components/root/root.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PatientComponent } from './components/patient/patient.component';
import { PatientDetailsComponent } from './components/patient/patient-details/patient-details.component';


export const appRoutes: Routes = [
    { path: '', component: SignInComponent },
    { path: 'user/login', component: SignInComponent },
    { path: 'user/signup', component: SignUpComponent} ,
    {path: 'dashboard',  component: RootComponent , children: [
        {path: 'home', component: HomeComponent, pathMatch: 'full'},
         {path: 'patient', component: PatientComponent, children :[
             {path: 'patient-details', component: PatientDetailsComponent, pathMatch: 'full'}
         ]},
        // {path: 'table', component: TableComponent},
        // {path: 'notification', component: NotificationComponent},
        // {path: 'alert', component: SweetAlertComponent},
         {path: 'settings', component: SettingsComponent, pathMatch: 'full'}
        // {path: 'components/price-table', component: PriceTableComponent},
        // {path: 'components/panels', component: PanelsComponent},
        // {path: 'components/wizard', component: WizardComponent}
      ]},
      { path: '**', component: PageNotFoundComponent }
    // {
    //     path: 'signup', component: UserComponent,
    //     children: [{ path: '', component: SignUpComponent }]
    // },
    // {
    //     path: 'login', component: UserComponent,
    //     children: [{ path: '', component: SignInComponent }]
    // },
];
export const routing = RouterModule.forRoot(appRoutes);
