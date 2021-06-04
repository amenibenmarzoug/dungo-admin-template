import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Dungo } from 'app/models/dungo.model';


@Component({
    selector     : 'dungos-contact-form-dialog',
    templateUrl  : './dungos-form.component.html',
    styleUrls    : ['./dungos-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class DungosFormDialogComponent
{
    action: string;
    dungo: Dungo;
    dungoForm: FormGroup;
    dialogTitle: string;

    cities: string[] = [
        'Tunis', 'Ariana', 'Ben Arous', 'Manouba', 'Nabeul', 'Zaghouan', 'Bizerte', 'Béja', 'Jendouba', 'Kef', 'Siliana',
        'Sousse', 'Monastir', 'Mahdia', 'Sfax', 'Kairouan', 'Kasserine', 'Sidi Bouzid', 'Gabès', 'Mednine', 'Tataouine', 'Gafsa', 'Tozeur', 'Kebili'

    ];
    /**
     * Constructor
     *
     * @param {MatDialogRef<DungosFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<DungosFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder
    )
    {
        // Set the defaults
        this.action = _data.action;

        if ( this.action === 'edit' )
        {
            this.dialogTitle = 'Modifier un Dungo';
            this.dungo = _data.contact;
            this.dungoForm = this.editContactForm();
        }
        else
        {
            this.dialogTitle = 'Ajouter un Dungo';
            this.dungo = new Dungo({});
            this.dungoForm = this.createContactForm();
        }

        
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create contact form
     *
     * @returns {FormGroup}
     */
    editContactForm(): FormGroup
    {
        return this._formBuilder.group({
            id      : [this.dungo.id],
            name    : [this.dungo.name],
            status: [this.dungo.status],
            city  : [this.dungo.city],
            //geolocalisation: [this.dungo.geolocalisation]
            geolocalisation: this._formBuilder.group({
                lat: [this.dungo.geolocalisation.lat ],
                lon: [this.dungo.geolocalisation.lon ]
            })
            // longitude: [this.dungo.geolocalisation.lon],
            // latitude : [this.dungo.geolocalisation.lat ]
            
        });
    }
    /**
     * Create contact form
     *
     * @returns {FormGroup}
     */
     createContactForm(): FormGroup
     {
         return this._formBuilder.group({
             id      : [this.dungo.id],
             name    : [this.dungo.name],
             status: [this.dungo.status],
             city  : [this.dungo.city],
             //geolocalisation: [this.dungo.geolocalisation]
             geolocalisation: this._formBuilder.group({
                 lat: ['' ],
                 lon: ['' ]
             })
             // longitude: [this.dungo.geolocalisation.lon],
             // latitude : [this.dungo.geolocalisation.lat ]
             
         });
     }
}
