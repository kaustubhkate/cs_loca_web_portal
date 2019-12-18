import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../models/user';
import { ToasterService } from './toaster.service';
import { RestApi } from '../api/rest-api';
import { ImageDb } from '../models/image-db';
import { CountryState } from '../models/countrystate';
import { StaffAvailability } from '../models/staff-availability';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { ForgotAndVerifyPassword } from '../loca-model/forgotpassword-verify';
import { UserResponse } from '../loca-model/user.response';
import { ListApi } from '../api/list-api';
import { PageableDataUserDto } from '../loca-model/pagable-user-2';

@Injectable()
export class UserService {
 
  api = new RestApi();

  api2 = new ListApi();

  dataChange: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  dialogData: any;

  constructor(private httpClient: HttpClient, private toasterService: ToasterService, private ng2ImgMax: Ng2ImgMaxService) { }

  get data(): User[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getImage(id: number): Observable<ImageDb> {
    const url = `${this.api.DUMMY_URL}/${id}`;
    return this.httpClient.get<ImageDb>(url);
  }

  getAllCountryStateList(): Observable<CountryState[]> {
    return this.httpClient.get<CountryState[]>(this.api.DUMMY_URL);
  }

  /** CRUD METHODS */
  getAllUsers(): void {
    this.httpClient.get<User[]>(this.api.DUMMY_URL).subscribe(data => {
      this.dataChange.next(data);
    },
      (error: HttpErrorResponse) => {
      });
  }

  addNewPassword(user: User): Observable<User> {
    return this.httpClient.post<User>(this.api.DUMMY_URL, user);
  }

  checkUserByResetToken(resetToken: string): Observable<User> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    let httpParams = new HttpParams()
      .set('resetToken', resetToken);
    return this.httpClient.get<User>(this.api.DUMMY_URL, {
      headers: httpHeaders,
      params: httpParams,
      responseType: 'json'
    });
  }

  setloginstatus(id: number, status: string): Observable<any[]> {
    const url = `${this.api.DUMMY_URL}/${id}?status=${status}`;
    console.log(' hit', url);
    return this.httpClient.get<any>(url);

  }

  /** FOR LOCA URL -------- Check forward */
  // Save user
  addUser(user: any): Observable<ForgotAndVerifyPassword> {
    console.log("data => ",user);
    const url = `${this.api.USER_LOGIN_URL}/user/register`
    return this.httpClient.post<ForgotAndVerifyPassword>(url,user);
  }

  deleteUser(userId: number): Observable<any> {
    const url = `${this.api.USER_LOGIN_URL}/user/delete/${userId}`;
    return this.httpClient.delete<any>(url);
  }

  changeStatusUpdate(userId: number, status: number): Observable<any> {
    const url = `${this.api.USER_LOGIN_URL}/user/changestatus/${userId}/${status}`;
    return this.httpClient.delete<any>(url);
  }

  getUserByUsername(username: string): Observable<UserResponse>{
    const url = `${this.api.USER_LOGIN_URL}/user/exists/${username}`;
    return this.httpClient.get<UserResponse>(url);
  }

  getNewUserList():Observable<PageableDataUserDto> {
    const url = `${this.api2.ALL_USER_LIST}`;
    return this.httpClient.get<PageableDataUserDto>(url);
  }

  updateUser(user: any): Observable<ForgotAndVerifyPassword> {
    console.log("data => ",user);
    const url = `${this.api.USER_LOGIN_URL}/user/update`
    return this.httpClient.post<ForgotAndVerifyPassword>(url,user);
  }
  
}
