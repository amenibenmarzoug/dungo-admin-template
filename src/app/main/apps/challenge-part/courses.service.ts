import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';


const SERVER_API = 'http://localhost:8087/api/';


@Injectable()
export class AcademyCoursesService implements Resolve<any>
{
    onCategoriesChanged: BehaviorSubject<any>;
    onChallengesChanged: BehaviorSubject<any>;

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
        this.onCategoriesChanged = new BehaviorSubject({});
        this.onChallengesChanged = new BehaviorSubject({});
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

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
                this.getCategories(),
                this.getChallenges()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get categories
     *
     * @returns {Promise<any>}
     */
    getCategories(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/academy-categories')
                .subscribe((response: any) => {
                    this.onCategoriesChanged.next(response);
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Get courses
     *
     * @returns {Promise<any>}
     */
    getChallenges(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get(SERVER_API + 'challenge')
                .subscribe((response: any) => {
                    this.onChallengesChanged.next(response);
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
     addChallenge(challenge): Promise<any> {
        return new Promise((resolve, reject) => {

            this._httpClient.post(SERVER_API + 'challenge', challenge)
                .subscribe(response => {
                    this.getChallenges();
                    resolve(response);
                });
        });
    }


}
