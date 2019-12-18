import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ToasterService } from './toaster.service';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { RestApi } from '../api/rest-api';

import { JwtResponse } from '../auth/jwt-response';
import { AuthLoginInfo } from '../auth/login-info';
import { UserResponse } from '../loca-model/user.response';
import { ForgotAndVerifyPassword } from '../loca-model/forgotpassword-verify';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  api = new RestApi();
  user: User;
  private loggedIn = false;

  constructor(private httpClient: HttpClient,
    private toasterService: ToasterService) {
    this.loggedIn = !!localStorage.getItem('AuthToken');
  }

  checkLogin(user: User): Observable<User> {
    return this.httpClient.post<User>(this.api.LOGIN_URL, user, httpOptions);
  }

  attemptAuth(credentials: AuthLoginInfo): Observable<UserResponse> {
    return this.httpClient.post<UserResponse>(this.api.LOGIN_URL, credentials, httpOptions);
  }

  // login(user: User){
  //   return this.httpClient.post<User>(this.api.LOGIN_URL, user, httpOptions).subscribe(data => {
  //     if (!data) {
  //       return;
  //     } else {
  //       this.user = data;
  //       if (typeof (Storage) !== "undefined") {
  //         localStorage.setItem('auth_token', JSON.stringify(data));
  //         localStorage.setItem('experienceid', this.user.id.toString());
  //         this.loggedIn = true;
  //         this.toasterService.openSuccessSnackBar('Login Successful', '', 2000)
  //       }
  //       return this.user;
  //     }
  //   });
  // }

  logout() : boolean{
    window.localStorage.clear();
    this.loggedIn = false;
    this.toasterService.openSuccessSnackBar('Logout Successfully.', '', 2000)
    return this.loggedIn;
  }

  isAuthenticated(): boolean {
    if (localStorage.getItem('AuthToken')) {
      return true;
    } else {
      return false;
    };
  }

  updatePassword(id: number, user:User) {
    const url = `${this.api}/${id}`;
    return this.httpClient.post<any>(url, user);
  }


  //checksammy forgotpassword otp create on email
  forgotPassword(email: string, dateString:string): Observable<ForgotAndVerifyPassword> {
    const url = `${this.api.USER_LOGIN_URL}/forgot?username=${email}`;
    // let httpHeaders = new HttpHeaders()
    //   .set('Content-Type', 'application/json');
    // let httpParams = new HttpParams()
    //   .set('userEmail', email)
    //   .set('forgotDate', dateString);
    // return this.httpClient.get<User>(this.api.LOGIN_URL, {
    //   headers: httpHeaders,
    //   params: httpParams,
    //   responseType: 'json'
    // });
    return this.httpClient.get<ForgotAndVerifyPassword>(url);
  }

  verifyOTP(email: string, otp:string):  Observable<ForgotAndVerifyPassword> {
    const url = `${this.api.USER_LOGIN_URL}/verify?username=${email}&otp=${otp}`;
    return this.httpClient.get<ForgotAndVerifyPassword>(url);
  }

}
