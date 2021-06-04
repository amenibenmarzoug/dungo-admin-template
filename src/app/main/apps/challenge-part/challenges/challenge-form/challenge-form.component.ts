import { Component, OnInit } from '@angular/core';
import { Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CalendarEvent } from 'angular-calendar';
import { Challenge } from 'app/models/challenge.model';

@Component({
  selector: 'app-challenge-form',
  templateUrl: './challenge-form.component.html',
  styleUrls: ['./challenge-form.component.scss']
})
export class ChallengeFormComponent implements OnInit {

  action: string;
  challenge: Challenge;
  event: CalendarEvent;
  challengeForm: FormGroup;
  dialogTitle: string;

  missionStart: Date;
  missionExp: Date;

  constructor(
    public matDialogRef: MatDialogRef<ChallengeFormComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,

    private _formBuilder: FormBuilder
  ) {
    // Set the defaults
    this.action = _data.action;


    if (this.action === 'edit') {
      this.dialogTitle = 'Edit Programme';
      this.challenge = _data.challenge;

    }
    else {

      this.dialogTitle = 'Nouveau Challenge';
      this.challenge = new Challenge({});

    }
    this.challengeForm = this.createChallengeForm();
  }

  ngOnInit(): void {
  }


  createChallengeForm(): FormGroup {

    return this._formBuilder.group({
      id: [this.challenge.missionId],
      missionTitle: [this.challenge.missionTitle],
      type: [this.challenge.type],
      missionStart: [this.challenge.missionStart],
      missionExp: [this.challenge.missionExp],
      nbPoints: [this.challenge.nbPoints],
      missionDesc: [this.challenge.missionDesc],
      


    });

  }

}
