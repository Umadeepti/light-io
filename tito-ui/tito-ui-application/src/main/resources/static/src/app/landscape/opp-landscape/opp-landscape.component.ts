import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { OppDetail } from "app/common/opp-detail";

@Component({
  selector: 'app-opp-landscape',
  templateUrl: './opp-landscape.component.html',
  styleUrls: ['./opp-landscape.component.css']
})
export class OppLandscapeComponent {
  @Input() opp: OppDetail;
  
  constructor() {  }

}
