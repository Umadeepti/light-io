import { Component, OnInit, Input, EventEmitter, Output, ElementRef  } from '@angular/core';

@Component({
  selector: 'app-dom-checkbox',
  templateUrl: './dom-checkbox.component.html',
  styleUrls: ['./dom-checkbox.component.css']
})
export class DomCheckboxComponent implements OnInit {
  @Input() isChecked:boolean;
  @Input() isDisabled:boolean;
  @Output() isCheckedChange: EventEmitter<boolean>;

  constructor(private elementRef: ElementRef) { 
    this.isCheckedChange = new EventEmitter();
  }

  ngOnInit(): void {
  }

  checkBoxClicked(event): void {
   /* if(!this.elementRef.nativeElement.getAttribute('ng-reflect-is-checked')){ //if isChecked is not being evaluated from caller
     
    }*/
     this.isChecked = !this.isChecked;
    this.isCheckedChange.emit(this.isChecked);
  }
}
