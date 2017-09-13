import { Component, OnInit, Input, Injectable, Inject } from '@angular/core';
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OppDetail } from '../common/opp-detail';

@Component({
  selector: 'app-notes-modal',
  templateUrl: './notes-modal.component.html',
  styleUrls: ['./notes-modal.component.css']
})

export class NotesModalComponent{

	@Input() opportunity: OppDetail;
	@Input() item:any;
	@Input() notesField:string;
	form:FormGroup;

	constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder){}
  	
  	ngOnInit(){
  		this.form = this.buildForm();
  	}

  	buildForm(){
  		if(!this.notesField){
  			this.notesField = 'note';
  		}
  		let form = {
  		};
  		form[this.notesField] = null;
  		return this.formBuilder.group(Object.assign(form, this.item)); //extend blank form with oportunity fields
  	}

  	submit() {
	    if(!this.form.valid){
	      return;
	    }
	    Object.assign(this.item, this.form.value);
    	this.activeModal.close(this.form.value); //return the updated item
  	}

  	cancel() {
    	this.activeModal.dismiss();
  	}
}