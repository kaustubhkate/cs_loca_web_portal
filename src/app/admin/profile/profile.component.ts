import { Component, OnInit, ElementRef } from '@angular/core';
import { User } from '../../shared/models/user';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { State } from '../../shared/models/state';

import { Router } from '@angular/router';
import { ToasterService } from '../../shared/services/toaster.service';
import { Role } from '../../shared/models/role';
import { Location } from '@angular/common';
import { GenericTerm } from '../generic/generic-term';
import { TokenStorageService } from '../../shared/auth/token-storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UniqueEntryDailogComponent } from '../dialog/unique-entry-dailog/unique-entry-dailog.component';
import { emailValidator } from '../directives/email-validator.directive';
import { RoleService } from '../../shared/services/role.service';
import { MatDialog } from '@angular/material';
import { CountryState } from '../../shared/models/countrystate';
import { RestApi } from '../../shared/api/rest-api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  userForm: FormGroup;
  countrylist: CountryState[];
  statelist: string[];
  selectedFile: File = null;
  myFile: File;
  url = '';
  generic = new GenericTerm();
  loaderText: string = 'Please wait';
  loadingTime: number = 3000;
  maxSize: number = 10485760;
  title: string = "View";
  maxDate = new Date();
  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  userroles: Role[];
  role = new Role();
  foundRole: any;
  user = new User();
  editUser = new User();
  countries: string[];
  states: State[];
  data: any;
  checkedUsername: boolean = false;
  checkedUseremail: boolean = false;
  id: number;
  sub: any;
  test: boolean;
  stateslist: string[];
  isLoadingResults: boolean = false;
  user2 = new User();
  isUpdate: boolean = false;
  roleIds: number[] = [];
  submitRoles: Role[] = [];
  isReadonly : boolean = true;
  api = new RestApi();

  constructor(
    private roleService: RoleService,
    private userService: UserService,
    private location: Location,
    private _formBuilder: FormBuilder,
    private dialog: MatDialog,
    private toasterService: ToasterService,
    private tokenService: TokenStorageService,
    ) {
  }

  ngOnInit() {
    
    this.createForm();
    this.getUserRoles();
    this.id = this.tokenService.getUserId();
    if (this.id != null && this.id > 0) {
      this.isLoadingResults = true;
      // this.userService.getUser(this.id).subscribe(result => {
      //   this.isLoadingResults = false;
      //   this.editUser = result;
      //   if (this.editUser != null) {
      //     this.setFormValue();
      //     this.onSelect(this.editUser.country);
      //     this.isUpdate = true;
      //     if (this.editUser.picture != null) {
      //       this.url = this.api.USER_PROFILE_PIC + this.editUser.picture;
      //     } else {
      //       this.url = "data:image/png;base64," + this.generic.IMAGEDATA + "";
      //     }
      //   }
      // }, err => {
      //   this.isLoadingResults = false;
      // });
    } else {
      this.url = "data:image/png;base64," + this.generic.IMAGEDATA + "";
    }
  }

  edit(val:boolean){
    this.isReadonly = val;
  }


  createForm() {
    this.userForm = this._formBuilder.group({
      id: [''],
      firstname: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.minLength(3), emailValidator()]],
      contactno: ['', [Validators.required, Validators.minLength(14)]],
      streetno: [''],
      streetname: [''],
      postalcode: [''],
      city: [''],
      country: [''],
      province: [''],
      status: ['Y', [Validators.required]],
      dob: ['', [Validators.required]],
      gender: ['M', [Validators.required]],
      roles: ['', [Validators.required]]
    })
  }

  get firstname() { return this.userForm.get('firstname'); }
  get email() { return this.userForm.get('email'); }
  get lastname() { return this.userForm.get('lastname'); }
  get username() { return this.userForm.get('username'); }
  get dob() { return this.userForm.get('dob'); }
  get status() { return this.userForm.get('status'); }
  get myroles() { return this.userForm.get('roles'); }
  get gender() { return this.userForm.get('gender'); }
  get contactno() { return this.userForm.get('contactno'); }

  setFormValue() {
    this.userForm.patchValue({
      id: this.editUser.id,
      firstname: this.editUser.firstname,
      lastname: this.editUser.lastname,
      username: this.editUser.username,
      email: this.editUser.email,
      contactno: this.editUser.contactno,
      streetno: this.editUser.streetno,
      streetname: this.editUser.streetname,
      postalcode: this.editUser.postalcode,
      city: this.editUser.city,
      country: this.editUser.country,
      province: this.editUser.province,
      status: this.editUser.status,
      dob: new Date(this.editUser.dob),
      gender: this.editUser.gender,
    })
    this.setRoleValue(this.editUser.roles);
  }

  setRoleValue(roles: Role[]) {
    for (let i = 0; i < roles.length; i++) {
      this.roleIds.push(roles[i].id);
    }
    console.log("roleIds", this.roleIds);
    this.userForm.patchValue({
      roles: this.roleIds
    })
  }

  getUserRoles(): void {
    this.roleService.getRoles()
      .subscribe(data => {
        let res = data;
        this.userroles = res.content;
      });
  }

  getCountryStateList() {
    this.userService.getAllCountryStateList().subscribe(data => {
      this.countrylist = data;
    })
  }

  uploadFile(event, file: ElementRef) {
    if (event.target.files && event.target.files[0]) {
      let files1 = event.target.files[0];
      file['value'] = (files1) ? files1.name : '';
      this.selectedFile = files1;

      if (this.selectedFile.size < this.maxSize) {
        let ftype = event.target.files[0].type;
        if (ftype) {
          switch (ftype) {
            case 'image/png':
              break;
            case 'image/jpg':
              break;
            case 'image/gif':
              break;
            case 'image/jpeg':
              break;
            default:
              alert("Invalid file format extension, only allowed formats are png/jpg/gif/jpeg.");
              file['value'] = '';
              this.selectedFile = null;
              this.url = "data:image/png;base64," + this.generic.IMAGEDATA + "";
          }
        }
        var reader = new FileReader();

        reader.onload = (event: any) => {
          this.url = event.target.result;
        }

        reader.readAsDataURL(this.selectedFile);
      } else {
        alert("Sorry! File size should be less than 10MB.");
        file['value'] = '';
        this.selectedFile = null;
        this.url = "data:image/png;base64," + this.generic.IMAGEDATA + "";
      }
    }
  }

  onNoClick(): void {
    this.location.back();
  }

  onSelect(country) {
    // this.states = this._dataService.getStates().filter((item) => item.country == country);
  }

  goBack() {
    this.location.back();
  }

  public confirmAdd(): void {
    const formModel = this.userForm.value;
    this.user = formModel;
    this.setRoleInUser(formModel.roles);
    console.log("user", JSON.stringify(this.user));
    this.isLoadingResults = true;
    let roles = this.tokenService.getAuthorities();
    if(roles.includes('STAFF')){
      // this.userService.updateStaff(this.user.id, this.user).subscribe(data => {
      //   console.log("data", data);
      //   if (data) {
      //     this.user2 = data;
      //     if (this.user2 != null && this.selectedFile != null) {
      //       this.userService.uploadImage(this.user2.id, this.selectedFile)
      //     }
      //     this.toasterService.openSuccessSnackBar('Successfully updated', '', 2000);
      //     this.isLoadingResults = false;
      //   }
      //   this.refresh();
      // }, (err: HttpErrorResponse) => {
      //   console.log("error", err);
      //   const dialogRef = this.dialog.open(UniqueEntryDailogComponent, {
      //     width: '400px',
      //     data: { title: 'Sorry!!!', errorData: err },
      //     disableClose: true
      //   });
      //   dialogRef.afterClosed().subscribe(result => {
      //     if (result) {
      //       this.isLoadingResults = false;
      //     } else {
      //       this.isLoadingResults = false;
      //     }
      //   });
      // });
    }else{
      // this.userService.update(this.user.id, this.user).subscribe(data => {
      //   console.log("data", data);
      //   if (data) {
      //     this.user2 = data;
      //     if (this.user2 != null && this.selectedFile != null) {
      //       this.userService.uploadImage(this.user2.id, this.selectedFile)
      //     }
      //     this.toasterService.openSuccessSnackBar('Successfully updated', '', 2000);
      //     this.isLoadingResults = false;
      //   }
      //   this.refresh();
      // }, (err: HttpErrorResponse) => {
      //   console.log("error", err);
      //   const dialogRef = this.dialog.open(UniqueEntryDailogComponent, {
      //     width: '400px',
      //     data: { title: 'Sorry!!!', errorData: err },
      //     disableClose: true
      //   });
      //   dialogRef.afterClosed().subscribe(result => {
      //     if (result) {
      //       this.isLoadingResults = false;
      //     } else {
      //       this.isLoadingResults = false;
      //     }
      //   });
      // });
    }

  }

  refresh(){
    this.location.back();
  }

  setRoleInUser(roleIds: number[]) {
    this.user.roles = [];
    for (let i = 0; i < roleIds.length; i++) {
      let myRole = this.userroles.find(x => x.id == roleIds[i]);
      this.submitRoles.push(myRole);
    }
    this.user.roles = this.submitRoles;
  }

}

