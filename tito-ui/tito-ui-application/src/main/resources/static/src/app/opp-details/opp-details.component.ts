import { Component, OnInit, Input} from '@angular/core';
import { Opp } from '../opp';
import { OppDetail } from 'app/common/opp-detail';
import { OppOperations } from 'app/common/opp-operations';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
@Component({
  selector: 'app-opp-details',
  templateUrl: './opp-details.component.html',
  styleUrls: ['./opp-details.component.css'],
  
})
export class OppDetailsComponent implements OnInit {
  @Input() opp: any;
  solutionsOptions: IMultiSelectOption[];
  tempSolutions: any[] = [];
  
  solutionSelected(e){
	  let tempSolutions = this.tempSolutions;
	  this.opp.details.selectedSolutions = this.solutionsOptions.filter(function(item){
		  return tempSolutions.indexOf(item.id) !== -1;
	  });
  }
  
  
  ngOnInit() {
    if (!this.opp) {
      this.opp = OppOperations.populateEmpty(this.opp);
    }
    this.solutionsOptions = this.opp.details.solutions;

    if (!this.opp.details.selectedSolutions) {
      this.opp.details.selectedSolutions = [];
    }
	  this.tempSolutions = this.opp.details.selectedSolutions.map(function(item){return item.id;});
  }
}
