import { User } from "./user.model";

export class RfidCard{
    id: string;
    user: User;
    firstname:string;
    lastname:string;
    status: String;
    createdDate: Date;
    lastModifiedDate: Date

    /**
     * Constructor
     *
     * @param contact
     */
     constructor(card)
     {
         {
             this.id = card.id || '';
             this.firstname = card.firstname || '';
             this.lastname = card.lastname || '';
             this.user = card.user || null;
             this.status = card.status || '';
             this.createdDate = card.createdDate || '';
             this.lastModifiedDate = card.lastModifiedDate || '';

         }
     }
}