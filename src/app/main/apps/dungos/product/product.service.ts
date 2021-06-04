import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';


const AUTH_API = 'http://localhost:8085/api/';

@Injectable()
export class EcommerceProductService implements Resolve<any>
{
    routeParams: any;
    dungo: any;
    composte: any[];
    onComposteChanged: BehaviorSubject<any>;
    onDungoChanged: BehaviorSubject<any>;
    quantity: number;
    rate: number;
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
        this.onDungoChanged = new BehaviorSubject({});
        this.onComposteChanged = new BehaviorSubject({});
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
        this.routeParams = route.params;

        return new Promise<void>((resolve, reject) => {

            Promise.all([
                this.getDungo(),
                this.getQuantity(),
                this.getComposte(),

            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get product
     *
     * @returns {Promise<any>}
     */
    getDungo(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            // if ( this.routeParams.id === 'new' )
            // {
            //     this.onDungoChanged.next(false);
            //     resolve(false);
            // }
            // else
            // {
                this._httpClient.get( AUTH_API + 'dungo/'+ this.routeParams.id)
                    .subscribe((response: any) => {
                        this.dungo = response;
                        this.onDungoChanged.next(this.dungo);
                        resolve(response);
                    }, reject);
            //}
        });
    }

    /**
     * Get product
     *
     * @returns {Promise<any>}
     */
     getQuantity(): Promise<any>
     {
         return new Promise((resolve, reject) => {
             // if ( this.routeParams.id === 'new' )
             // {
             //     this.onDungoChanged.next(false);
             //     resolve(false);
             // }
             // else
             // {
                 this._httpClient.get( AUTH_API + 'contribution/quantity/total/'+ this.routeParams.id)
                     .subscribe((response: any) => {
                         this.quantity = response;
                         
                         //this.onDungoChanged.next(this.dungo);
                         resolve(response);
                     }, reject);
             //}
         });
     }

     /**
     * Get product
     *
     * @returns {Promise<any>}
     */
      getComposte(): Promise<any>
      {
          return new Promise((resolve, reject) => {
            
                  this._httpClient.get( AUTH_API + 'contribution/dungo/'+ this.routeParams.id)
                      .subscribe((response: any) => {
                          this.composte = response;
                          this.onComposteChanged.next(this.dungo);
                          resolve(response);
                      }, reject);
              
          });
      }

      /**
     * Get product
     *
     * @returns {Promise<any>}
     */
    getRating(): Promise<any>
    {
        return new Promise((resolve, reject) => {
                this._httpClient.get( AUTH_API + 'review/'+ this.routeParams.id)
                    .subscribe((response: any) => {
                        this.rate = response;
                        resolve(response);
                    }, reject);
            //}
        });
    }

    
}
