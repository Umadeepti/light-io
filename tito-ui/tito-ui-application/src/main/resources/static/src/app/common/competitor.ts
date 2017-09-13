import { Firm } from './firm';

export class Competitor {
  constructor(public id: number, public firm: Firm, public incumbent: boolean, public note: string) {}
}
