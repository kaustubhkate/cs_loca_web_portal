import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
// import { UserComponent } from './user/user.component';
// import { RoleComponent } from './user/role/role.component';
import { AuthGuardService as AuthGuard, AuthGuardService } from '../shared/services/auth-guard.service';
// import { AdduserDialogComponent } from './user/adduser-dialog/adduser-dialog.component';
import { ViewuserDailogComponent } from './user/viewuser-dailog/viewuser-dailog.component';
import { StaffDashboardComponent } from './dashboard/staff-dashboard/staff-dashboard.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { from } from 'rxjs';
import { ErrorComponent } from './error/error.component';


const routes: Routes = [

    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: '',
        component: LayoutComponent,
        canActivate: [AuthGuardService],
        children: [
            {
                path: 'dashboard', component: DashboardComponent
            },
            {

                path: 'staff-home', component: StaffDashboardComponent, data: {
                    breadcrumb: " / Dashboard"
                }
            },
            
            // {
            //     path: 'user', component: UserComponent, data: {
            //         breadcrumb: "User Management / Users"
            //     },
            // },
            
            // {
            //     path: 'role', component: RoleComponent, data: {
            //         breadcrumb: "User Management / Roles"
            //     },
            // },
            {
                path: 'user/view/:id', component: ViewuserDailogComponent, data: {
                    breadcrumb: "User Maangement / User / View "
                }
            },
            {
                path: 'user',
                loadChildren: './user/user.module#UserModule',
                data: {
                    breadcrumb: " User Management ",
                },
            },
            // {
            //     path: 'master-entry',
            //     loadChildren: './master-/user.module#UserModule',
            //     data: {
            //         breadcrumb: " User Management ",
            //     },
            // },
            
        ]
    },
    {
        path: 'login',
        component: LoginUserComponent
    },
    {
        path: 'forgotpassword',
        component: ForgotPasswordComponent
    },
    // {
    //     path: 'setpassword',
    //     component: SetPasswordComponent
    // },
    // {
    //     path: 'successpassword',
    //     component: SucessPasswordComponent
    // },
    {
        path: 'error',
        component: ErrorComponent
    },
    {
        path: '**',
        component: ErrorComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }

//data: for breadcrumb name