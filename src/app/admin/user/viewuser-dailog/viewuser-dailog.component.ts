import { Component, OnInit, ElementRef, Inject, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { GenericTerm } from '../../generic/generic-term';
import { Role } from '../../../shared/models/role';
import { User } from '../../../shared/models/user';
import { State } from '../../../shared/models/state';
import { RoleService } from '../../../shared/services/role.service';

import { ImageDb } from '../../../shared/models/image-db';
import { Location } from '@angular/common';
import { emailValidator } from '../../directives/email-validator.directive';

@Component({
  selector: 'app-viewuser-dailog',
  templateUrl: './viewuser-dailog.component.html',
  styleUrls: ['./viewuser-dailog.component.scss']
})
export class ViewuserDailogComponent implements OnInit {

  url = '';
  generic= new GenericTerm();

  userroles: Role[];
  role = new Role();
  user = new User();
  countries: string[];
  states: State[];
  title: string;
  userForm:FormGroup;
  roleIds:number[] = [];
  maxDate= new Date();
  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(public dialogRef: MatDialogRef<ViewuserDailogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roleService: RoleService,
    // private _dataService: CountryStateService,
    private _formBuilder:FormBuilder) { }

    @HostListener('window:keyup.esc') onKeyUp() {
      this.dialogRef.close();
    }
  ngOnInit() {
    this.getUserRoles();
    this.createForm();
    // this.countries = this._dataService.getCountries();
    console.log("data", this.data);
    if(this.data!=null) {
      this.user = this.data.info;
      this.title = this.data.type;
      this.setFormValue();
      this.onSelect(this.user.country);
      if(this.user.picture !=null) {
        this.url = this.user.picture;
      }else{
        this.url = "data:image/png;base64," + this.generic.IMAGEDATA + "";
      }
    }
  }


  getUserRoles(): void {
    this.roleService.getRoles()
      .subscribe(data => {
        let res = data;
        this.userroles = res.content;
      });
  }

  createForm() {
    this.userForm = this._formBuilder.group({
      id: [''],
      firstname: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.minLength(3), emailValidator()]],
      contactno: ['', [Validators.required]],
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

  setFormValue(){
    this.userForm.patchValue({
      id: this.user.id,
      firstname: this.user.firstname,
      lastname: this.user.lastname,
      username: this.user.username,
      email: this.user.email,
      contactno: this.user.contactno,
      streetno: this.user.streetno,
      streetname: this.user.streetname,
      postalcode: this.user.postalcode,
      city: this.user.city,
      country: this.user.country,
      province:this.user.province,
      status: this.user.status,
      dob: new Date(this.user.dob),
      gender: this.user.gender,
    })
    this.setRoleValue(this.user.roles);
    console.log(this.user.roles)
  }

  setRoleValue(roles:Role[]){
    for(let i= 0; i < roles.length ; i++){
      this.roleIds.push(roles[i].id);
    }
    console.log("roleIds", this.roleIds);
    this.userForm.patchValue({
      roles: this.roleIds
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSelect(country) {
    // this.states = this._dataService.getStates().filter((item) => item.country == country);
  }

}

