import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { NgForm } from '@angular/forms';
import { User } from '../user.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  user = { Email : '', Pasword : ''};
  constructor(public userService: UserService, private toastr: ToastrService) {
   }

  ngOnInit() {
    // this.resetForm();
  }

  // resetForm(form?: NgForm) {
  //   if (form != null) {
  //     form.reset();
  //   }
  // }

  loginBtn() {
  }


}
