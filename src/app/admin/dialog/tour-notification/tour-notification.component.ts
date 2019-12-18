import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ToasterService } from '../../../shared/services/toaster.service';
import { TokenStorageService } from '../../../shared/auth/token-storage.service';
import { Tour } from '../../../shared/models/tour';

@Component({
  selector: 'app-tour-notification',
  templateUrl: './tour-notification.component.html',
  styleUrls: ['./tour-notification.component.scss']
})
export class TourNotificationComponent implements OnInit {

  id: number;
  notiForm: FormGroup;
  isLoadingResults: boolean = false;
  tourList: Tour[];
  constructor(public dialogRef: MatDialogRef<TourNotificationComponent>,
    private toasterService: ToasterService,
    public tokenService: TokenStorageService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.id = parseInt(localStorage.getItem("experienceid"));
    this.getTours();
    this.createForm();
  }

  createForm() {
    this.notiForm = this.formBuilder.group({
      type: ['', [Validators.required]],
      title: ['', [Validators.required, Validators.minLength(4)]],
      desc: ['', [Validators.required, Validators.minLength(4)]],
      tourid: ['', [Validators.required]]
    })
  }

  get tourid() {
    return this.notiForm.get('tourid');
  }
  get type() {
    return this.notiForm.get('type');
  }
  get title() {
    return this.notiForm.get('title');
  }
  get desc() {
    return this.notiForm.get('desc');
  }

  getTours(): void {
    this.isLoadingResults = true;
    // this.tourService.getPublishedTourList().subscribe(result => {
    //   this.isLoadingResults = false;
    //   this.tourList = result
    // }, err => {
    //   this.isLoadingResults = false;
    // });
  }

  confirmAdd(): void {
    this.isLoadingResults = true;
    const formModel = this.notiForm.value;
    let body = {
      name: formModel.title,
      title: formModel.title,
      description: formModel.desc,
      tourid: formModel.tourid,
      createdby: this.tokenService.getUserId(),
      status: 'pending',
      type: formModel.type,
      fromapp: 'WEB'
    }
    console.log("body", JSON.stringify(body));
    // this.firebaseService.sendNotificationAllUser(body).subscribe(data => {
    //   this.toasterService.openSuccessSnackBar('Notification sent.', 'ok', 2000);
    //   this.isLoadingResults = false;
    //   this.dialogRef.close(1)
    // }, err => {
    //   this.isLoadingResults = false;
    //   this.dialogRef.close(0);
    // });
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }


}
