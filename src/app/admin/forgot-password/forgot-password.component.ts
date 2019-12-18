import { Component, OnInit, ViewChild } from '@angular/core';
import { ThemeService } from '../../shared/services/theme.service';
import { FormControl, Validators } from '@angular/forms';
import { LoginService } from '../../shared/services/login.service';
import { Router } from '@angular/router';
import { ExperienceError } from '../../shared/models/experience-error';
import { MatDialog, MatProgressBar, MatButton } from '@angular/material';
import { emailValidator } from '../directives/email-validator.directive';
import { PasswordDailogComponent } from '../dialog/password-dailog/password-dailog.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  color = 'primary';
  submitted: boolean = false;
  errorMessage: string;
  successMessage: string;
  userEmail: string;
  expError: ExperienceError;
  mode = 'determinate';
  dateString: string;

  @ViewChild(MatProgressBar, { static: false }) progressBar: MatProgressBar;
  @ViewChild(MatButton, { static: false }) submitButton: MatButton;

  email = new FormControl('', [Validators.required, emailValidator()]);
  validOtp = new FormControl('');
  constructor(private themeService: ThemeService, private loginService: LoginService, private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
    let myDate = new Date();
    myDate.setMinutes(myDate.getMinutes() + myDate.getTimezoneOffset());
    let d1 = myDate.getFullYear();
    let d2 = myDate.getMonth() + 1;
    let d3 = myDate.getDate().toString();
    if (d3.length <= 1) {
      d3 = "0" + d3;
    }
    let d4 = myDate.getHours().toString();
    if (d4.length <= 1) {
      d4 = "0" + d4;
    }
    let d5 = myDate.getMinutes().toString();
    if (d3.length <= 1) {
      d5 = "0" + d5;
    }
    let d6 = myDate.getSeconds().toString();
    if (d6.length <= 1) {
      d6 = "0" + d6;
    }
    this.dateString = `${d1}-${d2}-${d3}T${d4}:${d5}:${d6}Z`;
  }

  onSubmit() {
    this.submitted = true;
    this.userEmail = this.email.value;
    this.submitButton.disabled = true;
    // this.progressBar.mode = 'indeterminate';
    // this.validOtp.setValue('')
    this.progressBar.mode = 'determinate';
    this.submitButton.disabled = false;
    this.submitted = false;
    this.successMessage = "We've sent an email to";
    console.log("recovering password =>", this.userEmail);
    // this.loginService.forgotPassword(this.userEmail, this.dateString).subscribe(result => {
    //   console.log("result", result);
    //   if (result != null) {
    //     this.successMessage = "We've sent an email to";
    //   }
    //   this.progressBar.mode = 'determinate';
    //   this.submitButton.disabled = false;
    //   this.submitted = false;
    // },
    //   error => {
    //     this.expError = error.error;
    //     this.errorMessage = error; //this.expError.errorMessage;
    //     this.progressBar.mode = 'determinate';
    //     this.submitButton.disabled = false;
    //     this.submitted = false;
    //   });
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  onSubmitOTP() {
    if (this.validOtp.value.length == 4) {
      this.loginService.verifyOTP(this.userEmail, this.validOtp.value).subscribe(data => {
        if (data.status == "SUCCESS") {
          // this.otpVerified = true;
          this.openUpdatePasswordDialog(this.userEmail, this.validOtp.value);
        }else{
          this.successMessage = "OTP not verify of ";
        }
      }, error => {
        this.expError = error.error;
        this.errorMessage = error; //this.expError.errorMessage;
        this.progressBar.mode = 'determinate';
        this.submitButton.disabled = false;
        this.submitted = false;
      });
    } else {
      this.successMessage = "Provide proper OTP ";
    }

  }

  // reset password functionality
  openUpdatePasswordDialog(userEmail: string, OTPValid: string) {
  
    let dialogRef = this.dialog.open(PasswordDailogComponent, {
      width: '350px',
      disableClose: true,
      data: { useremail: userEmail, otp: OTPValid }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        //this.exampleDatabase.dataChange.value.push(this.roleService.getDialogData());
        // this.refreshTable();
      }
    });
  }

  confirmAdd(){
    console.log("check new password");
  }

}
