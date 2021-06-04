import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';

import { AcademyCoursesService } from 'app/main/apps/challenge-part/courses.service';
import { FormGroup } from '@angular/forms';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ChallengeFormComponent } from './challenge-form/challenge-form.component';

@Component({
    selector   : 'academy-courses',
    templateUrl: './challenges.component.html',
    styleUrls  : ['./challenges.component.scss'],
    animations : fuseAnimations
})
export class ChallengesComponent implements OnInit, OnDestroy
{
    categories: any[];
    challenges: any[];
    challengesFilteredByCategory: any[];
    filteredChallenges: any[];
    currentCategory: string;
    searchTerm: string;

    dialogRef: any;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {AcademyCoursesService} _academyCoursesService
     */
    constructor(
        private _academyCoursesService: AcademyCoursesService,
        public dialog: MatDialog,
    )
    {
        // Set the defaults
        this.currentCategory = 'all';
        this.searchTerm = '';

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Subscribe to categories
        this._academyCoursesService.onCategoriesChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(categories => {
                this.categories = categories;
            });

        // Subscribe to courses
        this._academyCoursesService.onChallengesChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(challenges => {
                this.filteredChallenges = this.challengesFilteredByCategory = this.challenges = challenges;
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Filter courses by category
     */
    filterChallengesByCategory(): void
    {
        // Filter
        if ( this.currentCategory === 'all' )
        {
            this.challengesFilteredByCategory = this.challenges;
            this.filteredChallenges = this.challenges;
        }
        else
        {
            this.challengesFilteredByCategory = this.challenges.filter((challenge) => {
                return challenge.category === this.currentCategory;
            });

            this.filteredChallenges = [...this.challengesFilteredByCategory];

        }

        // Re-filter by search term
        this.filterChallengesByTerm();
    }

    /**
     * Filter courses by term
     */
    filterChallengesByTerm(): void
    {
        const searchTerm = this.searchTerm.toLowerCase();

        // Search
        if ( searchTerm === '' )
        {
            this.filteredChallenges = this.challengesFilteredByCategory;
        }
        else
        {
            this.filteredChallenges = this.challengesFilteredByCategory.filter((challenge) => {
                return challenge.title.toLowerCase().includes(searchTerm);
            });
        }
    }
    newChallenge(): void {

        this.dialogRef = this.dialog.open(ChallengeFormComponent, {
            panelClass: 'challenge-form-dialog',
            data: {
                action: 'new'
            }
        });

        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                if (!response) {
                    return;
                }

                this._academyCoursesService.addChallenge(response.getRawValue());
            });
    }
}
