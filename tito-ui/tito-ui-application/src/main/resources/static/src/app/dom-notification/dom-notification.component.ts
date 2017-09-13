import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dom-notification',
  templateUrl: './dom-notification.component.html',
  styleUrls: ['./dom-notification.component.css'],
})
export class DomNotificationComponent {
  @Input() timeout: number;
  txt: string;
  type: string;
  display(type, message){
    this.type = type;
    this.msgTimeout(message);
  }
  private msgTimeout(message){
    this.txt = message;
    setTimeout(()=>{
      this.txt = null;
    }, this.timeout);
  }
}
