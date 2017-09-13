import { Component, ComponentRef, Input, OnInit, ViewChild, Inject, Output, EventEmitter } from '@angular/core';
import { CaptureActivity } from './capture-activity';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { OppGetService } from "../opp-data/opp-get.service";
import { ActivatedRoute } from "@angular/router";
import { Activity } from "app/common/activity";
import { OppDetail } from "app/common/opp-detail";

@Component({
  selector: 'app-opp-capture-activities',
  templateUrl: './opp-capture-activities.component.html',
  styleUrls: ['./opp-capture-activities.component.css']
})
export class OppCaptureActivitiesComponent implements OnInit {

  @Input() opp: any;
  @Output() onOppChange: EventEmitter<OppDetail>;
  
  activityId :number;
  closeResult: string;
  modalRef: NgbModalRef;
  
  constructor(private modalService: NgbModal, 
    @Inject(OppGetService) public oppGetService: OppGetService,
              public route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  openModal(content): void {
     this.modalRef =this.modalService.open(content);
     this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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
  loadData() {
    this.route.params.subscribe(params => {
      this.opp.id = params['id'];
      
      this.oppGetService.getById(this.opp.id).then(data => {
        this.opp = data;
      });
    });
  }
  addCapture(): void {    
    this.opp.captureActivities.activities.push(new Activity(null, ' ', null, ''));
    this.onOppChange.emit(this.opp);
    console.log(this.opp+"here");
  }

  delCapture(event,activityId):void {
    this.oppGetService.deleteOppCapture(this.opp.id,activityId)//should change
      .then(() => {
        this.loadData();
      });
      console.log(this.opp.captureActivities+"heree2");
  }
  
  onCapNoteSave(opp){
    this.closeResult = `Closed with: `; 
    this.modalRef.dismiss();
  }
}
