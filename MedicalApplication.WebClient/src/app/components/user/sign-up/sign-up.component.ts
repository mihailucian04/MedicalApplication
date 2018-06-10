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
  specialityValues = [{Role: 'Medic', Label: 'Medic'}, {Role: 'RegistryOffice', Label: 'Registry Office'},
   {Role: 'LaboratoryAnalysis', Label: 'Laboratory Analysis'}];
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
        if (response.error.Message) {
        this.toastr.error(response.error.Message);
        } else {
        this.toastr.error('User registration error');
        }

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
      Sex: this.sexValues[0].value,
      Speciality: this.specialityValues[0].Role
    };
  }

}
