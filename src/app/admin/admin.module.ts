import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { AngularDualListBoxModule } from 'angular-dual-listbox';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ThemeService } from '../shared/services/theme.service';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { BreadcrumbComponent } from './layout/breadcrumb/breadcrumb.component';
import { DialogComponent } from './dialog/dialog.component';
import { ConfirmDialogComponent } from './dialog/confirm-dialog/confirm-dialog.component';
import { LoaderDialogComponent } from './dialog/loader-dialog/loader-dialog.component';
import { SettingsComponent } from './layout/settings/settings.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ImageDialogComponent } from './dashboard/image-dialog/image-dialog.component';
// import { UserComponent } from './user/user.component';
import { UserService } from '../shared/services/user.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { RoleComponent } from './user/role/role.component';
import { RoleService } from '../shared/services/role.service';
// import { AddDialogComponent } from './user/role/add-dialog/add-dialog.component';
// import { AdduserDialogComponent } from './user/adduser-dialog/adduser-dialog.component';
import { ToasterService } from '../shared/services/toaster.service';
import { EditRoleDialogComponent } from './user/role/edit-role-dialog/edit-role-dialog.component';
import { UpdatePasswordDailogComponent } from './dialog/update-password-dailog/update-password-dailog.component';

import { ReactiveFormsModule } from '@angular/forms';
import { ViewuserDailogComponent } from './user/viewuser-dailog/viewuser-dailog.component';
import { LoginService } from '../shared/services/login.service';
import { DashboardService } from '../shared/services/dashboard.service';
import { OnlynumberFormatDirective } from '../shared/directives/onlynumber-format.directive';
import { AuthGuardService } from '../shared/services/auth-guard.service';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { FlatpickrModule } from 'angularx-flatpickr';
import { ConfirmDeactivationComponent } from './dialog/confirm-deactivation/confirm-deactivation.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { EmailServiceService } from '../shared/services/email-service.service';
import { SelectDialogComponent } from './dialog/select-dialog/select-dialog.component';
import { WarningDialogComponent } from './dialog/warning-dialog/warning-dialog.component';
import { SpecialCharacterDirective } from '../shared/directives/special-character.directive';
import { UsernameValidatorDirective } from '../shared/directives/username-validator.directive';
import { ForbiddenValidatorDirective } from '../shared/directives/forbidden-validator.directive';
// import { UniqueUsernameValidatorDirective } from '../shared/directives/unique-username-validator.directive';
import { UniqueEntryDailogComponent } from './dialog/unique-entry-dailog/unique-entry-dailog.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { DragulaModule } from 'ng2-dragula';
import { OrderModule } from 'ngx-order-pipe';
import { FilterPipe } from '../shared/pipes/filter.pipe';
import { IdentityRevealedValidatorDirective } from '../shared/validation/identity-revealed-validator.directive';
import { FilterlistPipe } from '../filter.pipe';
import { CompairDirective } from './directives/compare.directive';
import { CompareQuantityDirective } from './directives/compare-quantity.directive';
import { SuccessMessageComponent } from './forgot-password/success-message/success-message.component';
import { ErrorMessageComponent } from './forgot-password/error-message/error-message.component';
import { ForgotPageComponent } from './forgot-password/forgot-page/forgot-page.component';
import { ComapreTimeDirective } from './directives/comapre-time.directive';
import { CompareSeatsDirective } from './directives/compare-seats.directive';
import { CustomValidatorDirective } from './directives/custom-validator.directive';
import { EmailValidatorDirective } from './directives/email-validator.directive';
import { AuthInterceptor } from '../shared/auth/auth-interceptor';
import { errorInterceptorProviders } from '../shared/auth/error-interceptor';
import { ContextMenuModule } from 'ngx-contextmenu';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { StaffDashboardComponent } from './dashboard/staff-dashboard/staff-dashboard.component';

import { DemoMaterialModule } from '../shared/material-module';
import { GrdFilterPipe } from '../shared/pipes/grd-filter.pipe';
import { StarRatingModule } from 'angular-star-rating';
import { UserDailogComponent } from './dialog/user-dailog/user-dailog.component';

