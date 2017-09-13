import { Firm } from "app/common/firm";
import { OppPartner } from "app/common/opp-partner";
import { OppCompetitor } from "app/common/opp-competitor";
import { OppIncumbent } from "app/common/opp-incumbent";

export class OppLandscape {
  firms: Firm[]; 
  partners: OppPartner[]; 
  primingPartner: Firm;
  competitors: OppCompetitor[];
  existingIncumbents: OppIncumbent[];
  removedIncumbents: OppIncumbent[];
  addedIncumbents: OppIncumbent[];
}
  