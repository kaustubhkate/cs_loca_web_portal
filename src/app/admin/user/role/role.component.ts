import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatDialog, MatTableDataSource, MatTable, MatMenuTrigger} from '@angular/material';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ExampleHttpDao } from '../../../shared/models/example-http-dao';

import { RoleService } from '../../../shared/services/role.service';
import { Role } from '../../../shared/models/role';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { ConfirmDialogComponent } from '../../dialog/confirm-dialog/confirm-dialog.component';
import { EditRoleDialogComponent } from './edit-role-dialog/edit-role-dialog.component';
import { ToasterService } from '../../../shared/services/toaster.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { ExperienceError } from '../../../shared/models/experience-error';
import { ListApi } from '../../../shared/api/list-api';


@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class RoleComponent implements OnInit {

  displayedColumns : string[] = ['name', 'description', 'status', 'actions'];
  exampleDatabase: ExampleHttpDao | null;
  data: Role[] = [];

  dataSource:any;
  api = new ListApi();
  resultsLength = 0;
  pageSize = 5;
  isLoadingResults = true;
  isRateLimitReached = false;
  
  index: number;
  id: number;
  name:string;
  status:string; 
  loggedUser:string;
  tempObj = new Role();

  isCopied1: boolean = false;

  title: string = 'Confirm Dialog';
  @ViewChild(MatMenuTrigger, {static: true}) contextMenu: MatMenuTrigger;

  openContextMenu(event, roleObj:Role) {
    this.tempObj = roleObj;
    event.preventDefault(); // Suppress the browser's context menu
    this.contextMenu.openMenu(); // Open your custom context menu instead
  }

  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');
  expandedElement: any;
  experienceError:ExperienceError;

  constructor(public httpClient: HttpClient,
    public dialog: MatDialog,
    public roleService: RoleService,
    private router:Router,
    private toasterService:ToasterService) { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort,  {static: true}) sort: MatSort;
  @ViewChild(MatTable, {static: true}) table: MatTable<any>;

  ngOnInit() {
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addRoleDialog(): void {
    let dialogRef = this.dialog.open(AddDialogComponent, {
      width: '400px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.refresh();
      }
    });
  }

  viewRole(roleObj : Role):void{
    this.id = roleObj.id;
    this.name = roleObj.name;
    this.title = roleObj.description;
    this.status=roleObj.status;
    const dialogRef = this.dialog.open(EditRoleDialogComponent, {
      width: '350px',
      data: {id: this.id, role: this.name, description: this.title, status:this.status},
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  startEdit(role:Role) {
    let cloned = Object.assign({}, role);
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '350px',
      data: { role : cloned},
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.refresh();
      }
    });
  }

  deleteItem(i: number, id: number, title: string, type:string) {
    this.index = i;
    this.title = title;
    this.id = id;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {id: id, title: title, type:type},
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isLoadingResults = true;
        this.roleService.deleteRoleLoca(id).subscribe(data => {
          this.isLoadingResults = false;
          if(data){
            this.toasterService.openSuccessSnackBar('Successfully deleted', 'ok', 1000);
          }
          this.refresh();
        }, err=> {
          this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, '', 3000);
          this.isLoadingResults = false;
        })
      }
    });
  }

  public loadData() {
    this.exampleDatabase = new ExampleHttpDao(this.httpClient);
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          //  Replaced URL ==== DUMMY_URL we use  
          return this.exampleDatabase!.getNewList2(this.api.ALL_ROLE_LIST,
            this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.returnObject.content.length;
          this.pageSize = data.returnObject.size;
          return data.returnObject.content;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the REST API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => {
        this.data = data;
        this.dataSource = new MatTableDataSource(this.data);
      });
  }
}
