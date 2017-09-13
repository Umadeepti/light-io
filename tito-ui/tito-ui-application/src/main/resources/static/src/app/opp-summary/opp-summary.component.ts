import { Component, OnInit, Input, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Output, Host } from '@angular/core';
import { OppDetail } from '../common/opp-detail';

import { MilliDateFormatter } from '../common/milli-date-formatter';
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { OppViewComponent } from "app/opp-view/opp-view.component";
import { DomDatepickerComponent } from "app/dom-datepicker/dom-datepicker.component";
import { OppOperations } from "app/common/opp-operations";

@Component({
  selector: 'app-opp-summary',
  templateUrl: './opp-summary.component.html',
  styleUrls: ['./opp-summary.component.css'],
})
export class OppSummaryComponent implements OnInit {
  @Input() opp: any;
  ngOnInit() {
    if(!this.opp) this.opp = OppOperations.populateEmpty(this.opp);
  }
  accountSelect(){
    this.opp.summary.client = null;
    this.opp.summary.subClient = null;
  }
  clientSelect(){
    this.opp.summary.subClient = null;
  }
  compareObjectsById(obj1: any, obj2: any){
    return (obj1?!obj2:obj2)?
            false:
            (obj1 && obj2)?
            obj1.id === obj2.id:
            obj1 === obj2; 
  }
}
