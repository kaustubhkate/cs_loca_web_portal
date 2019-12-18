import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  oldPassword = new FormControl('');
  newPassword = new FormControl('');
  confirmPassword = new FormControl('');

  constructor(
    private location: Location,
  ) { }

  ngOnInit() {
    
  }
  
  goBack() {
    this.location.back();
  }

  confirmAdd(){
    console.log(" Work in progress");
  }

}
