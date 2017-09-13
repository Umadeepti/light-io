import {Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'app-dom-datepicker',
  templateUrl: './dom-datepicker.component.html',
  styleUrls: ['./dom-datepicker.component.css']
})
export class DomDatepickerComponent {
  @Input() date: any;
  @Output() dateChange = new EventEmitter();
  change(event){
    this.date = event;
    this.dateChange.emit(event);
  }
}
