import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  sexValues = [{gender: 'Male', value: 1}, {gender: 'Female', value: 2}];
  user: User;
  constructor(public userService: UserService, private toastr: ToastrService,
  private router: Router) {
   }

  ngOnInit() {
    this.resetForm();
  }

  registerBtn() {
    this.userService.registerUser(this.user)
     .subscribe(
       val => {
        this.toastr.success('User registration successful');
        this.router.navigate(['/user/login']);
        this.resetForm();
      },
      (response: HttpErrorResponse) => {
        this.toastr.error('User registration error');
        this.toastr.error(response.message);
      },
      () => {
      }
    );
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.user = {
      Password: '',
      Email: '',
      Firstname: '',
      Lastname: '',
      Sex: 1,
      Speciality: ''
    };
  }
    // OnSubmit(form: NgForm) {
    //  this.userService.registerUser(form.value)
    //  .subscribe(
    //    val => {
    //     this.toastr.success('User registration successful');
    //     this.resetForm(form);
    //   },
    //   response => {
    //     this.toastr.error('User registration error');
    //     this.toastr.error(response.message);
    //   },
    //   () => {
    //   }
    // );
    // }

}
