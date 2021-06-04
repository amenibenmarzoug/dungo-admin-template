import { FuseUtils } from '@fuse/utils';
export class Dungo
{
    id: string;
    name: string;
    status: boolean;
    qrCode: string;
    city: string;
    geolocalisation: any
   

    /**
     * Constructor
     *
     * @param contact
     */
    constructor(contact)
    {
        {
            this.id = contact.id || '';
            this.name = contact.name || '';
            this.qrCode = contact.qrCode || '';
            this.city = contact.city || '';
            this.status = contact.status || '';
            this.geolocalisation = contact.geolocalisation || null;
            
            // this.geolocalisation.lon = contact.geolocalisation.lon || '';
            //  this.geolocalisation.lat = contact.geolocalisation.lat || '';
          
        }
    }
}
