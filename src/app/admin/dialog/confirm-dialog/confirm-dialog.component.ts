import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RoleService } from '../../../shared/services/role.service';
import { UserService } from '../../../shared/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  title: string = 'Do you want to delete this row ?';

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private roleService:RoleService
  ) {
  }

  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    switch (this.data.type) {
      case "user":
        this.userService.deleteUser(this.data.id).subscribe(data =>{
        });
        break;
      case "role":
        this.roleService.deleteRoleLoca(this.data.id).subscribe(data =>{
          console.log("Record deleted");
        });
        break;
      
      default:
    }

  }



  ngOnInit() {

  }

}
