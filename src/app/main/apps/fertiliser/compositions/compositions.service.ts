import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

const BACK_API = 'http://localhost:8085/api/';

@Injectable()
export class FertiliserCompositionsService implements Resolve<any>
{
    fertilisers: any[];
    onfertilisersChanged: BehaviorSubject<any>;
    private sanitizer: DomSanitizer;
    private image: any;
    private readonly imageType: string = 'data:image/PNG;base64,';

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    ) {
        // Set the defaults
        this.onfertilisersChanged = new BehaviorSubject({});
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise<void>((resolve, reject) => {

            Promise.all([
                this.getFertiliser()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get products
     *
     * @returns {Promise<any>}
     */
    getFertiliser(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(BACK_API + 'fertiliser')
                .subscribe((response: any) => {
                    this.fertilisers = response;
                    console.log("hnee" + response)
                    this.onfertilisersChanged.next(this.fertilisers);
                    resolve(response);
                }, reject);
        });
    }
    /**
     * Update contact
     *
     * @param contact
     * @returns {Promise<any>}
     */
     addFertiliser(fertiliser): Promise<any>
     {
         return new Promise((resolve, reject) => {
 
             this._httpClient.post(BACK_API +'fertiliser' , fertiliser)
                 .subscribe(response => {
                     this.getFertiliser();
                     resolve(response);
                 });
         });
     }
 
     updateFertiliser(fertiliser): Promise<any>
     {
         return new Promise((resolve, reject) => {
             this._httpClient.put(BACK_API + 'fertiliser'  , fertiliser )
                 .subscribe(response => {
                     this.getFertiliser();
                     resolve(response);
                 });
         });
     }
     /**
     * Delete contact
     *
     * @param contact
     */
    deleteFertiliser(fertiliser): void
    {
        const contactIndex = this.fertilisers.indexOf(fertiliser);
        this.fertilisers.splice(contactIndex, 1);
        this.onfertilisersChanged.next(this.fertilisers);
    }

}
