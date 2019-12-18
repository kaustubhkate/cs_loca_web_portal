import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource, MatTable } from '@angular/material';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { User } from '../../shared/models/user';
import { UserService } from '../../shared/services/user.service';
import { ConfirmDialogComponent } from '../dialog/confirm-dialog/confirm-dialog.component';
import { AdduserDialogComponent } from './adduser-dialog/adduser-dialog.component';
import { Role } from '../../shared/models/role';
import { ViewuserDailogComponent } from './viewuser-dailog/viewuser-dailog.component';
import { Router } from '@angular/router';
import { EditUserComponent } from './edit-user/edit-user.component';
import { GenericTerm } from '../generic/generic-term';
import { ListApi } from '../../shared/api/list-api';
import { ExampleHttpDao } from '../../shared/models/example-http-dao';
import { RestApi } from '../../shared/api/rest-api';
import { ToasterService } from '../../shared/services/toaster.service';
import { UserLocaDto } from '../../shared/loca-model/user-loca-dto';
import { UserGroupByRole } from '../../shared/loca-model/user-groupby-role';
import { RoleService } from '../../shared/services/role.service';
import { DataSource } from '@angular/cdk/table';


export class RoleByUserId {
  userId: number;
  role: string[];
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  generic = new GenericTerm();
  displayedColumns = ['picture', 'firstName', 'username', 'phone', 'roleName', 'isUserDeleted', 'actions'];
  exampleDatabase: ExampleHttpDao | null;
  data: UserGroupByRole[] = [];
  data2: UserLocaDto[] = [];
  dataSource: MatTableDataSource<UserGroupByRole>;
  api = new ListApi();
  restApi = new RestApi();
  resultsLength = 0;
  pageSize = 5;
  isLoadingResults = true;
  isRateLimitReached = false;
  url = 'assets/images/myuser.png';

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  role: Role[];

  index: number;
  id: number;
  name: string;
  title: string;
  loggedUser: string;
  profilepic: any;
  userroles: any;

  newRoleListByUserId: RoleByUserId[] = [];

  constructor(public httpClient: HttpClient,
    public dialog: MatDialog,
    public userService: UserService,
    public toasterService: ToasterService,
    public roleService: RoleService,
    private router: Router) {
    this.profilepic = this.restApi.DUMMY_URL;
    
  }

  ngOnInit() {
    /** New Changes */
    
    this.profilepic = this.restApi.DUMMY_URL;
    this.getUserRoles();
    this.loadData();
    
  }

  getUserRoles(): void {
    this.roleService.getAllRole()
      .subscribe(data => {
        this.userroles = data.returnObject.content;
        // console.log("Role Data List =>",this.userroles);
      });
  }

