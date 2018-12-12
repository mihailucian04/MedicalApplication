import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { PatientModel } from '../patient.component';
import { UserService } from '../../../services/user.service';
import { PatientService } from '../../../services/patient.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-patient-dialog',
  templateUrl: './add-patient-dialog.component.html',
  styleUrls: ['./add-patient-dialog.component.css'],
  providers: [PatientService]
})
export class AddPatientDialogComponent implements OnInit {
  sexValues = [{gender: 'Male', value: 1}, {gender: 'Female', value: 2}];
  assurancedValues = [{label: 'Yes', value: true}, {label: 'No', value: false}];

  constructor(@Inject(MAT_DIALOG_DATA) public data: PatientModel,
   public userService: UserService, private patientService: PatientService
  , private toastr: ToastrService) { }

  ngOnInit() {
  }
  savePatient() {
    this.data.MedicGuid = localStorage.getItem('medic_guid');
    this.patientService.addPacient(this.data).subscribe(
      val => {
        this.toastr.success('User registration successful');
     },
     (response: HttpErrorResponse) => {
       console.log(response);
       if (response.error.Message) {
        this.toastr.error(response.error.Message);
       } else {
        this.toastr.error(response.message);
       }
     },
     () => {
     }
   );
  }
}
