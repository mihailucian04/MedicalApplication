import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

  constructor() { }

  ngOnInit() {
  }

  registerBtn() {
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
