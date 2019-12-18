import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { LoginService } from '../../../shared/services/login.service';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ToasterService } from '../../../shared/services/toaster.service';
import { CompairValidator } from '../../directives/compare.directive';
import { User } from '../../../shared/models/user';

@Component({
  selector: 'app-update-password-dailog',
  templateUrl: './update-password-dailog.component.html',
  styleUrls: ['./update-password-dailog.component.scss']
})
export class UpdatePasswordDailogComponent implements OnInit {
  id:number;
  user = new User();
  updatePwdForm:FormGroup;
  constructor(public dialogRef: MatDialogRef<UpdatePasswordDailogComponent>, 
    private loginService:LoginService, 
    private router:Router, 
    private toasterService:ToasterService,
    private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.id = parseInt(localStorage.getItem("experienceid"));
    this.createForm();
  }

  createForm(){
    this.updatePwdForm = this.formBuilder.group({
      userPwd: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      confirmPwd: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15), CompairValidator('userPwd')]],
    })
  }

  get userPwd(){
    return this.updatePwdForm.get('userPwd');
  }

  get confirmPwd(){
    return this.updatePwdForm.get('confirmPwd');
  }

  public confirmAdd(): void {
    const formModel = this.updatePwdForm.value;
    const userPwd = formModel.userPwd;
    this.user.password = userPwd;
    this.loginService.updatePassword(this.id, this.user).subscribe(data=> {
      if(data){
        this.toasterService.openSuccessSnackBar('Password updated successfully','ok',2000);
      }else{
        this.toasterService.openSuccessSnackBar('Something is wrong','ok',2000);
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

}
