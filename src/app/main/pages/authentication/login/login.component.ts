import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { AuthentificationService } from '../common-auth/authentification.service';
import { TokenStorageService } from '../common-auth/token-storage.service';
import { Subject } from 'rxjs';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';
import { TranslateService } from '@ngx-translate/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { navigationManager } from 'app/navigation/navigationManager';
import { navigation } from 'app/navigation/navigation';
import { LoginService } from './login.service';

const USER_KEY = 'auth-user';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage = '';
    roles: string[] = [];
    email: string;
    navigation: any;
    showAdminBoard = false;
    showManagerBoard = false;


    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    private _unsubscribeAll: Subject<any>;
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private router: Router,
        private _loginService: LoginService,
        private _authService: AuthentificationService,
        private _tokenStorage: TokenStorageService,
        private _fuseNavigationService: FuseNavigationService,
        private _fuseSidebarService: FuseSidebarService,
        private _fuseSplashScreenService: FuseSplashScreenService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _translateService: TranslateService,
        private tokenStorageService: TokenStorageService,

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
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.loginForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
        if (this._tokenStorage.getToken()) {
            this.isLoggedIn = true;
            this.roles = this._tokenStorage.getUser().roles;
            this._loginService.data = JSON.parse(sessionStorage.getItem(USER_KEY));
            this._loginService.userId = this._loginService.data.id;
            this._loginService.userRole = this._loginService.data.roles;
        }


    }

    // tslint:disable-next-line:typedef
    onSubmit() {
        this._authService.login(this.loginForm).subscribe(
            data => {
                this._tokenStorage.saveToken(data.accessToken);
                this._tokenStorage.saveUser(data);

                this.isLoginFailed = false;
                this.isLoggedIn = true;
                this.roles = this._tokenStorage.getUser().roles;
                this._loginService.data = JSON.parse(sessionStorage.getItem(USER_KEY));
                this._loginService.getUserById(this._loginService.data.id).then(() => {
                    this._loginService.name = this._loginService.user.firstname + " " + this._loginService.user.lastname;
                    this._loginService.email = this._loginService.user.email;

                });
                this.loadingNavbar();
                this.router.navigate(['/apps/dashboards/project']);
            },
            err => {
                this.errorMessage = err.error.message;
                this.isLoginFailed = true;
            }
        );
    }

    // tslint:disable-next-line:typedef
    reloadPage() {
        window.location.reload();
    }

    loadingNavbar() {

        this._fuseNavigationService.register('test', this.navigation);

        this._fuseNavigationService.setCurrentNavigation('test');

        this._translateService.addLangs(['en', 'tr']);

        this._translateService.setDefaultLang('en');


        this._translateService.use('en');

        this.isLoggedIn = !!this.tokenStorageService.getToken()


        if (this.isLoggedIn) {
            const user = this.tokenStorageService.getUser();
            this.roles = user.roles;
            this.showAdminBoard = this.roles.includes('ADMIN');
            this.showManagerBoard = this.roles.includes('MANAGER');

        }

        if (this.showAdminBoard) {
            // Get default navigation
            this.navigation = navigation;

            // Register the navigation to the service
            this._fuseNavigationService.register('main', this.navigation);

            // Set the main navigation as our current navigation
            this._fuseNavigationService.setCurrentNavigation('main');

            // Add languages
            this._translateService.addLangs(['en', 'tr', 'fr']);

            // Set the default language
            this._translateService.setDefaultLang('fr');

            // Use a language
            this._translateService.use('fr');


        }

        if (this.showManagerBoard) {
            // Get default navigation
            this.navigation = navigationManager;

            // Register the navigation to the service
            this._fuseNavigationService.register('manager', this.navigation);

            // Set the main navigation as our current navigation
            this._fuseNavigationService.setCurrentNavigation('manager');

            // Add languages
            this._translateService.addLangs(['en', 'tr', 'fr']);

            // Set the default language
            this._translateService.setDefaultLang('fr');


            // Use a language
            this._translateService.use('fr');


        }
    }

}
