import { FuseUtils } from '@fuse/utils';
import { threadId } from 'worker_threads';

export class User {
    id: number;
    firstname: string;
    lastname: string;
    photo: string;
    company: string;
    jobTitle: string;
    email: string;
    phoneNumber: string;
    address: any;
    gender: string;
    birthday: string;
    roles: any;
    password;

    /**
     * Constructor
     *
     * @param contact
     */
    constructor(contact) {
        {
            this.id = contact.id || FuseUtils.generateID();
            this.firstname = contact.firstname || '';
            this.lastname = contact.lastname || '';
            this.gender = contact.gender || '';
            this.photo = contact.photo || 'assets/images/avatars/profile.jpg';
            this.company = contact.company || '';
            this.jobTitle = contact.jobTitle || '';
            this.email = contact.email || '';
            this.phoneNumber = contact.phoneNumber || '';
            this.address = contact.address || null;
            this.roles = contact.roles || null;
            this.birthday = contact.birthday || '';
        }
    }
}