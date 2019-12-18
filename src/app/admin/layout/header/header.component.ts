import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ThemeService } from '../../../shared/services/theme.service';
import { MatDialog } from '@angular/material';
import { User } from '../../../shared/models/user';
import { UpdatePasswordDailogComponent } from '../../dialog/update-password-dailog/update-password-dailog.component';
import { Router } from '@angular/router';
import { LoginService } from '../../../shared/services/login.service';
import { GenericTerm } from '../../generic/generic-term';
import { TokenStorageService } from '../../../shared/auth/token-storage.service';
import { UserService } from '../../../shared/services/user.service';
import { RestApi } from '../../../shared/api/rest-api';
import { AppNotificationComponent } from '../../dialog/app-notification/app-notification.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  @Input('sidenav') sidenav: any;
  @Input('sidebar') sidebar: any;

  generic = new GenericTerm();
  removeMessage: Boolean = false;
  themes;
  displaySearch: Boolean = false;
  user = new User();
  loggedIn:boolean=false;
  name:string;
  url :string;
  userid:number;
  isLoadingResults:boolean = false;
  editUser : User;
  api = new RestApi();

  constructor(private themeService: ThemeService,
    private tokenStorageService:TokenStorageService,
    private loginService:LoginService,
    private userService: UserService,
    private dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.themes = this.themeService.themes;
    this.name = this.tokenStorageService.getName();
    this.userid = this.tokenStorageService.getUserId();
    if (this.userid != null && this.userid > 0) {
      this.isLoadingResults = true;
      // this.userService.getUser(this.userid).subscribe(result => {
      //   this.isLoadingResults = false;
      //   this.editUser = result;
      //   if (this.editUser != null) {
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

  changeTheme(theme) {
    console.log("theme", theme);
    this.themeService.changeTheme(theme);
  }

  logout() {
    this.loggedIn  = this.loginService.logout();
    if(!this.loggedIn){
      this.router.navigateByUrl("/admin/login");
    }
  }

  openUpdatePasswordDialog() {
    let dialogRef = this.dialog.open(UpdatePasswordDailogComponent, {
      width: '350px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {
        //this.exampleDatabase.dataChange.value.push(this.roleService.getDialogData());
        // this.refreshTable();
      }
    });
  }

  openAppUpdateDialog(){
    let dialogRef = this.dialog.open(AppNotificationComponent, {
      width: '450px',
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
