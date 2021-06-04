import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AgmCoreModule } from '@agm/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';



import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FuseConfirmDialogModule, FuseSidebarModule } from '@fuse/components';
import { FertiliserFormDialogComponent } from './compositions/fertiliser-form/fertiliser-form.component';
import { FertiliserCompositionsComponent } from './compositions/compositions.component';
import { FertiliserCompositionsService } from './compositions/compositions.service';

const routes: Routes = [
    {
        path     : 'npk',
        component: FertiliserCompositionsComponent,
        resolve  : {
            data:  FertiliserCompositionsService
        }
    },
   
    
];

@NgModule({
    declarations: [
        FertiliserCompositionsComponent,
        FertiliserFormDialogComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatChipsModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatRippleModule,
        MatSelectModule,
        MatSortModule,
        MatSnackBarModule,
        MatTableModule,
        MatTabsModule,
        MatButtonModule,
        
        MatCheckboxModule,
        MatDatepickerModule,
        MatMenuModule,
       
        MatToolbarModule,
        FuseConfirmDialogModule,
        FuseSidebarModule,

        NgxChartsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8'
        }),

        FuseSharedModule,
        FuseWidgetModule
    ],
    providers   : [
        FertiliserCompositionsService
        
    ],
    entryComponents: [
        FertiliserFormDialogComponent
    ]
})
export class FertiliserModule
{
}
