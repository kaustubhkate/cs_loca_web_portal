import { Injectable } from '@angular/core';
import { Role } from '../models/role';
import { BehaviorSubject ,  Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { ToasterService } from './toaster.service';
import { RestApi } from '../api/rest-api';
import { ExperienceError } from '../models/experience-error';
import { UserRoleLoca } from '../loca-model/user.role';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded;' })
};

@Injectable()
export class RoleService {
  api = new RestApi();

  dataChange: BehaviorSubject<Role[]> = new BehaviorSubject<Role[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private httpClient: HttpClient, private toasterService: ToasterService) { }

  get data(): Role[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  CheckingExistingRole(role: String): Observable<Role> {
    const url = `${this.api.DUMMY_URL}?role=${role}`;
   return this.httpClient.get<Role>(url);
       
  }

  /** CRUD METHODS */
  getAllRoles(): void {
    this.httpClient.get<Role[]>(this.api.DUMMY_URL).subscribe(data => {
      this.dataChange.next(data);
    },
      (error: HttpErrorResponse) => {
      });
  }

  getRoles(): Observable<any> {
    return this.httpClient.get<any>(this.api.DUMMY_URL);
  }

  getSTaffRoles(): Observable<Role[]> {
    return this.httpClient.get<Role[]>(this.api.DUMMY_URL+"/staff");
  }

  getNotPermissionRoles(): Observable<Role[]> {
    return this.httpClient.get<Role[]>(this.api.DUMMY_URL);
  }

  getRole(id:number):Observable<Role>{
    const url = `${this.api.DUMMY_URL}/${id}`;
    return this.httpClient.get<Role>(url);
  }

  addRole(role: UserRoleLoca): Observable<UserRoleLoca> {
    return this.httpClient.post<UserRoleLoca>(this.api.SAVE_ROLE_URL, role);
  }

  deleteRole(id: number): Observable<ExperienceError> {
    const url = `${this.api.DUMMY_URL}/${id}`;
    return this.httpClient.delete<ExperienceError>(url);
  }

  checkRoleByName(roleName: string): Observable<boolean> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    let httpParams = new HttpParams()
      .set('roleName', roleName);
    return this.httpClient.get<boolean>(this.api.DUMMY_URL, {
      headers: httpHeaders,
      params: httpParams,
      responseType: 'json'
    });
  }
/** NEW LOCA APPLICATION (CheckSammy) API service */
  // Get all Role List 
  getAllRole(): Observable<any>{
    const url = `${this.api.USER_LOGIN_URL}/role/getall`;
    return this.httpClient.get<any>(url);
  }

  deleteRoleLoca(roleId: number): Observable<any>{
    const url = `${this.api.USER_LOGIN_URL}/role/delete/${roleId}`;
    return this.httpClient.delete<any>(url);
  }
}
