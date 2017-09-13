import { Component, Input } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import { ActivatedRoute } from "@angular/router";
import { PartnerService } from "../../services/partner.service";
import { Partner } from "app/common/partner";
import { NgbModal, ModalDismissReasons, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { NotesModalComponent } from "../../notes-modal/notes-modal.component";

declare global{
  interface Array<T> {
     findFirm(o: T): Array<T>;
  }
}
if(!Array.prototype.findFirm){
  Array.prototype.findFirm = function(firm){
    var ids = this.map(function(competitor){return competitor.firm.id;});
    return ids.indexOf(firm.id);
  };
}

@Component({
  selector: 'app-opp-partners',
  templateUrl: './opp-partners.component.html',
  styleUrls: ['./opp-partners.component.css']
})
export class OppPartnersComponent {
  @Input() opp: any;
  private searchModel: any;
  modalRef: NgbModalRef;

  constructor(private partnerService: PartnerService, public route: ActivatedRoute, private modalService: NgbModal) {}

  ngOnInit() {  
  }
  
  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .map(term => term === '' ? [] : this.opp.landscape.firms
        .filter(v => {
          return !this.opp.landscape.partners.filter(function(item){return item.firm.id === v.id;}).length;
        })
        .filter(v => {
          let index = v.name.toLowerCase().indexOf(term.toLowerCase());
          if (index > -1) {
            var result = v.name.slice(0, 10);
            return result;
          } 
        }));
          

  formatter(x: any) {
    return x.name;
  }

  toggleWorkshare(partner){
    if(partner.workshare){
      return partner.workshare = null;
    }
    return partner.workshare = 'Yes';
  }

  worshareChecked(partner){
    if(partner.workshare){
      return true;
    }
    return false;
  }

  togglePrime(partner){
    if(this.opp.landscape.primingPartner && this.opp.landscape.primingPartner.id === partner.firm.id){
      return this.opp.landscape.primingPartner = null;
    }
    return this.opp.landscape.primingPartner = partner.firm;
  }

  primeChecked(partner){
    return this.opp.landscape.primingPartner && this.opp.landscape.primingPartner.id === partner.firm.id;
  }
  
  addPartner(): void {
    if(this.searchModel && this.searchModel.id){
      let item = {firm: Object.assign({}, this.searchModel)};
      this.partnerService.create(this.opp.id, item.firm.id)
      .then((response) => {
        let index = response.landscape.partners.findFirm(item.firm);
        if(index !== -1){
          Object.assign(item, response.landscape.partners[index]); //extend object
        }
      });
      this.searchModel = null;
      this.opp.landscape.partners.push(item);
    }
  }

  removePartner(partner: Partner):void {
    this.partnerService.delete(this.opp.id, partner.id)
    .then(
      (response) => {
       //do nothing on success
      },
      (err) => {
        this.opp.landscape.partners.push(partner);
      }
    );
    let index = this.opp.landscape.partners.indexOf(partner);
    if(index !== -1){
      this.opp.landscape.partners.splice(index, 1);
    }
  }

  addNote(partner){
    this.modalRef = this.modalService.open(NotesModalComponent);
    this.modalRef.componentInstance.notesField = 'description';
    this.modalRef.componentInstance.opportunity = this.opp; //pass opp to modal Input
    this.modalRef.componentInstance.item = partner; //pass opp to modal Input
    this.modalRef.result.then(
      res => {
        //opportunity updated
      },
      reason => {
        //dismissed
      }
    );
  }
}