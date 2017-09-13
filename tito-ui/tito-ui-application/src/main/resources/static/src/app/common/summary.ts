import { Person } from "app/common/person";
import { SubClient } from "app/common/sub-client";
import { Client } from "app/common/client";
import { OppTimeline } from "app/common/opp-timeline";
import { Account } from './account';

export class Summary {
  name: string;
  account: Account;
  accounts: Account[];
  client: Client;
  people: Person[];
  subClient: SubClient;
  owner: Person;
  stage: string;
  stages: string[];
  status: string;
  statuses: string[];
  winProbability: number;
  prime: boolean;
  awardType: string;
  awardTypes: string[];
  govWinId: string;
  govWinLink: string;
  fboLink: string;
  proposalDueDate: OppTimeline;
  estAwardDate: OppTimeline;
}