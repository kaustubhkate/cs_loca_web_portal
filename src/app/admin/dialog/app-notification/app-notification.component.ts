import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ToasterService } from '../../../shared/services/toaster.service';

import { TokenStorageService } from '../../../shared/auth/token-storage.service';

@Component({
  selector: 'app-app-notification',
  templateUrl: './app-notification.component.html',
  styleUrls: ['./app-notification.component.scss']
})
export class AppNotificationComponent implements OnInit {
  id:number;
  updatePwdForm:FormGroup;
  isLoadingResults:boolean = false;
  constructor(public dialogRef: MatDialogRef<AppNotificationComponent>, 
    private toasterService:ToasterService,
    
    public tokenService: TokenStorageService,
    private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.id = parseInt(localStorage.getItem("experienceid"));
    this.createForm();
  }

  createForm(){
    this.updatePwdForm = this.formBuilder.group({
      type: ['', [Validators.required]],
      title: ['', [Validators.required, Validators.minLength(4)]],
      desc: ['', [Validators.required, Validators.minLength(4)]],
    })
  }

  get type(){
    return this.updatePwdForm.get('type');
  }

  get title(){
    return this.updatePwdForm.get('title');
  }

  get desc(){
    return this.updatePwdForm.get('desc');
  }

  confirmAdd() : void{
    this.isLoadingResults = true;
    const formModel = this.updatePwdForm.value;
    let body = {
      name: formModel.title,
      title: formModel.title,
      description : formModel.desc,
      tourid : 0,
      createdby:this.tokenService.getUserId(),
      status: 'pending',
      type: 'APP',
      fromapp: 'WEB'
    }
    if(formModel.type == 'S'){
      // this.firebaseService.sendNotificationAllStaff(body).subscribe(data=>{
      //   this.toasterService.openSuccessSnackBar('Notification sent to all staff.','ok',2000);
      //   this.isLoadingResults = false;
      //   this.dialogRef.close(1);
      // }, err=>{
      //   this.isLoadingResults = false;
      //   this.dialogRef.close(0);
      // });
    }else{
      // this.firebaseService.sendNotificationAllStudent(body).subscribe(data=>{
      //   this.toasterService.openSuccessSnackBar('Notification sent to all student.','ok',2000);
      //   this.isLoadingResults = false;
      //   this.dialogRef.close(1)
      // }, err=>{
      //   this.isLoadingResults = false;
      //   this.dialogRef.close(0);
      // });
    }
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

}
