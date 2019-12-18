import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ToasterService } from '../../../shared/services/toaster.service';
import { CompairValidator } from '../../directives/compare.directive';
import { Candidate } from '../../../shared/models/candidate';
import { AuthLoginInfo } from '../../../shared/auth/login-info';
import { UserLoca } from '../../../shared/loca-model/userloca';
// import { CandidateService } from '../../../shared/services/candidate.service';

@Component({
  selector: 'app-password-dailog',
  templateUrl: './password-dailog.component.html',
  styleUrls: ['./password-dailog.component.scss']
})
export class PasswordDailogComponent implements OnInit {
  candidate = new Candidate();
  updatePwdForm: FormGroup;
  loginInfo: AuthLoginInfo;
  isLoadingResults: boolean = false;
  disableButton: boolean;

  user = new UserLoca();
  userEmail: string;
  OTP : string;
  constructor(public dialogRef: MatDialogRef<PasswordDailogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    // private candidateService: CandidateService,
    private toasterService: ToasterService,
    private formBuilder: FormBuilder) {
    this.disableButton = false;
  }

  
  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.createForm();
    if (this.data) {
      this.userEmail = this.data.useremail;
      this.OTP = this.data.otp;
    }
  }

  createForm() {
    this.updatePwdForm = this.formBuilder.group({
      userPwd: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      confirmPwd: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15), CompairValidator('userPwd')]],
    })
  }

  get userPwd() {
    return this.updatePwdForm.get('userPwd');
  }

  get confirmPwd() {
    return this.updatePwdForm.get('confirmPwd');
  }

  public confirmAdd(): void {
    const formModel = this.updatePwdForm.value;
    this.loginInfo = new AuthLoginInfo(
      this.candidate.username,
      formModel.userPwd);
    this.isLoadingResults = true;
    this.disableButton = true;
    // this.candidateService.sendEmail(this.candidate.id, this.loginInfo).subscribe(data => {
    //   this.isLoadingResults = false;
    //   this.disableButton = false;
    //   if (data) {
    //     this.toasterService.openSuccessSnackBar('Password updated successfully', 'ok', 3000);
    //   } else {
    //     this.toasterService.openSuccessSnackBar('Something is wrong', 'ok', 3000);
    //   }
    //   this.dialogRef.close(data);
    // }, err => {
    //   this.isLoadingResults = false;
    //   this.disableButton = false;
    //   this.toasterService.openSuccessSnackBar('Something is wrong', 'ok', 5000);
    // });
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

}
