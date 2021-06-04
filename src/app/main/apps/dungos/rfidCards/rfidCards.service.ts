import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'app/models/user.model';

const AUTH_API = 'http://localhost:8085/api/';

const USER_SERVICE_API = 'http://localhost:8085/api/';

@Injectable()
export class RfidCardsService implements Resolve<any>
{
    cards: any [];
    onCardsChanged: BehaviorSubject<any>;
    userId: number[];
    users: any[];
    //orders: any[];
   // onOrdersChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    )
    {
        // Set the defaults
        //this.onOrdersChanged = new BehaviorSubject({});
        this.onCardsChanged = new BehaviorSubject({});
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise<void>((resolve, reject) => {

            Promise.all([
                //this.getOrders(),
                this.getCards()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get orders
     *
     * @returns {Promise<any>}
     */
    // getOrders(): Promise<any>
    // {
    //     return new Promise((resolve, reject) => {
    //         this._httpClient.get('api/e-commerce-orders')
    //             .subscribe((response: any) => {
    //                 this.orders = response;
    //                 this.onOrdersChanged.next(this.orders);
    //                 resolve(response);
    //             }, reject);
    //     });
    // }

    getCards(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'card')
                .subscribe((response: any) => {
                    this.cards = response;
                    this.onCardsChanged.next(this.cards);
                    resolve(response);
                }, reject);
        });
    }

     
}
