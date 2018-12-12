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
  typeOfSignUp = [{type: 'medic', value: true, label: 'Medic'},
   {type: 'lab', value: false, label: 'Laboratory'},
   {type: 'reg', value: false, label: 'Registry'}];

   isMedic = this.typeOfSignUp[0].value === true ? true : false;
   isLab = this.typeOfSignUp[1].value === true ? true : false;
   isReg = this.typeOfSignUp[2].value === true ? true : false;

   departmentNames = ['None'];
  // specialityValues = [{Role: 'Medic', Label: 'Medic'}, {Role: 'RegistryOffice', Label: 'Registry Office'},
  //  {Role: 'LaboratoryAnalysis', Label: 'Laboratory Analysis'}];
  user: User;
  constructor(public userService: UserService, private toastr: ToastrService,
  private router: Router) {
   }

  ngOnInit() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('medic_guid');
    localStorage.removeItem('user_role');
    this.resetForm();
    this.getDepartmentNames();
  }

  getDepartmentNames(): any {
    this.userService.getDepartmentNames()
    .subscribe(
      val => {
        this.departmentNames = val.map( x => x.Name);
        console.log(val);
     },
     (response: HttpErrorResponse) => {
       },
     () => {
     });
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
      Speciality: '', // this.specialityValues[0].Role
      Name: '',
      BedCount: 0,
      DepartmentName: this.departmentNames[0]
    };
  }
  checkAndUncheck(currentItem) {
      const index = this.typeOfSignUp.findIndex(x => x.label !== currentItem.label && x.value === true);
      if (index.toString() !== '-1') {
        this.typeOfSignUp[index].value = false;
      }
      this.resetForm();
      this.isMedic = this.typeOfSignUp[0].value === true ? true : false;
      this.isLab = this.typeOfSignUp[1].value === true ? true : false;
      this.isReg = this.typeOfSignUp[2].value === true ? true : false;
    }

    registerBtnLab() {
      this.userService.registerUserLab(this.user)
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

    registerBtnReg() {
      this.userService.registerUserReg(this.user)
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
}
