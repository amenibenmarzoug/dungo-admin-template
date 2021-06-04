import { User } from './../../../models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { FuseUtils } from '@fuse/utils';

const AUTH_API = 'http://localhost:8083/api/';

@Injectable()
export class UsersService implements Resolve<any>
{
    onUsersChanged: BehaviorSubject<any>;
    onRoleChanged: BehaviorSubject<any>;

    onSelectedUsersChanged: BehaviorSubject<any>;
    onSearchTextChanged: Subject<any>;
    onFilterChanged: Subject<any>;

    users: User[];
    roles: User[];
    user: any;
    role: any;
    selectedUsers: string[] = [];

    searchText: string;
    filterBy: string;

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
        this.onUsersChanged = new BehaviorSubject([]);
        this.onRoleChanged = new BehaviorSubject([]);
        this.onSelectedUsersChanged = new BehaviorSubject([]);
        this.onSearchTextChanged = new Subject();
        this.onFilterChanged = new Subject();
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
        return new Promise<void | void>((resolve, reject) => {

            Promise.all([
                this.getUsers(),
                this.getRoles()
            ]).then(
                ([files]) => {

                    this.onSearchTextChanged.subscribe(searchText => {
                        this.searchText = searchText;
                        this.getUsers();
                    });

                    this.onFilterChanged.subscribe(filter => {
                        this.filterBy = filter;
                        this.getUsers();
                    });

                    resolve();

                },
                reject
            );
        });
    }

    /**
     * Get contacts
     *
     * @returns {Promise<any>}
     */
     getUsers(): Promise<any>
    {
        return new Promise((resolve, reject) => {
                this._httpClient.get(AUTH_API + 'user')
                    .subscribe((response: any) => {

                        this.users = response;

                        if (this.filterBy === 'dungers') {
                            this.users = this.users.filter(_contact => {
                                console.log(_contact.roles[0].name)
                                if (_contact.roles[0].name == "USER") { return true; }
                                return false;
    
                            });
                        }
                        if (this.filterBy === 'managers') {
                            this.users = this.users.filter(_contact => {
                                if (_contact.roles[0].name == "MANAGER") { return true; }
                                return false;
    
                            });
                        }
                        if ( this.searchText && this.searchText !== '' )
                        {
                            this.users = FuseUtils.filterArrayByString(this.users, this.searchText);
                        }

                        this.users = this.users.map(contact => {
                            return new User(contact);
                        });

                        this.onUsersChanged.next(this.users);
                        resolve(this.users);
                    }, reject);
            }
        );
    }

    getRoles(): Promise<any> {


        return new Promise((resolve, reject) => {
            this._httpClient.get('http://localhost:8083/api/role')
                .subscribe((response: any) => {
                    console.log(response);
                    this.onRoleChanged.next(response);
                    this.roles = response;
                    resolve(response);
                }, reject);
        }
        );
    }

    /**
     * Toggle selected contact by id
     *
     * @param id
     */
    toggleSelectedUser(id): void
    {
        // First, check if we already have that contact as selected...
        if ( this.selectedUsers.length > 0 )
        {
            const index = this.selectedUsers.indexOf(id);

            if ( index !== -1 )
            {
                this.selectedUsers.splice(index, 1);

                // Trigger the next event
                this.onSelectedUsersChanged.next(this.selectedUsers);

                // Return
                return;
            }
        }

        // If we don't have it, push as selected
        this.selectedUsers.push(id);

        // Trigger the next event
        this.onSelectedUsersChanged.next(this.selectedUsers);
    }

    /**
     * Toggle select all
     */
    toggleSelectAll(): void
    {
        if ( this.selectedUsers.length > 0 )
        {
            this.deselectUsers();
        }
        else
        {
            this.selectUsers();
        }
    }

    /**
     * Select contacts
     *
     * @param filterParameter
     * @param filterValue
     */
    selectUsers(filterParameter?, filterValue?): void
    {
        this.selectedUsers = [];

        // If there is no filter, select all contacts
        if ( filterParameter === undefined || filterValue === undefined )
        {
            this.selectedUsers = [];
            this.users.map(user => {
                this.selectedUsers.push(user.id.toString());
            });
        }

        // Trigger the next event
        this.onSelectedUsersChanged.next(this.selectedUsers);
    }

    /**
     * Update contact
     *
     * @param contact
     * @returns {Promise<any>}
     */
    addUser(contact): Promise<any>
    {
        return new Promise((resolve, reject) => {
            contact.password = contact.phoneNumber;
            contact.roles = this.role;
            console.log("haya 3aaad" + contact.roles)
            this._httpClient.post(AUTH_API + 'user/admin', contact)
                .subscribe(response => {
                   
                    this.getUsers();
                    resolve(response);
                });
        });
    }

   
   
    /**
     * Deselect contacts
     */
    deselectUsers(): void
    {
        this.selectedUsers = [];

        // Trigger the next event
        this.onSelectedUsersChanged.next(this.selectedUsers);
    }

    /**
     * Delete contact
     *
     * @param contact
     */
    deleteUser(contact): void
    {
        const contactIndex = this.users.indexOf(contact);
        this.users.splice(contactIndex, 1);
        this.onUsersChanged.next(this.users);
    }

    /**
     * Delete selected contacts
     */
    deleteSelectedUsers(): void
    {
        for ( const userId of this.selectedUsers )
        {
            const user = this.users.find(_contact => {
                return _contact.id === Number(userId);
            });
            this.deleteUser(Number(userId));
            const contactIndex = this.users.indexOf(user);
            this.users.splice(contactIndex, 1);
        }
        this.onUsersChanged.next(this.users);
        this.deselectUsers();
    }

}
