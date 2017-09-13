import { Component, OnInit, Input, Injectable, Inject } from '@angular/core';
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OppService } from "../opp-service/opp.service";
import { OppDetail } from '../common/opp-detail';
import { OppBid } from "app/opp-view/opp-bid";

@Component({
  selector: 'BidModalComponent',
  templateUrl: './bid-modal.component.html',
  providers: [OppService]
})

export class BidModalComponent{

	@Input() opportunity: OppDetail;
	form:FormGroup;
	oppBid:OppBid;

	constructor(private oppService: OppService, public activeModal: NgbActiveModal, private formBuilder: FormBuilder){}
  	
  	ngOnInit(){
		this.oppBid= new OppBid();
		this.oppBid.id=this.opportunity.id;
  		this.form = this.buildForm();
  	}

  	buildForm(){
  		let form = {
  			crediblePrime: null,
  			priceCompetitive: null,
  			teamAssembled: null,
  			bpBudgetAmount: null,
  			notes: null
		  };
		  let opp 
		  //return this.formBuilder.group(Object.assign(form, this.opportunity)); //extend blank form with oportunity fields
		  //return form;
			return this.formBuilder.group(Object.assign(form, this.oppBid));
  	}

  	submit() {
	    if(!this.form.valid){
	      return;
	    }
	  	this.oppService.postBid(this.form.value);
	  	this.close();
  	}

  	close() {
    	this.activeModal.close(this.form.value); //return the updated opportunity
  	}

  	cancel() {
    	this.activeModal.dismiss();
  	}
}