import { PhoneMaskDirective } from './directives/phone-mask.directive';
import { LoginUserComponent } from './login-user/login-user.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { PasswordDailogComponent } from './dialog/password-dailog/password-dailog.component';
import { AppNotificationComponent } from './dialog/app-notification/app-notification.component';
import { TourNotificationComponent } from './dialog/tour-notification/tour-notification.component';
import { ErrorComponent } from './error/error.component';
import { UserModule } from './user/user.module';

import { MasterEntryModule } from './master-entries/master-entry.module';
import { ChatComponent } from './chat/chat.component';
import { GridSystemComponent } from './grid-system/grid-system.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    DemoMaterialModule,
    SharedModule,
    QuillModule,
    NgxDatatableModule,
    HttpClientModule,
    ReactiveFormsModule,
    TextMaskModule,
    AngularMultiSelectModule,
    AngularDualListBoxModule,
    OrderModule,
    NgxMaterialTimepickerModule,
    NgxMatSelectSearchModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    ContextMenuModule.forRoot({
    }),
    FlatpickrModule.forRoot(),
    NgxMaterialTimepickerModule,
    DragulaModule.forRoot(),
    StarRatingModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDefemPJ5EoyQ2ufccWaT1pjus5zTiEP5s', //AIzaSyBwpjbLHtN0_4Jl4rgYkcI3g4e4w4-eIiU
      libraries: ['places', 'drawing', 'geometry'],
    }),
    UserModule,
    MasterEntryModule
  ],
  providers: [
    ThemeService, LoginService, AuthGuardService, UserService,
    RoleService, ToasterService, DashboardService, EmailServiceService,
    AuthInterceptor,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    errorInterceptorProviders,
  ],
  exports: [],
  entryComponents: [
    ConfirmDialogComponent, LoaderDialogComponent, SelectDialogComponent, ImageDialogComponent, 
    // AddDialogComponent,
    // AdduserDialogComponent,
    EditUserComponent, ViewuserDailogComponent, EditRoleDialogComponent,
    UpdatePasswordDailogComponent,
    ConfirmDeactivationComponent, WarningDialogComponent, UniqueEntryDailogComponent, UserDailogComponent,
    PasswordDailogComponent,
    AppNotificationComponent, TourNotificationComponent
  ],
  declarations: [
    ErrorComponent,
    FilterPipe,
    IdentityRevealedValidatorDirective,
    FilterlistPipe,
    GrdFilterPipe,
    UsernameValidatorDirective,
    ForbiddenValidatorDirective,
    //  UniqueUsernameValidatorDirective,
    OnlynumberFormatDirective,
    SpecialCharacterDirective,
    LayoutComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    BreadcrumbComponent,
    DialogComponent,
    ConfirmDialogComponent,
    LoaderDialogComponent,
    SettingsComponent,
    ForgotPasswordComponent,
    ImageDialogComponent, 
    // UserComponent,
    // RoleComponent,
    // AddDialogComponent,
    // AdduserDialogComponent,
    EditRoleDialogComponent,
    UpdatePasswordDailogComponent,
    ViewuserDailogComponent,
    ConfirmDeactivationComponent,
    EditUserComponent,
    SelectDialogComponent,
    WarningDialogComponent,
    UserDailogComponent,

    UniqueEntryDailogComponent,
    CompairDirective,
    ErrorMessageComponent,
    SuccessMessageComponent,
    ForgotPageComponent,
    ComapreTimeDirective,
    CompareSeatsDirective,
    CustomValidatorDirective,
    EmailValidatorDirective,

    StaffDashboardComponent,
    CompareQuantityDirective,
    PhoneMaskDirective,
    LoginUserComponent,

    PasswordDailogComponent,
    AppNotificationComponent, TourNotificationComponent, ChatComponent,
    GridSystemComponent,
    ProfileComponent
  ]
})
export class AdminModule { }
