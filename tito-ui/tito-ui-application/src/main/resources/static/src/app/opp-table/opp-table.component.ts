import { Component, ViewChild } from '@angular/core';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { Opp } from '../opp';
import { OppTableFormattedObject } from './opp-table-formatted-object';
import { OppService } from '../opp-service/opp.service';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";
import { AddOppModalComponent } from "app/add-opp-modal/add-opp-modal.component";

@Component({
  selector: 'opp-table',
  templateUrl: './opp-table.component.html',
  styleUrls: ['./opp-table.component.css'],
  providers: [OppService],
})
export class OppTableComponent {
  dataRetrieved: boolean = false;
  source: LocalDataSource;
  router: Router;
  data: OppTableFormattedObject[];

  constructor(private oppService: OppService, private modalService: NgbModal, 
    router: Router) {
    this.source = new LocalDataSource(this.data);
    this.router = router;
  }

  //begin animation stuff
  @ViewChild('message') private loadingMsg: any;
  ngAfterViewInit(): void {
    this.animateText(this.loadingMsg.nativeElement);
  }
  private animateText(el: HTMLElement): void {
    const MAXTICKS = 3;
    var ticks = 0;
    var originalTxt = el.innerHTML;
    el.innerHTML = '';
    setTimeout(() => {
      el.innerHTML = originalTxt;
      var id = setInterval(addTicks, 70);
      var self = this;
      function addTicks() {
        if (!self.dataRetrieved) {
          if (ticks < MAXTICKS) {
            el.innerHTML = el.innerHTML + '.';
            ticks++;
          }
          else {
            el.innerHTML = originalTxt;
            ticks = 0;
          }
        }
        else {
          clearInterval(id);
        }
      }
    }, 500);
  }
  //end animation stuff

  arrayToOppTableFormat(opportunities: Opp[]): OppTableFormattedObject[] {
    var opps = new Array();
    for (var i = 0, len = opportunities.length; i < len; i++) {
      opps.push(this.toOppTableFormat(opportunities[i]));
    }
    return opps;
  }

  private toOppTableFormat(opportunity: Opp): OppTableFormattedObject {
    var opp = new OppTableFormattedObject();
    opp.id = opportunity.id || -1; //if -1, id was null
    opp.account = opportunity.accountName || '';
    opp.name = opportunity.name || '';
    if (!opportunity.managerFirstName || !opportunity.managerLastName) {
      opp.owner = '';
    }
    else {
      opp.owner = opportunity.managerFirstName + ' '
        + opportunity.managerLastName;
    }
    opp.stage = opportunity.stage || '';
    return opp;
  }

  ngOnInit(): void {
    this.dataRetrieved = false;
    this.oppService.get()
      .then(data => {
        this.data = this.arrayToOppTableFormat(data);
        this.source.load(this.data)
          .then(() => this.dataRetrieved = true)
      });
  }

  removeEmpty(array: Array<string>): Array<string> {
    for (var i = array.length - 1; i >= 0; i--) {
      if (array[i] == '') array.splice(i, 1);
    }
    return array;
  }

  onUserRowSelect(event): void {
    this.router.navigate(['opps/' + event.data.id]);
  }

  private narrowSearchRecursive(i: number, info: any, lenq: number): void {
    var filters = [];
    if (i < lenq) {
      for (let ii = 0, lenf = info.fields.length; ii < lenf; ii++) {
        filters.push({
          field: info.fields[ii],
          search: info.queries[i]
        });
      }
      i++;
      this.source.setFilter(filters, false);
      this.source.getElements()
        .then(data => {
          this.source.load(data)
            .then(() => this.narrowSearchRecursive(i, info, lenq));
        });
    }
  }

  onSearch(query: string = ''): void {
    query = query.trim();
    this.source.load(this.data).then(() => {
      if (query === '') {
        this.source.setFilter([]);
      }
      else {
        let info: any = {};
        let rawStrs = query.split(' ');
        info.fields = ['account', 'name', 'owner', 'stage'];
        info.queries = this.removeEmpty(rawStrs);
        this.narrowSearchRecursive(0, info, info.queries.length);
      }
    });
  }

  onAddClick() {
    let options: NgbModalOptions = {
      size: 'lg'
    };
    
    this.modalService.open(AddOppModalComponent, options)
      .result.then((result) => {
    }, (reason) => {
    });
  }

  title = 'opp-table';
  settings = {
    attr:{
      class: 'table table-hover'
    },
    columns: {
      account: {
        title: 'Account',
        filter: false
      },
      name: {
        title: 'Name',
        filter: false
      },
      owner: {
        title: 'Owner',
        filter: false
      },
      stage: {
        title: 'Stage',
        filter: false
      }
    },
    actions: false
  };
}
