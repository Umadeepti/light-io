import { Solution } from "app/common/solution";
import { OppSolution } from "app/common/opp-solution";
import { OppNote } from "app/common/opp-note";

export class Details {
  description: string;
  contractValueTotal: number;
  contractValueExpected: number;
  annualValue: number;
  evenDistribution: boolean;
  note: OppNote;
  projectStartDate: number;
  projectEndDate: number;
  addedOppsolutions: OppSolution[]; 
  existingOppSolutions: OppSolution[];
  removedOppSolutions: OppSolution[];
  solutions: Solution[];
}
  