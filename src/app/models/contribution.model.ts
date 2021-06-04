import { Dungo } from "./dungo.model"

export class Contribution{
    id: string;
    fertiliserName: string;
    quantity: number;
    dungo: Dungo;
    azote: number;
    phosphore: number;
    postassuim: number;



    /**
     * Constructor
     *
     * @param Composte
     */
     constructor(contact)
     {
         {
             this.id = contact.id || '';
             this.fertiliserName = contact.fertiliserName || '';
             this.quantity = contact.quantity || '';
             this.dungo = contact.dungo || null;
             this.azote = contact.azote || '';
             this.postassuim = contact.postassuim || '';
             this.phosphore = contact.phosphore || '';
           
         }
     }

}