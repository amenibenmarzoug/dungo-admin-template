import { Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import { EcommerceProductsService } from 'app/main/apps/dungos/products/products.service';
import { takeUntil } from 'rxjs/internal/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { Fertiliser } from 'app/models/fertiliser.model';
import { FertiliserFormDialogComponent } from './fertiliser-form/fertiliser-form.component';
import { FertiliserCompositionsService } from './compositions.service';

@Component({
    selector     : 'fertiliser-compositions',
    templateUrl  : './compositions.component.html',
    styleUrls    : ['./compositions.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class FertiliserCompositionsComponent implements OnInit
{
    dataSource: FilesDataSource | null;
    displayedColumns = [ 'name', 'azote', 'phosphore','potassuim'];

    @ViewChild(MatPaginator, {static: true})
    paginator: MatPaginator;

    @ViewChild(MatSort, {static: true})
    sort: MatSort;

    @ViewChild('filter', {static: true})
    filter: ElementRef;


    action: string;
    fertiliser: Fertiliser;
    fertiliserForm: FormGroup;
    dialogTitle: string;
    dialogRef: any;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    
   
    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        public _matDialog: MatDialog,
        private _fertiliserService: FertiliserCompositionsService
    )
    {
        
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }
    formatImage(img: any): any {
        return 'data:image/jpeg;base64,' + img;
    }

     /**
     * New contact
     */
      newFertiliser(): void
      {
          this.dialogRef = this._matDialog.open(FertiliserFormDialogComponent, {
              panelClass: 'contact-form-dialog',
              data      : {
                  action: 'new'
              }
          });
  
          this.dialogRef.afterClosed()
              .subscribe((response: FormGroup) => {
                  if ( !response )
                  {
                      return;
                  }
  
                  this._fertiliserService.addFertiliser(response.getRawValue());
              });
      }
    /**
     * Edit contact
     *
     * @param contact
     */
     editFertiliser(contact): void
     {
         this.dialogRef = this._matDialog.open(FertiliserFormDialogComponent, {
             panelClass: 'contact-form-dialog',
             data      : {
                 contact: contact,
                 action : 'edit'
             }
         });
 
         this.dialogRef.afterClosed()
             .subscribe(response => {
                 if ( !response )
                 {
                     return;
                 }
                 const actionType: string = response[0];
                 const formData: FormGroup = response[1];
                 switch ( actionType )
                 {
                     /**
                      * Save
                      */
                     case 'save':
 
                         this._fertiliserService.updateFertiliser(formData.getRawValue());
 
                         break;
                     /**
                      * Delete
                      */
                     case 'delete':
 
                         this.deleteFertiliser(contact);
 
                         break;
                 }
             });
     }
 
     /**
      * Delete Contact
      */
     deleteFertiliser(contact): void
     {
         this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
             disableClose: false
         });
 
         this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
 
         this.confirmDialogRef.afterClosed().subscribe(result => {
             if ( result )
             {
                 this._fertiliserService.deleteFertiliser(contact);
             }
             this.confirmDialogRef = null;
         });
 
     }

   
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.dataSource = new FilesDataSource(this._fertiliserService, this.paginator, this.sort);

        fromEvent(this.filter.nativeElement, 'keyup')
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if ( !this.dataSource )
                {
                    return;
                }

                this.dataSource.filter = this.filter.nativeElement.value;
            });
    }
    
 
}

export class FilesDataSource extends DataSource<any>
{
    private _filterChange = new BehaviorSubject('');
    private _filteredDataChange = new BehaviorSubject('');

    /**
     * Constructor
     *
     * @param {FertiliserCompositionsService} _fertiliserService
     * @param {MatPaginator} _matPaginator
     * @param {MatSort} _matSort
     */
    constructor(
        private _fertiliserService: FertiliserCompositionsService,
        private _matPaginator: MatPaginator,
        private _matSort: MatSort
    )
    {
        super();

        this.filteredData = this._fertiliserService.fertilisers;
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     *
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]>
    {
        const displayDataChanges = [
            this._fertiliserService.onfertilisersChanged,
            this._matPaginator.page,
            this._filterChange,
            this._matSort.sortChange
        ];

        return merge(...displayDataChanges)
            .pipe(
                map(() => {
                        let data = this._fertiliserService.fertilisers.slice();

                        data = this.filterData(data);

                        this.filteredData = [...data];

                        data = this.sortData(data);

                        // Grab the page's slice of data.
                        const startIndex = this._matPaginator.pageIndex * this._matPaginator.pageSize;
                        return data.splice(startIndex, this._matPaginator.pageSize);
                    }
                ));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    // Filtered data
    get filteredData(): any
    {
        return this._filteredDataChange.value;
    }

    set filteredData(value: any)
    {
        this._filteredDataChange.next(value);
    }

    // Filter
    get filter(): string
    {
        return this._filterChange.value;
    }

    set filter(filter: string)
    {
        this._filterChange.next(filter);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Filter data
     *
     * @param data
     * @returns {any}
     */
    filterData(data): any
    {
        if ( !this.filter )
        {
            return data;
        }
        return FuseUtils.filterArrayByString(data, this.filter);
    }
    
    

    /**
     * Sort data
     *
     * @param data
     * @returns {any[]}
     */
    sortData(data): any[]
    {
        if ( !this._matSort.active || this._matSort.direction === '' )
        {
            return data;
        }

        return data.sort((a, b) => {
            let propertyA: number | string = '';
            let propertyB: number | string = '';

            switch ( this._matSort.active )
            {
                case 'id':
                    [propertyA, propertyB] = [a.id, b.id];
                    break;
                case 'name':
                    [propertyA, propertyB] = [a.name, b.name];
                    break;
                case 'categories':
                    [propertyA, propertyB] = [a.categories[0], b.categories[0]];
                    break;
                case 'price':
                    [propertyA, propertyB] = [a.priceTaxIncl, b.priceTaxIncl];
                    break;
                case 'quantity':
                    [propertyA, propertyB] = [a.quantity, b.quantity];
                    break;
                case 'status':
                    [propertyA, propertyB] = [a.status, b.status];
                    break;
            }

            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

            return (valueA < valueB ? -1 : 1) * (this._matSort.direction === 'asc' ? 1 : -1);
        });
    }

    /**
     * Disconnect
     */
    disconnect(): void
    {
    }

  
}
