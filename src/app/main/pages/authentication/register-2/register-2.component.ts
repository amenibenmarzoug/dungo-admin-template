import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { AuthentificationService } from '../common-auth/authentification.service';
import { Router } from '@angular/router';

@Component({
    selector: 'register-2',
    templateUrl: './register-2.component.html',
    styleUrls: ['./register-2.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class Register2Component implements OnInit, OnDestroy {

    cities: String[] = [
        'Tunis', 'Ariana', 'Ben Arous', 'Manouba', 'Nabeul', 'Zaghouan', 'Bizerte', 'Béja', 'Jendouba', 'Kef', 'Siliana',
        'Sousse', 'Monastir', 'Mahdia', 'Sfax', 'Kairouan', 'Kasserine', 'Sidi Bouzid', 'Gabès', 'Mednine', 'Tataouine', 'Gafsa', 'Tozeur', 'Kebili'

    ];

    registerForm: FormGroup;
    isSuccessful = false;
    isSignUpFailed = false;
    errorMessage = '';

    formErrors = {
        'firstname': '',
        'lastname': '',
        'gender': '',
        'phoneNumber': '',
        'email': '',
        'role': '',
        'password': '',
        'passwordConfirm': '',
        'city': '',
        'addressLine': '',
        'zipCode': '',

    };

    validationMessages = {
        'firstname': {
            'required': 'Le prénom est requis.',
            'minlength': 'La longueur du prénom doit être supérieure à 2.',

        },
        'lastname': {
            'required': 'Le nom est requis.',
            'minlength': 'La longueur du nom doit être supérieure à 2.',

        },
        'gender': {
            'required': 'Le sexe est requis.',
        },
        'phoneNumber': {
            'required': 'Le numéro de télépohne est requis.',
            'pattern': 'Le numéro ne doit contenir que des chiffres.'
        },
        'email': {
            'required': 'L\'adresse email est requise',
            'email': 'Veuillez donner un format valide'
        },

        'role': {
            'required': 'Le role d\'utlisateur est requis.',
        },
        'password': {
            'required': 'Le mot de passe est requis.',
            'minlength': 'Le mot de passe doit contenir au moins six caractères.',

        },
        'passwordConfirm': {
            'required': 'Le mot de passe est requis.',
            'passwordsNotMatching': 'Veuillez vérifier le mot de passe'

        },
        'city': {
            'required': 'La ville est requise.',
        },
        'addressLine': {
            'required': 'La rue est requise.',
        },
        'zipCode': {
            'required': 'Le code postal est requis.',
            'pattern': 'Le code postal ne doit contenir que des chiffres.'
        },

    }

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthentificationService
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };

        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this.createForm();

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {


        // Update the validity of the 'passwordConfirm' field
        // when the 'password' field changes
        this.registerForm.get('password').valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.registerForm.get('passwordConfirm').updateValueAndValidity();
            });
    }

    createForm() {
        const phone = '^[0-9]*$';
        const code = '^[0-9]*$';
        this.registerForm = this._formBuilder.group({
            role: ['', [Validators.required]],
            firstname: ['', [Validators.required, Validators.minLength(2)]],
            lastname: ['', [Validators.required, Validators.minLength(2)]],
            phoneNumber: ['', [Validators.required, Validators.pattern(phone)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            gender: ['', [Validators.required]],
            address: this._formBuilder.group({
                city: ['', [Validators.required]],
                addressLine: ['', [Validators.required]],
                zipCode: ['', [Validators.required, Validators.pattern(code)]],
            }),
            passwordConfirm: ['', [Validators.required, confirmPasswordValidator]]
        });
    }
    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    onSubmit() {

        console.log("data USER FORM");
        console.log(this.registerForm);
        this.authService.register(this.registerForm).subscribe(
            data => {
                console.log(data);
                this.isSuccessful = true;
                this.isSignUpFailed = false;
                this.router.navigate(['/pages/auth/login']);
            },
            err => {
                this.errorMessage = err.error.message;
                this.isSignUpFailed = true;
            }
        );
    }

    onValueChanged(data?: any) {
        if (!this.registerForm) { return; }
        const form = this.registerForm;
        for (const field in this.formErrors) {
            if (this.formErrors.hasOwnProperty(field)) {
                // clear previous error message (if any)
                this.formErrors[field] = '';
                const control = form.get(field);
                if (control && (control.dirty || control.touched) && !control.valid) {
                    const messages = this.validationMessages[field];
                    for (const key in control.errors) {
                        if (control.errors.hasOwnProperty(key)) {
                            this.formErrors[field] += messages[key] + ' ';
                        }
                    }
                }
            }
        }
    }
}

/**
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @returns {ValidationErrors | null}
 */
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    if (!control.parent || !control) {
        return null;
    }

    const password = control.parent.get('password');
    const passwordConfirm = control.parent.get('passwordConfirm');

    if (!password || !passwordConfirm) {
        return null;
    }

    if (passwordConfirm.value === '') {
        return null;
    }

    if (password.value === passwordConfirm.value) {
        return null;
    }

    return { passwordsNotMatching: true };
};
