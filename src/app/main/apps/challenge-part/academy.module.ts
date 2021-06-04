import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { FuseSharedModule } from '@fuse/shared.module';

import { ChallengesComponent } from 'app/main/apps/challenge-part/challenges/challenges.component';
import { AcademyCourseComponent } from 'app/main/apps/challenge-part/course/course.component';
import { AcademyCoursesService } from 'app/main/apps/challenge-part/courses.service';
import { AcademyCourseService } from 'app/main/apps/challenge-part/course.service';
import { FuseSidebarModule } from '@fuse/components';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ChallengeFormComponent } from './challenges/challenge-form/challenge-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const routes = [
    {
        path: 'challenges',
        component: ChallengesComponent,
        resolve: {
            academy: AcademyCoursesService
        }
    },
    {
        path: 'challenges/:courseId/:courseSlug',
        component: AcademyCourseComponent,
        resolve: {
            academy: AcademyCourseService
        }
    },
    {
        path: '**',
        redirectTo: 'challenges'
    }
];

@NgModule({
    declarations: [
        ChallengesComponent,
        ChallengeFormComponent,
        AcademyCourseComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatSelectModule,
        MatButtonModule,
        MatDatepickerModule,
        MatDialogModule,
      
        MatSlideToggleModule,
        MatToolbarModule,
        MatTooltipModule,
        MatPaginatorModule,
        MatMenuModule,
        MatTableModule,
        MatTabsModule,
        MatSortModule,
        MatCheckboxModule,
        MatListModule,
        MatStepperModule,       
        CommonModule,
        FormsModule,
        FuseSharedModule,
        FuseSidebarModule
    ],
    providers: [
        AcademyCoursesService,
        AcademyCourseService
    ],
    entryComponents: [
        ChallengeFormComponent
    ]
})
export class AcademyModule {
}
