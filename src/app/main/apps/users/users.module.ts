import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule, FuseSidebarModule } from '@fuse/components';
import { UsersComponent } from './users.component';
import { UsersService } from './users.service';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersSelectedBarComponent } from './selected-bar/selected-bar.component';
import { UsersFormDialogComponent } from './users-form/users-form.component';
import { MatSelectModule } from '@angular/material/select';
import { MainComponent } from './sidebars/main/main.component';


const routes: Routes = [
    {
        path: '**',
        component: UsersComponent,
        resolve: {
            contacts: UsersService
        }
    }
];

@NgModule({
    declarations: [
        UsersComponent,
        UsersListComponent,
        UsersSelectedBarComponent,
        UsersFormDialogComponent,
        MainComponent],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatSelectModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatTableModule,
        MatToolbarModule,

        FuseSharedModule,
        FuseConfirmDialogModule,
        FuseSidebarModule



    ],
    providers: [
        UsersService
    ],
    entryComponents: [
        UsersFormDialogComponent
    ]
})
export class UsersModule {
}
