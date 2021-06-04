import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

const AUTH_API = 'http://localhost:8085/api/';

@Injectable()
export class EcommerceProductsService implements Resolve<any>
{
    dungos: any[];
    onDungosChanged: BehaviorSubject<any>;
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
        this.onDungosChanged = new BehaviorSubject({});
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
                this.getDungos()
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
    getDungos(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'dungo')
                .subscribe((response: any) => {
                    //response.qrCode = this.sanitizer.bypassSecurityTrustUrl(this.imageType + response.qrCode); 
                    this.dungos = response;
                    this.onDungosChanged.next(this.dungos);
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
     addDungo(dungo): Promise<any>
     {
         return new Promise((resolve, reject) => {
 
             this._httpClient.post(AUTH_API +'dungo' , dungo)
                 .subscribe(response => {
                     this.getDungos();
                     resolve(response);
                 });
         });
     }
 
     updateDungo(dungo): Promise<any>
     {
         return new Promise((resolve, reject) => {
             this._httpClient.put(AUTH_API + 'dungo'  , dungo )
                 .subscribe(response => {
                     this.getDungos();
                     resolve(response);
                 });
         });
     }
     /**
     * Delete contact
     *
     * @param contact
     */
    deleteDungo(contact): void
    {
        const contactIndex = this.dungos.indexOf(contact);
        this.dungos.splice(contactIndex, 1);
        this.onDungosChanged.next(this.dungos);
    }

}
