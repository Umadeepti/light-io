import { MilliDateFormatter } from './milli-date-formatter';
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { OppDetail } from "app/common/opp-detail";
import { Summary } from "app/common/summary";
import { Person } from "app/common/person";
import { Details } from "app/common/details";
import { OppNote } from "app/common/opp-note";
import { OppTimeline } from "app/common/opp-timeline";
import { Client } from "app/common/client";
import { SubClient } from "app/common/sub-client";
import { OppLandscape } from "app/common/opp-landscape";
import { Account } from "app/common/account";
import { OppCaptureActivities } from "app/common/opp-capture-activities";
import { Activity } from "app/common/activity";

export class OppOperations {
  public static populateEmpty(opp: OppDetail): OppDetail{
    
    if (!opp) opp = new OppDetail();
    if (!opp.summary) opp.summary = new Summary();
    if (!opp.summary.account) opp.summary.account = new Account();
    if (!opp.summary.client) opp.summary.client = new Client();
    if (!opp.summary.subClient) opp.summary.subClient = new SubClient();
    if (!opp.summary.estAwardDate ) opp.summary.estAwardDate = new OppTimeline();
    if (!opp.summary.proposalDueDate ) opp.summary.proposalDueDate = new OppTimeline();
    if (!opp.summary.owner) opp.summary.owner = new Person();
    if (!opp.details) opp.details = new Details();
    if (!opp.details.note) opp.details.note = new OppNote();
    if (!opp.details.note.creator) opp.details.note.creator = new Person();
    if (!opp.details.note.note) opp.details.note.note = '';
    if (!opp.details.note.creator.id) opp.details.note.creator.id = 1; //hardcoded temporarily
    if (!opp.landscape) opp.landscape = new OppLandscape();
    if (!opp.landscape.addedIncumbents) opp.landscape.addedIncumbents = [];
    if (!opp.landscape.removedIncumbents) opp.landscape.removedIncumbents = [];
    if (!opp.captureActivities) opp.captureActivities = new OppCaptureActivities();
    if (!opp.captureActivities.activities) opp.captureActivities.activities = [];
    return opp;
  }
  public static retrieveFormattedData(opp: OppDetail): any{
    return    this.formatData
              (this.deepCopy
              (this.populateEmpty(opp)), false);
  }
  public static createUnformattedCopy(opp: any): any{
    return this.formatData(this.deepCopy(opp), true);
  }
  public static formatData(opp: any, toOppDetail: boolean): any{
    let fn =
     toOppDetail?
      (struct: any)=>MilliDateFormatter.parseDate(struct):
      (millis: any)=>MilliDateFormatter.formatDate(millis);
    opp.summary.proposalDueDate.date = fn(opp.summary.proposalDueDate.date);
    opp.summary.estAwardDate.date = fn(opp.summary.estAwardDate.date);
    opp.details.projectStartDate = fn(opp.details.projectStartDate);
    opp.details.projectEndDate = fn(opp.details.projectEndDate);
    
    // Format the dates for capture activities
    for (const activity of opp.captureActivities.activities) {
      activity.date = fn(activity.date);
    }
    return opp;
  }
  public static deepCopy(opp: OppDetail): any{
    var copy: any = {};
    this.copyRecurse(opp, copy);
    return copy;
  }
  private static copyRecurse(object: any, copy: any): void{
    Object.keys(object).forEach((key)=>{
      let child = object[key];
      if (typeof child == 'object' && child){
        if(child.constructor == Array){
          let len = child.length;
          copy[key]=new Array(len);
          for(let i = 0; i<len; i++){
            if(typeof child[i] == 'object'){
              copy[key][i]={};
              this.copyRecurse(child[i], copy[key][i]);
            }
            else 
              copy[key][i] = child[i];
          }
        }
        else{
          copy[key] = {};
          this.copyRecurse(child, copy[key]);
        }
      }
      else{
        copy[key]=child;
      }
    });
  } 
}