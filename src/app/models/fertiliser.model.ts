export class Fertiliser
{
    id: string;
    name: string;
    azote: number;
    potassuim: number;
    phosphore: number;
   

    /**
     * Constructor
     *
     * @param contact
     */
    constructor(fertiliser)
    {
        {
            this.id = fertiliser.id || '';
            this.name = fertiliser.name || '';
            this.azote = fertiliser.azote || '';
            this.potassuim = fertiliser.potassuim || '';
            this.phosphore = fertiliser.phosphore || '';
           
          
        }
    }
}
