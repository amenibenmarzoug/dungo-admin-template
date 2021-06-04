import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { RfidCardService } from 'app/main/apps/dungos/rfidCard/rfidCard.service';
import { RfidCard } from 'app/models/RfidCard.model';
import { User } from 'app/models/user.model';

@Component({
    selector: 'e-commerce-order',
    templateUrl: './rfidCard.component.html',
    styleUrls: ['./rfidCard.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class RfidCardComponent implements OnInit, OnDestroy {
    card: RfidCard;
    user: User;
    cardStatus: any;
    cardForm: FormGroup;
    userId: number;

    // Private
    private _unsubscribeAll: Subject<any>;
    status: any;

    /**
     * Constructor
     *
     * @param {RfidCardService} _rfidCardService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _rfidCardService: RfidCardService,
        private _formBuilder: FormBuilder
    ) {
        // Set the defaults
        this.card = new RfidCard({});
        this.user = new User({});
      
        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this.statusForm();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to update order on changes
        // this.user = this._ecommerceOrderService.user;
        // console.log("hya 3aaad" + this.user)
        this._rfidCardService.onCardChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(order => {
                this.card = new RfidCard(order);
            });
        this._rfidCardService.onUserChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(user => {
                this.user = new User(user);
               // this.userId = this.user.id;
            });
      
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    getRowColor(status) {
        if (status === 'PENDING') {
            return 'orange';

        }else if (status === 'REFUSED'){
            return 'red';
        }
        else if (status === 'CONFIRMED'){
            return 'green';
        }
        else{
            return 'blue'
        }
        
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    statusForm(){
        this.cardForm = this._formBuilder.group({
            status: [''],
           
        });
        console.log(this.cardForm.status)
    }
    /**
     * Update status
     */
    updateStatus() {

      
        // const newStatusId = Number.parseInt(this.card.get('status').value);

        // if (!newStatusId) {
        //     return;
        // }

        // const newStatus = this.cardStatus.find((status) => {
        //     return status.id === newStatusId;
        // });

        // newStatus['date'] = new Date().toString();

        //this.card.status.unshift(newStatus);
        console.log(this.status);
        console.log(this.card)
        this.card.status = this.status;
        this._rfidCardService.saveCard(this.card);
    }

    
}
