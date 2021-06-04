import { CalendarEventAction } from 'angular-calendar';
import { startOfDay, endOfDay } from 'date-fns';
import { FuseUtils } from '@fuse/utils';

export class Challenge {

    missionId: number;
    missionTitle: string;
    type: string;
    nbPoints: number;
    missionStart: Date;
    missionExp: Date;
    missionDesc: string;


    actions?: CalendarEventAction[];

    cssClass?: string;
    resizable?: {
        beforeStart?: boolean;
        afterEnd?: boolean;
    };
     draggable?: boolean;
    // meta?: {
    //     location: string,
    //     notes: string
    // };



    constructor(challenge) {
        this.missionId = challenge.missionId || '';
        this.missionTitle = challenge.missionTitle || '';
        this.type = challenge.type || '';
        this.nbPoints = challenge.nbPoints || '';
        this.missionStart = new Date(challenge.missionStart) || startOfDay(new Date());
        this.missionExp = new Date(challenge.missionExp) || endOfDay(new Date());


        this.draggable = challenge.draggable;
        this.resizable = {
            beforeStart: challenge.resizable && challenge.resizable.beforeStart || true,
            afterEnd: challenge.resizable && challenge.resizable.afterEnd || true
        };
        // this.actions = cursus.actions || [];

        // this.cssClass = cursus.cssClass || '';
        // this.meta = {
        //     location: cursus.meta && cursus.meta.location || '',
        //     notes: cursus.meta && cursus.meta.notes || ''
        // };
    }
}
