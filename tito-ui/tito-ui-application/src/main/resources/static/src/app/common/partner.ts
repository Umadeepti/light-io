import { Firm } from './firm';

export class Partner {
  constructor(public id: number, public firm: Firm, 
    public exclusive: boolean, public signedNda: boolean, 
    public signedTa: boolean, public workshare: string, 
    public prime: boolean, public description: string) {}
}
