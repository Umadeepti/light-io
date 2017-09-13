import { Component, OnInit, Input } from '@angular/core';
import { OppDetail } from "app/common/opp-detail";
import { OppStage } from "app/common/opp-stage";

@Component({
  selector: 'dom-status-bar',
  templateUrl: './dom-status-bar.component.html',
  styleUrls: ['./dom-status-bar.component.css']
})
export class DomStatusBarComponent implements OnInit {
  @Input() opp: OppDetail;
  statusBarStages: string[];

  constructor() {}

  ngOnInit() {
    // TODO: Remove and replace hard coded statusBarStage with 
    // values loaded from a property file.  
    this.statusBarStages = [
      'Identifying',
      'Qualified / Capture',
      'Proposal / Bid',
      'Closed'
    ];
  }

  isHighlighted(ndx: number): boolean {
    return this.statusBarStages.indexOf(this.opp.summary.stage) >= ndx;
  }
}
