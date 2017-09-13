import { Component, Input } from '@angular/core';
import { CompetitorService } from "../../services/competitor.service";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Firm } from "app/common/firm";
import { Competitor } from "app/common/competitor";
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
  selector: 'app-opp-competitors',
  templateUrl: './opp-competitors.component.html',
  styleUrls: ['./opp-competitors.component.css'],
  providers: [CompetitorService]
})
export class OppCompetitorsComponent {
  @Input() opp: any;
  private searchModel: any;
  modalRef: NgbModalRef;

  constructor(private competitorService: CompetitorService, public route: ActivatedRoute, private modalService: NgbModal) {}

  ngOnInit() {
  }

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .map(term => term === '' ? [] : this.opp.landscape.firms
        .filter(v => {
          return !this.opp.landscape.competitors.filter(function(item){return item.firm.id === v.id;}).length;
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

  competitorSelected($event): void {
    this.searchModel = $event.item.firm.name;  
  } 
  
  addCompetitor(): void {
    if(this.searchModel && this.searchModel.id){
      let item = {firm: Object.assign({}, this.searchModel)};
      this.competitorService.create(this.opp.id, item.firm.id)
      .then((response) => {
        let index = response.landscape.competitors.findFirm(item.firm);
        if(index !== -1){
          Object.assign(item, response.landscape.competitors[index]); //extend object
        }
      });
      this.searchModel = null;
      this.opp.landscape.competitors.push(item);
    }
  }

  removeCompetitor(competitor: Competitor):void {
    this.competitorService.delete(this.opp.id, competitor.id)
    .then(
      (response) => {
       //do nothing on success
      },
      (err) => {
        this.opp.landscape.competitors.push(competitor);
      }
    );
    let index = this.opp.landscape.competitors.indexOf(competitor);
    if(index !== -1){
      this.opp.landscape.competitors.splice(index, 1);
    }
  }

  isIncumbent(firm: Firm): boolean {
    if(this.opp.landscape.addedIncumbents.findFirm(firm) !== -1 || (this.opp.landscape.existingIncumbents.findFirm(firm) !== -1 && this.opp.landscape.removedIncumbents.findFirm(firm) === -1)){
      return true;
    }
    return false;
  }

  isIncumbentClicked(competitor: Competitor): void {
    let index:number;
    if(this.opp.landscape.existingIncumbents.findFirm(competitor.firm) !== -1){
      index = this.opp.landscape.removedIncumbents.findFirm(competitor.firm);
      if(index !== -1){
        return this.opp.landscape.removedIncumbents.splice(index, 1);
      }
      return this.opp.landscape.removedIncumbents.push(competitor);
    }
    else{
      index = this.opp.landscape.addedIncumbents.findFirm(competitor.firm);
      if(index !== -1){
        return this.opp.landscape.addedIncumbents.splice(index, 1);
      }
      return this.opp.landscape.addedIncumbents.push(competitor);
    }
  }

  addNote(competitor){
    this.modalRef = this.modalService.open(NotesModalComponent);
    this.modalRef.componentInstance.opportunity = this.opp; //pass opp to modal Input
    this.modalRef.componentInstance.item = competitor; //pass opp to modal Input
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
