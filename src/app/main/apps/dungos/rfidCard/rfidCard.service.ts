import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'app/models/user.model';



const SERVER_API = 'http://localhost:8085/api/';
const USER_SERVICE_API = 'http://localhost:8083/api/';
@Injectable()
export class RfidCardService implements Resolve<any>
{
    routeParams: any;
    card: any;
    user: any;
    userId: number;
    onCardChanged: BehaviorSubject<any>;
    onUserChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    ) {
        // Set the defaults
        this.onCardChanged = new BehaviorSubject({});
        this.onUserChanged = new BehaviorSubject({});
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        this.routeParams = route.params;

        return new Promise<void>((resolve, reject) => {

            Promise.all([
                this.getCard(),
                //this.getUserById(this.userId),
                
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get order
     *
     * @returns {Promise<any>}
     */
    getCard(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(SERVER_API + 'card/' + this.routeParams.id)
                .subscribe((response: any) => {
                    this.card = response;
                    this.getUserById(this.card.userId);
                    this.onCardChanged.next(this.card);
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Save order
     *
     * @param order
     * @returns {Promise<any>}
     */
    saveCard(card): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.put(SERVER_API +'card/' , card)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Add order
     *
     * @param order
     * @returns {Promise<any>}
     */
    addOrder(order): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.post('api/e-commerce-orders/', order)
                .subscribe((response: any) => {

                    resolve(response);
                }, reject);
        });
    }

    /**
     * get user
     *
     * @param User
     * @returns {Promise<any>}
     */
    getUserById(id): Promise<any> {


        return new Promise((resolve, reject) => {
            this._httpClient.get(USER_SERVICE_API + 'user/' + id)
                .subscribe((response: any) => {
                    this.user = response;
                    console.log(this.user)
                    //this.userId = this.user.id;
                    this.onUserChanged.next(this.user);
                    resolve(response);
                }, reject);
        }
        );
    }


}
