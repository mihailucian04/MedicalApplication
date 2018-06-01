import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { NgForm } from '@angular/forms';
import { User } from '../user.model';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  user = { Email : '', Password : ''};
  constructor(public userService: UserService, private toastr: ToastrService
      , private router: Router) {
   }

  ngOnInit() {
  }

  loginBtn() {
    this.userService.userAuthentication(this.user.Email, this.user.Password)
    .subscribe(
      (data: any) => {
        this.toastr.success('LogedIn successful');
        this.router.navigate(['/dashboard/home']);
        localStorage.setItem('access_token', data.access_token);
     },
     (err: HttpErrorResponse) => {
       this.toastr.error('The email or the password is incorrect.');
       console.log(err);
     },
     () => {
     });

  }


}
