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

import { EcommerceProductsComponent } from 'app/main/apps/dungos/products/products.component';
import { EcommerceProductsService } from 'app/main/apps/dungos/products/products.service';
import { EcommerceProductComponent } from 'app/main/apps/dungos/product/product.component';
import { EcommerceProductService } from 'app/main/apps/dungos/product/product.service';
import { RfidCardsComponent } from 'app/main/apps/dungos/rfidCards/rfidCards.component';
import { RfidCardsService } from 'app/main/apps/dungos/rfidCards/rfidCards.service';
import { RfidCardComponent } from 'app/main/apps/dungos/rfidCard/rfidCard.component';
import { RfidCardService } from 'app/main/apps/dungos/rfidCard/rfidCard.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FuseConfirmDialogModule, FuseSidebarModule } from '@fuse/components';
import { DungosFormDialogComponent } from './products/dungos-form/dungos-form.component';
import { MapComponent } from './map/map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

const routes: Routes = [
    {
        path     : 'products',
        component: EcommerceProductsComponent,
        resolve  : {
            data: EcommerceProductsService
        }
    },
    {
        path     : 'products/:id',
        component: EcommerceProductComponent,
        resolve  : {
            data: EcommerceProductService
        }
    },
    {
        path     : 'products/:id/:handle',
        component: EcommerceProductComponent,
        resolve  : {
            data: EcommerceProductService
        }
    },
    {
        path     : 'rfidCards',
        component: RfidCardsComponent,
        resolve  : {
            data: RfidCardsService
        }
    },
    {
        path     : 'rfidCards/:id',
        component: RfidCardComponent,
        resolve  : {
            data: RfidCardService
        }
    },
    
];

@NgModule({
    declarations: [
        EcommerceProductsComponent,
        EcommerceProductComponent,
        RfidCardsComponent,
        RfidCardComponent,
        DungosFormDialogComponent,
        MapComponent,
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
        FuseSharedModule,        
        MatCheckboxModule,
        MatDatepickerModule,
        MatMenuModule,
        LeafletModule,

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
        EcommerceProductsService,
        EcommerceProductService,
        RfidCardsService,
        RfidCardService,
    ],
    entryComponents: [
        DungosFormDialogComponent
    ]
})
export class DungosModule
{
}
