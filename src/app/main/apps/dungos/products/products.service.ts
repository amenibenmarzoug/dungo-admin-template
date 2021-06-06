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
    listLength: number;
    dungosDetails: any[];
    onDungosChanged: BehaviorSubject<any>;
    onDungosDetailsChanged: BehaviorSubject<any>;
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
        this.onDungosDetailsChanged = new BehaviorSubject({});
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
                this.getDungos(),
                this.getDungosLocations()
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
     * Get products
     *
     * @returns {Promise<any>}
     */
      getDungosLocations(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'dungo/details')
                .subscribe((response: any) => {
                    //response.qrCode = this.sanitizer.bypassSecurityTrustUrl(this.imageType + response.qrCode); 
                    this.dungosDetails = response;
                    console.log(response)
                    this.listLength = response.length;
                    console.log(this.listLength)
                    this.onDungosDetailsChanged.next(this.dungosDetails);
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
