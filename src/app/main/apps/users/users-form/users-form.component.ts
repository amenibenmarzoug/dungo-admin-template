import { User } from './../../../../models/user.model';
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '../users.service';


@Component({
    selector     : 'users-contact-form-dialog',
    templateUrl  : './users-form.component.html',
    styleUrls    : ['./users-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class UsersFormDialogComponent
{
    action: string;
    user: User;
    userForm: FormGroup;
    dialogTitle: string;
    roles: any[];

    cities: String[] = [
        'Tunis', 'Ariana', 'Ben Arous', 'Manouba', 'Nabeul', 'Zaghouan', 'Bizerte', 'Béja', 'Jendouba', 'Kef', 'Siliana',
        'Sousse', 'Monastir', 'Mahdia', 'Sfax', 'Kairouan', 'Kasserine', 'Sidi Bouzid', 'Gabès', 'Mednine', 'Tataouine', 'Gafsa', 'Tozeur', 'Kebili'

    ];

    /**
     * Constructor
     *
     * @param {MatDialogRef<UsersFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<UsersFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _usersService: UsersService
    )
    {
        // Set the defaults
        this.action = _data.action;

        if ( this.action === 'edit' )
        {
            this.dialogTitle = 'Afficher Utilisateur';
            this.user = _data.contact;
            this.userForm = this.editUserForm();
        }
        else
        {
            this.dialogTitle = 'Ajouter Utilisateur';
            this.user = new User({});
            this.userForm = this.createUserForm();
        }
        this.roles = this._usersService.roles;

        
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create contact form
     *
     * @returns {FormGroup}
     */
     editUserForm(): FormGroup
    {
        return this._formBuilder.group({
            id      : [this.user.id],
            firstname    : [this.user.firstname],
            lastname: [this.user.lastname],
            email  : [this.user.email],
            addressLine: [this.user.address.addressLine],
            city: [this.user.address.city],
            zipCode: [this.user.address.zipCode],
            phoneNumber   : [this.user.phoneNumber],
            jobTitle: [this.user.jobTitle],
            gender: [this.user.gender],
            birthday: [this.user.birthday],
            role: [this.user.roles]
        });
    }

    /**
     * Create contact form
     *
     * @returns {FormGroup}
     */
     createUserForm(): FormGroup
    {
        return this._formBuilder.group({
            id      : [this.user.id],
            firstname    : [this.user.firstname],
            lastname: [this.user.lastname],
            email  : [this.user.email],
            addressLine: [''],
            city: [''],
            zipCode: [''],
            phoneNumber   : [this.user.phoneNumber],
            jobTitle: [this.user.jobTitle],
            gender: [this.user.gender],
            birthday: [this.user.birthday],
            roles: [this.user.roles]
        });
    }

    getRoleForm(event) {

        this._usersService.role = event;
        console.log(event)
    }
}
