import { Summary } from "app/common/summary";
import { Details } from "app/common/details";
import { Placeholder } from "app/common/placeholder";
import { OppLandscape } from "app/common/opp-landscape";
import { OppCaptureActivities } from "app/common/opp-capture-activities";


export class OppDetail {
  id: number;
  summary: Summary;
  details: Details;
  landscape: OppLandscape;
  captureActivities: OppCaptureActivities;
  bidOrNoBid: Placeholder;
}