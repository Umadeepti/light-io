import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Injectable, Inject } from  '@angular/core';
 
import { OppPursue } from '../common/opp-pursue';
import { Opp } from '../opp';
import { OppService } from "../opp-service/opp.service";
import { OppDetail } from "app/common/opp-detail";

@Component({
  selector: 'PursueModalComponent',
  templateUrl: './pursue-modal.component.html',
  providers: [OppService]
})
export class PursueModalComponent {
  @Input() name;
  @Input() opportunity:OppDetail;
  @Input() pursue:OppPursue;
  oppPursue: OppPursue;
  constructor(private oppService: OppService, 
  								public activeModal: NgbActiveModal) {}
  ngOnInit() {
    if (!this.oppPursue) {
      if(this.oppPursue===undefined || this.oppPursue===null){
      this.oppPursue = new OppPursue();
    }
    this.oppPursue.id=this.opportunity.id;
    if(this.pursue!==undefined){
      this.oppPursue=this.pursue;
      }
    }

  }

  onPursueClick(opp:OppPursue) {
    this.oppPursue.pursue=true;
  	this.oppService.create(opp);
  	this.activeModal.close(opp);
  }
  onPursuePass(opp:OppPursue) {
    this.oppPursue.pursue=false;
    this.oppService.create(opp);
    this.activeModal.dismiss();
  }
  onPursueCancel() {
    this.activeModal.dismiss();
  }
 
  allRadiosSelected() {
    if (this.oppPursue.priceCompetitive !== undefined &&
      this.oppPursue.pastPerformance !== undefined && 
      this.oppPursue.bpBudgetAmount !== undefined && 
      this.oppPursue.alignSolutions !== undefined) {
      return true;
    }
    return false;
  }
}