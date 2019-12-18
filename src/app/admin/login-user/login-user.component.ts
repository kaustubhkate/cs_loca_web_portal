import { Component, OnInit, ViewChild } from '@angular/core';
import { ThemeService } from '../../shared/services/theme.service';
import { FormControl, Validators } from '@angular/forms';
import { LoginService } from '../../shared/services/login.service';
import { Router } from '@angular/router';
import { ExperienceError } from '../../shared/models/experience-error';
import { MatDialog, MatProgressBar, MatButton } from '@angular/material';
import { emailValidator } from '../directives/email-validator.directive';
import { AuthLoginInfo } from '../../shared/auth/login-info';
import { User } from '../../shared/models/user';
import { TokenStorageService } from '../../shared/auth/token-storage.service';
import { ToasterService } from '../../shared/services/toaster.service';
import { UserResponse } from '../../shared/loca-model/user.response';
import { UserLoca } from '../../shared/loca-model/userloca';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss']
})
export class LoginUserComponent implements OnInit {

  color = 'primary';
  submitted: boolean = false;
  errorMessage: string;
  successMessage: string;
  userEmail: string;
  expError: ExperienceError;
  mode = 'determinate';
  dateString: string;
  user = new User();
  @ViewChild(MatProgressBar, { static: false }) progressBar: MatProgressBar;
  @ViewChild(MatButton, { static: false }) submitButton: MatButton;
  loginInfo: AuthLoginInfo;
  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];
  loggedUser: boolean = false;

  email = new FormControl('', [Validators.required, emailValidator()]);
  loginStatus: boolean = false;
  userReponse = new UserLoca();
  userPermission: boolean = false;

  constructor(private themeService: ThemeService, private loginService: LoginService,
    private tokenStorage: TokenStorageService,
    private toasterService: ToasterService,
    private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
    this.isValidUser();
  }

  isValidUser() {
    this.loggedUser = this.loginService.isAuthenticated();

    if (this.loggedUser) {
      this.goDashboard();
    }
  }

  onSubmit() {
    this.submitted = true;
    this.submitButton.disabled = true;

    this.loginInfo = new AuthLoginInfo(
      this.user.username,
      this.user.password);
    this.login(this.loginInfo);
  }

  login(credentials: AuthLoginInfo) {

    this.progressBar.mode = 'indeterminate';
    this.loginService.attemptAuth(credentials).subscribe(data => {
      if (data.status != "FAILURE") {
        data.returnObject.roles.forEach(element => {
          if (element.name == "ADMIN") {
            this.userPermission = true;
          }
        });
        console.log("here =>");
        if (data.status == "SUCCESS" && this.userPermission) {
          this.userReponse = data.returnObject;
          window.localStorage.setItem('AuthToken', 'new_user_login_token');
          window.localStorage.setItem('userId', this.userReponse.userId.toString());
          this.goDashboard();
        } else {
          this.expError = null;
          this.errorMessage = "Role permission not granted";
          this.progressBar.mode = 'determinate';
          this.submitButton.disabled = false;
          this.submitted = false;
          this.isLoginFailed = true;
        }
      } else {
        this.expError = null;
        this.errorMessage = "The username or password is incorrect."; //this.expError.errorMessage;
        this.progressBar.mode = 'determinate';
        this.submitButton.disabled = false;
        this.submitted = false;
        this.isLoginFailed = true;
      }
    });

    // 27-11-19
    // this.loginService.attemptAuth(credentials).subscribe(
    //   data => {
    //     this.progressBar.mode = 'determinate';
    //     this.submitButton.disabled = false;
    //     this.tokenStorage.saveToken(data.accessToken);
    //     this.tokenStorage.saveUsername(data.username);
    //     this.tokenStorage.saveAuthorities(data.authorities);
    //     this.tokenStorage.saveName(data.name);
    //     this.tokenStorage.saveUserId(data.userid);
    //     localStorage.setItem('experienceid', data.userid.toString());
    //     this.toasterService.openSuccessSnackBar('Login Successful', '', 2000);
    //     this.isLoginFailed = false;
    //     this.isLoggedIn = true;
    //     this.goDashboard();
    //   },
    //   error => {
    //     this.expError = error.error;
    //     this.errorMessage = "The username or password is incorrect."; //this.expError.errorMessage;
    //     this.progressBar.mode = 'determinate';
    //     this.submitButton.disabled = false;
    //     this.submitted = false;
    //     this.isLoginFailed = true;
    //   }
    // );
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  goDashboard() {
    // this.roles = this.tokenStorage.getAuthorities();
    // if(this.roles.includes('STAFF')){
    //   this.router.navigateByUrl('admin/staff-home');
    // }else{
    this.router.navigateByUrl('admin/dashboard');
    //}
  }

}