  refresh() {
    this.loadData();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public loadData() {
    this.isLoadingResults = true;
    this.userService.getNewUserList().subscribe(data =>{
      // console.log("new data",data);

      let data1:  UserGroupByRole[] = this.compressUserByUserRole(data.returnObject);
      this.dataSource = new MatTableDataSource(data1);
      this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.isLoadingResults = false;
    })
    // // this.dataSource.paginator = this.paginator;
    // // this.dataSource.sort = this.sort;
    // this.exampleDatabase = new ExampleHttpDao(this.httpClient);
    // // If the user changes the sort order, reset back to the first page.
    // this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    // merge(this.sort.sortChange, this.paginator.page)
    //   .pipe(
    //     startWith({}),
    //     switchMap(() => {
    //       this.isLoadingResults = true;
    //       // return this.exampleDatabase!.getNewList2(this.api.ALL_USER_LIST,
    //       //   this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
    //        return this.exampleDatabase!.getNewListForUser(this.api.ALL_USER_LIST,
    //         this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
    //     }),
    //     map(data => {
    //       this.data2 = data.returnObject;
    //       let data1:  UserGroupByRole[] = this.compressUserByUserRole(this.data2);
    //     // this.data = this.compressUserByUserRole(this.data2);
    //       // Flip flag to show that loading has finished.
    //       this.isLoadingResults = false;
    //       this.isRateLimitReached = false;
    //       this.resultsLength = data.returnObject.length;
    //       this.pageSize = data.returnObject.length;
    //       // console.log("here is the data === > ",data1)
    //       return data1;
    //       // return data.returnObject.content;
    //     }),
    //     catchError(() => {
    //       this.isLoadingResults = false;
    //       this.isRateLimitReached = true;
    //       return observableOf([]);
    //     })
    //   ).subscribe(data => {
    //     // this.data2 = data;
    //     this.data = data;
    //     // this.data = this.compressUserByUserRole(this.data2);
    //     this.dataSource = new MatTableDataSource(this.data);
    //     console.log("check here also ===> ", this.dataSource);
    //   });
  }

   uniqBy(a, key) {
    let seen = new Set();
    return a.filter(item => {
        let k = item.key;
        return seen.has(k) ? false : seen.add(k);
    });
}
  /** Conversion Value -- update */
  compressUserByUserRole(data2: UserLocaDto[]): UserGroupByRole[] {

    let userGroupByRole: UserGroupByRole[] = []
    data2.forEach((element, indexTemp) =>{

      let roleArray : string[] = [];
      roleArray.push(element.roleName)

      let newItem = new UserGroupByRole();
      newItem.company_name =  element.company_name,
      newItem.firstName = element.firstName as string,
      newItem.id =  element.id as string,
      newItem.isRoleDeleted= element.isRoleDeleted as string,
      newItem.isUserDeleted= element.isUserDeleted as string,
      newItem.lastName= element.lastName as string,
      newItem.otp= element.otp as string,
      newItem.password= element.password as string,
      newItem.phone= element.phone as string,
      newItem.roleApprovedBy= element.roleApprovedBy as number,
      newItem.roleId= element.roleId as number,
      newItem.roleName= roleArray as string[],
      newItem.token= element.token as string,
      newItem.userId= element.userId as number,
      newItem.username= element.username as string
      let index = userGroupByRole.findIndex(x => x.userId == newItem.userId);
   
      if(index > -1 ){ 
        // let roleNameFirst = userGroupByRole[index].roleName.concat(",",element.roleName);
         userGroupByRole[index].roleName.push(roleArray.toString());
      }else{
        userGroupByRole.push(newItem);
      }
    })
    // console.log("check First=== > ", userGroupByRole);
    return userGroupByRole;
  }

  addNew(): void {
    let dialogRef = this.dialog.open(AdduserDialogComponent, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.refresh();
      }
    });
  }

  startEdit(user: User) {
    this.name = user.email;
    let dialogRef = this.dialog.open(EditUserComponent, {
      data: { user: user, id: user.id },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.refresh();
      }
    });
  }

  viewUser(user: User) {
    let dialogRef = this.dialog.open(ViewuserDailogComponent, {
      data: { type: 'User', info: user },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  view(id: number): void {
    this.router.navigateByUrl('/admin/user/view/' + id);
  }

  deleteItem(i: number, id: number) {
    this.index = i;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { id: id, type: 'user' },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.isLoadingResults = true;
        this.userService.deleteUser(id).subscribe(data => {
          this.isLoadingResults = false;
          if (data) {
            this.toasterService.openSuccessSnackBar('Successfully updated', 'ok', 1000);
          }
          this.refresh();
        }, err => {
          this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, '', 3000);
          this.isLoadingResults = false;
        })
      }
    });
  }

  //change status
  onChange(event:any, rowId: number){
    let status: number = 0;
    if(event.checked){
      status = 0
    }else{
      status = 1;
    }
    this.userService.changeStatusUpdate(rowId,status).subscribe(data =>{
      console.log(data);
      if (data.status =="SUCCESS") {
        this.toasterService.openSuccessSnackBar('Successfully deleted', 'ok', 1000);
        // this.dataSource = [...this.data];
        this.refresh();
      }else{
        this.toasterService.showToaster('Error occurred. Details: ' + data.errorMessage, '', 3000);
        this.refresh();
      }
    })
  }

}
