import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { AdduserDialogComponent } from './adduser-dialog/adduser-dialog.component';
import { ErrorComponent } from '../error/error.component';
import { RoleComponent } from './role/role.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
    {
        path: '',
        // redirectTo: 'user',
        pathMatch: 'full',
        component: UserComponent,
        data: {
            breadcrumb: "/ Users",
        },
    },
    {
        path: 'add', component: AdduserDialogComponent, data: {
            breadcrumb: "/ User / Add "
        }
    },
    
    {
        path: 'edit', component: AdduserDialogComponent, data: {
            breadcrumb: "/ User/ Edit"
        }
    },
    {
        path: 'role', component: RoleComponent, data: {
            breadcrumb: "/ User/ Roles"
        },
    },
    {
        path: 'reset/password', component: ResetPasswordComponent, data: {
            breadcrumb: "/ User/ Reset/ Password"
        },
    },
   
    
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }