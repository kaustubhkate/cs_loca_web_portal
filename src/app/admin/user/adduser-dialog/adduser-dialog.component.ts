import { Component, OnInit, ElementRef } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Role } from '../../../shared/models/role';
import { RoleService } from '../../../shared/services/role.service';
import { User } from '../../../shared/models/user';
import { UserService } from '../../../shared/services/user.service';
import { AddDialogComponent } from '../role/add-dialog/add-dialog.component';
import { State } from '../../../shared/models/state';

import { GenericTerm } from '../../generic/generic-term';
import { Router, ActivatedRoute } from '@angular/router';
import { ToasterService } from '../../../shared/services/toaster.service';
import { CountryState } from '../../../shared/models/countrystate';
import { MatDialog } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { ExperienceError } from '../../../shared/models/experience-error';
import { Location } from '@angular/common';
import { UniqueEntryDailogComponent } from '../../dialog/unique-entry-dailog/unique-entry-dailog.component';
import { emailValidator } from '../../directives/email-validator.directive';
import { RestApi } from '../../../shared/api/rest-api';
import { UserRoleLoca } from '../../../shared/loca-model/user.role';
import { UserLoca } from '../../../shared/loca-model/userloca';
import { SaveUserLoca } from '../../../shared/loca-model/save-locauser';
import { UserResponse } from '../../../shared/loca-model/user.response';

@Component({
  selector: 'app-adduser-dialog',
  templateUrl: './adduser-dialog.component.html',
  styleUrls: ['./adduser-dialog.component.scss'],

})
export class AdduserDialogComponent implements OnInit {

  userForm: FormGroup;
  countrylist: CountryState[];
  statelist: string[];
  selectedFile: File = null;
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  pokemonControl = new FormControl();
  myControl: FormControl = new FormControl();
  myFile: File;
  url = '';
  generic = new GenericTerm();
  loaderText: string = 'Please wait';
  loadingTime: number = 3000;
  maxSize: number = 10485760;
  title: string = "Add";
  maxDate = new Date();
  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  userroles: UserRoleLoca[];
  role = new Role();
  foundRole: any;
  user : any;
  editUser = new UserResponse();
  countries: string[];
  states: State[];
  data: any;
  checkedUsername: boolean = false;
  checkedUseremail: boolean = false;
  id: number;
  sub: any;
  test: boolean;
  stateslist: string[];
  selectedCountryState: CountryState;
  isLoadingResults: boolean = false;
  user2 = new User();
  expError = new ExperienceError();
  isUpdate: boolean = false;
  roleIds: string[] = [];
  roleId: string;
  // submitRoles: UserRoleLoca[] = [];
  disableButton: Boolean;
  api = new RestApi();
  editUsername: string = '';
  editedUserId: number = 0;

  constructor(
    private roleService: RoleService,
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
    private _formBuilder: FormBuilder,
    private toasterService: ToasterService,
    // private _dataService: CountryStateService,
    public dialog: MatDialog) {
    this.disableButton = false
  }

