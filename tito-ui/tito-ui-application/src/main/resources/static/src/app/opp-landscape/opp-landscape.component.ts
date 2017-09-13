import { Component, OnInit, Input } from '@angular/core';
import { OppDetail } from "app/common/opp-detail";

@Component({
  selector: 'app-opp-landscape',
  templateUrl: './opp-landscape.component.html',
  styleUrls: ['./opp-landscape.component.css']
})
export class OppLandscapeComponent implements OnInit {
  @Input() opp:OppDetail;
  constructor() { }
  ngOnInit() {
    if (!this.opp) {
      this.opp = new OppDetail();
    }
  }
}
