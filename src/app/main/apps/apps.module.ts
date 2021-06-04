import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';
import { ManagerDashboardComponent } from './dashboards/manager-dashboard/manager-dashboard.component';

const routes = [
    {
        path        : 'dashboards/analytics',
        loadChildren: () => import('./dashboards/analytics/analytics.module').then(m => m.AnalyticsDashboardModule)
    },
    {
        path        : 'dashboards/manager-dashboard',
        loadChildren: () => import('./dashboards/manager-dashboard/manager-dashboard.module').then(m => m.ManagerDashboardModule)
    },
    {
        path        : 'dashboards/project',
        loadChildren: () => import('./dashboards/project/project.module').then(m => m.ProjectDashboardModule)
    },
    {
        path        : 'mail',
        loadChildren: () => import('./mail/mail.module').then(m => m.MailModule)
    },
    {
        path        : 'mail-ngrx',
        loadChildren: () => import('./mail-ngrx/mail.module').then(m => m.MailNgrxModule)
    },
    {
        path        : 'chat',
        loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule)
    },
    {
        path        : 'calendar',
        loadChildren: () => import('./calendar/calendar.module').then(m => m.CalendarModule)
    },
    {
        path        : 'dungos',
        loadChildren: () => import('./dungos/dungos.module').then(m => m.DungosModule)
    },
    
    {
        path        : 'fertiliser',
        loadChildren: () => import('./fertiliser/fertiliser.module').then(m => m.FertiliserModule)
    },
    {
        path        : 'challenge-part',
        loadChildren: () => import('./challenge-part/academy.module').then(m => m.AcademyModule)
    },
    {
        path        : 'todo',
        loadChildren: () => import('./todo/todo.module').then(m => m.TodoModule)
    },
    {
        path        : 'file-manager',
        loadChildren: () => import('./file-manager/file-manager.module').then(m => m.FileManagerModule)
    },
    {
        path        : 'contacts',
        loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsModule)
    },
    {
        path        : 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
    },
   
    {
        path        : 'scrumboard',
        loadChildren: () => import('./scrumboard/scrumboard.module').then(m => m.ScrumboardModule)
    }
];

@NgModule({
    imports     : [
        RouterModule.forChild(routes),
        FuseSharedModule
    ],
})
export class AppsModule
{
}
