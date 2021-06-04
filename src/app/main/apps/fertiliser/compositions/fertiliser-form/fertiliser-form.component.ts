import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Fertiliser } from 'app/models/fertiliser.model';


@Component({
    selector     : 'fertiliser-contact-form-dialog',
    templateUrl  : './fertiliser-form.component.html',
    styleUrls    : ['./fertiliser-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class FertiliserFormDialogComponent
{
    action: string;
    fertiliser: Fertiliser;
    fertiliserForm: FormGroup;
    dialogTitle: string;

    
    /**
     * Constructor
     *
     * @param {MatDialogRef<FertiliserFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<FertiliserFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder
    )
    {
        // Set the defaults
        this.action = _data.action;

        if ( this.action === 'edit' )
        {
            this.dialogTitle = 'Modifier un Fertiliser';
            this.fertiliser = _data.contact;
        }
        else
        {
            this.dialogTitle = 'Ajouter un Fertiliser';
            this.fertiliser = new Fertiliser({});
        }
        this.fertiliserForm = this.editFertiliserForm();


        
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create contact form
     *
     * @returns {FormGroup}
     */
     editFertiliserForm(): FormGroup
    {
        return this._formBuilder.group({
            id      : [this.fertiliser.id],
            name    : [this.fertiliser.name],
            azote: [this.fertiliser.azote],
            phosphore  : [this.fertiliser.phosphore],
            potassuim: [this.fertiliser.potassuim]
            
            
        });
    }
   
}
