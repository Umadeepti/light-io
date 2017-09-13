import { OppService } from '../opp-service/opp.service';
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Opp } from '../opp';
import { OppDetail } from '../common/opp-detail';
import { OppOperations } from '../common/opp-operations'; 
import { Http } from '@angular/http';
import { DomNotificationComponent } from '../dom-notification/dom-notification.component';
import { MilliDateFormatter } from "../common/milli-date-formatter";
import { NgbModal, ModalDismissReasons, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { PursueModalComponent } from "../pursue-modal/pursue-modal.component";
import { BidModalComponent } from "../bid-modal/bid-modal.component";
import { OppPursue } from "app/common/opp-pursue";

@Component({
  selector: 'app-opp-view',
  templateUrl: './opp-view.component.html',
  styleUrls: ['./opp-view.component.css'],
  providers: [OppService]
})

export class OppViewComponent implements OnInit {
  @ViewChild(DomNotificationComponent) notification: DomNotificationComponent;
  @Input() opp: OppDetail;
  formattedOpp: any;
  modalRef: NgbModalRef;
  captureActivities: boolean;
  oppPursue: OppPursue;
  closeResult: string;
  
  constructor(
    public oppService: OppService,     
    private modalService: NgbModal,
    public route: ActivatedRoute) {}
  
  save(){
    let serverFormat = OppOperations.createUnformattedCopy(this.formattedOpp);
    
    this.oppService.put(serverFormat)
    .then((data)=>{
      this.notification.display("success", "Changes have been successfully saved.");
      this.setNewOpp(data);
      console.log(data);
    }, (error)=>{
      this.notification.display("danger", "Error: Changes could not be saved.");
    });
  }
  
  cancel(){
    this.oppService.getById(this.opp.id)
    .then((data)=>{
      this.setNewOpp(data);
      this.notification.display("warning", "Unsaved changes have been reverted.");
    }, (error)=>{
      this.notification.display("danger", "Error: Changes could not be reverted.");
    });
  } 
  
  setNewOpp(data) {
    this.opp = data;
    this.formattedOpp = OppOperations.retrieveFormattedData(this.opp);
  }
  
  onOppChange(opp: OppDetail) {
    this.setNewOpp(opp);
  }
  

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.oppService.getById(params['id']).then(data => {
        this.setNewOpp(data);
      });
      this.oppService.getPursueById(params['id']).then(data => {
        this.oppPursue = data;
        if(this.oppPursue!==undefined && this.oppPursue.pursue!== undefined){
        this.captureActivities=true;
      }
      }); 
    });

  }

  showPursueModal(opp) {      
    this.modalRef = this.modalService.open(PursueModalComponent);
    this.modalRef.componentInstance.opportunity=opp;
    this.modalRef.componentInstance.pursue=this.oppPursue;
    this.modalRef.result.then((result) => {
      console.log(this.modalRef.result);
      this.captureActivities = true;
    }, (reason) => {
      this.captureActivities = false;
    });  
    
  }

    showBidModal(opp) {      
      this.modalRef = this.modalService.open(BidModalComponent);
      this.modalRef.componentInstance.opportunity = opp; //pass opp to modal Input
      this.modalRef.result.then(
        res => {
          Object.assign(this.opp, res); //update opportunity
        },
        reason => {
          //dismissed
        }
      );    
    }

    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return  `with: ${reason}`;
      }
    }
  }


