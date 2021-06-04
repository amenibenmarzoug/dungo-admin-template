import { Injectable, EventEmitter, } from "@angular/core";
import { List } from "lodash";
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';

const AUTH_API = 'http://localhost:8083/api/';
const USER_KEY = 'auth-user';
@Injectable({ providedIn: "root" })
export class LoginService implements Resolve<any> {
   

    roles: string[];
    userOnChanged: BehaviorSubject<any>;
    user: any;
    data: any;
    userId: any;

    filterBy: any;
    userRole: any;
    name: string;
    email: string;

    receivedFilter: EventEmitter<string[]>;
    constructor(private _httpClient: HttpClient) {
        this.userOnChanged = new BehaviorSubject({});
       
        this.receivedFilter = new EventEmitter<string[]>();
    }
    raiseEvent(roles: string[]): void {
        this.roles = roles;
        this.receivedFilter.emit(roles);
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
                this.getUserById(this.userId),
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });


    }



    getUserById(id): Promise<any> {


        return new Promise((resolve, reject) => {
            this._httpClient.get(AUTH_API + 'user/' + id)
                .subscribe((response: any) => {
                    this.user = response;
                    this.userOnChanged.next(this.user);
                    resolve(response);
                }, reject);
        }
        );
    }

}