import { Component, OnInit, ViewChild, ElementRef, Inject, HostListener } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';


import { Role } from '../../../shared/models/role';
import { RoleService } from '../../../shared/services/role.service';
import { User } from '../../../shared/models/user';
import { UserService } from '../../../shared/services/user.service';

import { Country } from '../../../shared/models/country';
import { State } from '../../../shared/models/state';

import { Permissions } from '../../../shared/models/permissions';
import { AddDialogComponent } from '../role/add-dialog/add-dialog.component';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  selectedFile:File = null;
  email = new FormControl('', [Validators.required, Validators.email]);
  contactno = new FormControl(['', [Validators.pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/), Validators.required]]);
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  pokemonControl = new FormControl();
  myControl: FormControl = new FormControl();

  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  roles: Role[];
  role = new Role();
  foundRole:any;
  user = new User();
  countries: string[];
  states: State[];
  checkedUsername: boolean = false;
  checkedUseremail: boolean = false;

  constructor(public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roleService: RoleService,
    private userService: UserService,
    
    public dialog: MatDialog) { }

    
  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.getRoles();
    // this.countries = this._dataService.getCountries();
    if (this.data.id != null && this.data.id > 0) {
      this.user = this.data.user;
      //this.role = this.user.roles;
      this.foundRole = this.role[0].name;
      this.onSelect(this.user.country);
    } else {
      this.user.gender = "M";
      this.user.status = "N";
    }
  }

  getRoles(): void {
    this.roleService.getRoles()
      .subscribe(data => {
        let res = data;
        this.roles = res.content;
      });
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onSelect(country) {
    // this.states = this._dataService.getStates().filter((item) => item.country == country);
  }

  public confirmAdd(): void {
    //this.user.addedby = parseInt(localStorage.getItem("experienceid"));
    this.user.username = this.user.email;
    // this.userService.addUser(this.user);
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'Email is required' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  uploadFile(event, file: ElementRef) {
    let files1 = event.target.files[0];
    file['value'] = (files1) ? files1.name : '';
    this.selectedFile = files1;
  }

  checkUsername(value: string) {
    if (this.user.id == null || this.user.id == undefined) {
      // this.userService.checkUserByUsername(value).subscribe(result => {
      //   if (result) {
      //     this.checkedUsername = result;
      //   }
      // })
    }
  }

  checkEmail(value: string) {
    if (this.user.id == null || this.user.id == undefined) {
      // this.userService.checkUserByUseremail(value).subscribe(result => {
      //   if (result) {
      //     this.checkedUseremail = result;
      //   }
      // })
    }
  }

  addRoleDailog(): void {
    let dialogRef = this.dialog.open(AddDialogComponent, {
      width: '350px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        this.getRoles();
      }
    });
  }

}
