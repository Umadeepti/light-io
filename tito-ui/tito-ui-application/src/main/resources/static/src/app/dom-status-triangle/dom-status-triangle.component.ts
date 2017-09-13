import { Component, OnInit, Input } from '@angular/core';
import { OppDetail } from "app/common/opp-detail";

@Component({
  selector: 'dom-status-triangle',
  templateUrl: './dom-status-triangle.component.html',
  styleUrls: ['./dom-status-triangle.component.css']
})
export class DomStatusTriangleComponent implements OnInit {
  @Input() name: string;
  @Input() isHighlighted: boolean;

  constructor() { }

  ngOnInit() {}
}
