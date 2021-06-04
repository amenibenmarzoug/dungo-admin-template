import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../core/http/authentication/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private auth: AuthService, private alertCtrl: AlertController) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.auth.userValue;

        if (user) {
            if (route.data.roles && route.data.roles.indexOf(user.roles) === -1) {
                this.alertCtrl.create({
                    header: 'Unauthorized',
                    message: 'You are not allowed to access that page.',
                    buttons: ['OK']
                }).then(alert => alert.present());

                this.router.navigateByUrl('/');
                return false;
            }
        } else {
            return true;
        }
        return false;

    }
}