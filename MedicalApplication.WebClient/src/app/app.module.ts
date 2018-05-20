import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import {MatButtonModule, MatCheckboxModule, MatIcon, MatIconModule, MatFormFieldModule,
   MatInputModule, MatMenuModule, MatTableModule, MatSelectModule} from '@angular/material';
import { SignInComponent } from './components/user/sign-in/sign-in.component';
import { SignUpComponent } from './components/user/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import { UserService } from './services/user.service';
import { RouterModule } from '@angular/router';
import { appRoutes, routing } from './routes';
import {MatCardModule} from '@angular/material/card';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { MsgIconBtnComponent } from './shared/msgiconbtn/msgiconbtn.component';
import { FigurecardComponent } from './shared/figurecard/figurecard.component';
import { ImagecardComponent } from './shared/imagecard/imagecard.component';
import { HeaderComponent } from './shared/header/header.component';
import { RootComponent } from './components/root/root.component';
import { SettingsService } from './services/settings.service';
import { SidebarComponent } from './sidebar/sidebar/sidebar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RoutesService } from './services/routes.service';
import { SettingsComponent } from './components/settings/settings.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CdkTableModule } from '@angular/cdk/table';
import { PatientComponent } from './components/patient/patient.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    HomeComponent,
    NavbarComponent,
    MsgIconBtnComponent,
    FigurecardComponent,
    ImagecardComponent,
    HeaderComponent,
    RootComponent,
    SidebarComponent,
    ProfileComponent,
    SettingsComponent,
    PageNotFoundComponent,
    PatientComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    NoopAnimationsModule,
    MatMenuModule,
    MatTableModule,
    MatSelectModule,
    CdkTableModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    routing,
    HttpClientModule
  ],
  exports:
    [MatButtonModule,
     MatCheckboxModule,
     MatCardModule,
     MatIconModule,
     MatFormFieldModule,
     MatInputModule,
     MatMenuModule,
     CdkTableModule,
     MatTableModule,
     MatSelectModule
    ],
  providers: [  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
     UserService, AuthGuard, SettingsService, RoutesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
