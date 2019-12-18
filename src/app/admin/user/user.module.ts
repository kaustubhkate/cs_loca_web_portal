import { NgModule } from '@angular/core';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { DemoMaterialModule } from '../../shared/material-module';
import { QuillModule } from 'ngx-quill';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { AngularDualListBoxModule } from 'angular-dual-listbox';
import { OrderModule } from 'ngx-order-pipe';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ContextMenuModule } from 'ngx-contextmenu';
import { FlatpickrModule } from 'angularx-flatpickr';
import { DragulaModule } from 'ng2-dragula';
import { StarRatingModule } from 'angular-star-rating';
import { AgmCoreModule } from '@agm/core';
import { ThemeService } from '../../shared/services/theme.service';
import { LoginService } from '../../shared/services/login.service';
import { AuthGuardService } from '../../shared/services/auth-guard.service';
import { UserService } from '../../shared/services/user.service';
import { RoleService } from '../../shared/services/role.service';
import { ToasterService } from '../../shared/services/toaster.service';
import { DashboardService } from '../../shared/services/dashboard.service';
import { EmailServiceService } from '../../shared/services/email-service.service';
import { AuthInterceptor } from '../../shared/auth/auth-interceptor';
import { errorInterceptorProviders } from '../../shared/auth/error-interceptor';
import { AdduserDialogComponent } from './adduser-dialog/adduser-dialog.component';
import { RoleComponent } from './role/role.component';
import { AddDialogComponent } from './role/add-dialog/add-dialog.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


@NgModule({
    imports: [
        UserRoutingModule,
        SharedModule,
        DemoMaterialModule,
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
        AdduserDialogComponent,
        AddDialogComponent
        
    ],
    declarations: [
        UserComponent,
        AdduserDialogComponent,
        RoleComponent,
        AddDialogComponent,
        ResetPasswordComponent
    ]
})

export class UserModule { }