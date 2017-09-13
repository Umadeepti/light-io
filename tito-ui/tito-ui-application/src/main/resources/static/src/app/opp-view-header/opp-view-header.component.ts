import { Component, OnInit, Input } from '@angular/core';
import { OppDetail } from "app/common/opp-detail";
import { NgbModalRef, NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute } from "@angular/router";
import { OppService } from "app/opp-service/opp.service";
import { PursueModalComponent } from "app/pursue-modal/pursue-modal.component";
import { OppStage } from "app/common/opp-stage";

@Component({
  selector: 'opp-view-header',
  templateUrl: './opp-view-header.component.html',
  styleUrls: ['./opp-view-header.component.css']
})
export class OppViewHeaderComponent implements OnInit {
  captureActivities: boolean;
  @Input() opp: OppDetail;
  modalRef: NgbModalRef;
  
  constructor(public oppService: OppService,     
    public modalService: NgbModal,
    public route: ActivatedRoute) {}

  ngOnInit() {
    console.log(this.opp);
  }

  showPursueModal() {      
    sessionStorage.setItem("Opportunity", JSON.stringify(this.opp));
    this.modalRef = this.modalService.open(PursueModalComponent);
    this.modalRef.result.then((result) => {
      this.captureActivities = true
    }, (reason) => {
      this.captureActivities = false;
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
}
