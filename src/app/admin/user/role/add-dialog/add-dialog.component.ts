import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { RoleService } from '../../../../shared/services/role.service';
import { Role } from '../../../../shared/models/role';
import { ToasterService } from '../../../../shared/services/toaster.service';
import { HttpErrorResponse } from '@angular/common/http';

import { UniqueEntryDailogComponent } from '../../../dialog/unique-entry-dailog/unique-entry-dailog.component';
import { ExperienceError } from '../../../../shared/models/experience-error';
import { UserRoleLoca } from '../../../../shared/loca-model/user.role';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit {

  role = new UserRoleLoca();
  title = "Add";
  test: boolean;
  expError = new ExperienceError();
  disableButton: boolean;
  
  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roleService:RoleService,
    private dialog:MatDialog,
    private toasterService: ToasterService) {
      this.disableButton = false;
     }

     @HostListener('window:keyup.esc') onKeyUp() {
      this.dialogRef.close();
    }
  formControl = new FormControl('', [
    Validators.required
  ]);

  ngOnInit() {
    if(this.data != null) {
      this.role = this.data.role;
      this.title = "Update";
    }else{
      // this.role.status="Y";
    }
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  public confirmAdd(): void {
    this.disableButton = true;
    console.log(this.role);
    const roleTest: UserRoleLoca ={
      id: 0,
    name: this.role.name,
    isDeleted: false,
    createdBy: Number(localStorage.getItem('userId')),
    createdTs: new Date(),
    updatedBy: 0,
    updatedTs: new Date(),
    }
    this.roleService.addRole(roleTest).subscribe(data => {
      this.dialogRef.close(data);
      this.disableButton = false;
    }, (err: HttpErrorResponse) => {
      this.disableButton = false;
      this.expError = err.error;
      const dialogRef = this.dialog.open(UniqueEntryDailogComponent, {
        width: '400px',
        data: { title: 'Sorry!!!', errorData: this.expError },
        disableClose: true
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
        }
      });
    });
  }
}