  ngOnInit() {
    // this.countries = this._dataService.getCountries();
    this.createForm();
    this.getUserRoles();
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.editUsername = params['id'];
      console.log("this. current user mail id" , this.editUsername);
      if (this.editUsername != null && this.editUsername != '') {

        this.isLoadingResults = true;
        this.userService.getUserByUsername(this.editUsername).subscribe(result => {
          this.editUser = result;
          this.isLoadingResults = false;
          if (this.editUser != null) {
            this.setFormValue();
            // this.onSelect(this.editUser.country);
            this.title = 'Update';
            this.isUpdate = true;
            // if (this.editUser.picture != null) {
            //   this.url = this.api.DUMMY_URL + this.editUser.picture;
            // } else {
            //   this.url = "data:image/png;base64," + this.generic.IMAGEDATA + "";
            // }
          }
        }, err=>{
          this.isLoadingResults = false;
        });
      } else {
        this.url = "data:image/png;base64," + this.generic.IMAGEDATA + "";
      }
    });
  }


  createForm() {
    this.userForm = this._formBuilder.group({
      id: [''],
      firstname: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.minLength(3), emailValidator()]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      contactno: ['', [Validators.required , Validators.pattern('^[^A-Za-z]*$') ]],
      status: ['N', [Validators.required]],
      roles: ['', [Validators.required]]
    })
  }

  get firstname() { return this.userForm.get('firstname'); }
  get email() { return this.userForm.get('email'); }
  get lastname() { return this.userForm.get('lastname'); }
 
  get status() { return this.userForm.get('status'); }
  get myroles() { return this.userForm.get('roles'); }
  get contactno() { return this.userForm.get('contactno'); }
  get password() { return this.userForm.get('password'); }

  setFormValue() {
    this.editedUserId = this.editUser.returnObject.userId;
    this.userForm.patchValue({
      id: this.editUser.returnObject.userId,
      firstname: this.editUser.returnObject.firstName,
      lastname: this.editUser.returnObject.lastName,
      email: this.editUser.returnObject.username,
      contactno: this.editUser.returnObject.phone,
      status: this.editUser.returnObject.isDeleted,
      password: this.editUser.returnObject.password
    })
    this.setRoleValue(this.editUser.returnObject.roles);
  }

  setRoleValue(roles: UserRoleLoca[]) {
    for (let i = 0; i < roles.length; i++) {
      this.roleIds.push(roles[i].name);
      this.roleId = roles[i].name;
    }
    console.log("roleIds", this.roleIds);
    this.userForm.patchValue({
      roles: this.roleIds
    })
  }

  getUserRoles(): void {
    this.roleService.getAllRole()
      .subscribe(data => {
        
        this.userroles = data.returnObject.content;
        console.log("Role Data List =>",this.userroles);
      });
  }

  // getCountryStateList() {
  //   this.userService.getAllCountryStateList().subscribe(data => {
  //     this.countrylist = data;
  //   })
  // }

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
    this.disableButton = true;
    const formModel = this.userForm.value;
    this.user = this.getUserData(formModel);
    const userWithRole: any ={
      user: this.user ,
      roles: formModel.roles as string[]
    }

    // console.log("user Data===>", userWithRole);
    // this.setRoleInUser(formModel.roles);
    this.isLoadingResults = true;
    
    if (this.isUpdate) {
      this.userService.updateUser(userWithRole).subscribe(data => {
        // console.log("data", data);
        this.disableButton = false;
        // if (data) {
        //   this.user2 = data;
        //   if (this.user2 != null && this.selectedFile != null) {
        //     this.userService.uploadImage(this.user2.id, this.selectedFile)
        //   }
        //   this.toasterService.openSuccessSnackBar('Successfully updated', '', 2000);
        //   this.isLoadingResults = false;
        // }
        this.location.back();
      }, (err: HttpErrorResponse) => {
        // console.log("error", err);
        this.disableButton = false;
        const dialogRef = this.dialog.open(UniqueEntryDailogComponent, {
          width: '400px',
          data: { title: 'Sorry!!!', errorData: err },
          disableClose: true
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.isLoadingResults = false;
          } else {
            this.isLoadingResults = false;
          }
        });
      });
    } else {
      console.log("new user===> ", userWithRole);
      this.userService.addUser(userWithRole).subscribe(data => {
        this.disableButton = false;
        console.log("data", data);
        if (data) {
          // this.user2 = data;
          // if (this.user2 != null && this.selectedFile != null) {
          //   this.userService.uploadImage(this.user2.id, this.selectedFile)
          // }
          this.toasterService.openSuccessSnackBar('Successfully added', '', 2000);
          this.isLoadingResults = false;
        }
        this.location.back();
      }, (err: HttpErrorResponse) => {
        this.disableButton = false;
        // console.log("error", err);
        const dialogRef = this.dialog.open(UniqueEntryDailogComponent, {
          width: '400px',
          data: { title: 'Sorry!!!', errorData: err },
          disableClose: true
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.isLoadingResults = false;
          } else {
            this.isLoadingResults = false;
          }
        });
      });
    }
  }


  getUserData(formModel: any): any {
    let editedCurrentId: number = 0;
    // console.log("here is a status",formModel.status)
    let isStatus: boolean = false;
    if(this.editedUserId != null || this.editedUserId > 0){
      editedCurrentId = this.editedUserId;
      isStatus = formModel.status
    }else{
      editedCurrentId = 0;
      isStatus = formModel.status
    }

     const user = { 
      userId : editedCurrentId,
      firstName:formModel.firstname,
      lastName:formModel.lastname,
      username:formModel.email,
      password:formModel.password,
      phone:formModel.contactno,
      companyName:"MJB",
      createdBy:localStorage.getItem('userId'),
     isDeleted: Boolean(isStatus)
    };
    return user;
  }
 
  setRoleInUser(roleId: number) {
    let userRole : string[] = [];
    if (roleId != null && roleId > 0) {
      let myRole = this.userroles.find(x => x.name == name);
      userRole.push(myRole.name);
      this.user.roles = userRole;
      console.log();
    }
  }

  checkUsername(value: string) {
    // if (this.user.id == null || this.user.id == undefined) {
      // this.userService.checkUserByUsername(value).subscribe(result => {
      //   if (result) {
      //     this.checkedUsername = result;
      //   }
      // })
    // }
  }

  checkEmail(value: string) {
    // if (this.user.id == null || this.user.id == undefined) {
      // this.userService.checkUserByUseremail(value).subscribe(result => {
      //   if (result) {
      //     this.checkedUseremail = result;
      //   }
      // })
    // }
  }

  addRoleDailog(): void {
    let dialogRef = this.dialog.open(AddDialogComponent, {
      width: '350px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getUserRoles();
      }
    });
  }

  onChange(rowId: number){
if(this.isUpdate){
  
  let status: number = 0;
  const formModel = this.userForm.value
  if(formModel.status){
    status = 0
  }else{
    status = 1;
  }
  console.log(rowId)
  this.userService.changeStatusUpdate(rowId,status).subscribe(data =>{
    
    if (data.status =="SUCCESS") {
      this.toasterService.openSuccessSnackBar('Successfully deleted', 'ok', 1000);
      // this.dataSource = [...this.data];
      // this.refresh();
    }else{
      this.toasterService.showToaster('Error occurred. Details: ' + data.errorMessage, '', 3000);
      // this.refresh();
    }
  })
}
}
    

}

