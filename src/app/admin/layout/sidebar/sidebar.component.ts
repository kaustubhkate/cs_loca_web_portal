import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '../../../shared/models/user';
import { GenericTerm } from '../../generic/generic-term';
import { TokenStorageService } from '../../../shared/auth/token-storage.service';
import { MatDialog } from '@angular/material';
import { AppNotificationComponent } from '../../dialog/app-notification/app-notification.component';
import { TourNotificationComponent } from '../../dialog/tour-notification/tour-notification.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent implements OnInit {
  user: User;
  generic = new GenericTerm();
  menuItems:any[];
  roles : string[] = [];
  constructor(private tokeService: TokenStorageService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.roles = this.tokeService.getAuthorities();
  }

  hideSubmenu($event) {
    $('mat-list-item').removeClass('open');
  }

  
  openAppUpdateDialog(){
    let dialogRef = this.dialog.open(AppNotificationComponent, {
      width: '500px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        //this.exampleDatabase.dataChange.value.push(this.roleService.getDialogData());
        // this.refreshTable();
      }
    });
  }

  openTourBasedNotification(){
    let dialogRef = this.dialog.open(TourNotificationComponent, {
      width: '600px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        //this.exampleDatabase.dataChange.value.push(this.roleService.getDialogData());
        // this.refreshTable();
      }
    });
  }

}
