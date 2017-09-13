import { Component, OnInit, Input } from '@angular/core';
import { OppDetail } from "../common/opp-detail";
import { OppOperations } from '../common/opp-operations'; 
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { DomDatepickerComponent } from "../dom-datepicker/dom-datepicker.component";
@Component({
  selector: 'app-add-opp-modal',
  templateUrl: './add-opp-modal.component.html',
  styleUrls: ['./add-opp-modal.component.css'],
})
export class AddOppModalComponent implements OnInit {
  opp: OppDetail;

  constructor(public activeModal: NgbActiveModal) { 
    this.opp = new OppDetail();
  }

  ngOnInit() {
  }

}
