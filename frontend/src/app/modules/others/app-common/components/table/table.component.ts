import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html'
})
export class TableComponent implements OnInit, OnChanges {

  @Input()
  public columns: string[];
  
  @Input()
  public extraClass: string;
  
  @Input()
  public thExtraClass: string[];

  @Input()
  public footer: boolean;

  constructor() {
    this.columns = new Array<string>(0);
    this.thExtraClass = new Array<string>(0);
    this.extraClass = '';
    this.footer = true;
  }

  //Angular methods
  ngOnInit(): void {
    this.checkRequiredFields();
  }

  ngOnChanges(): void {
    this.checkRequiredFields();
  }

  //Private methods
  private checkRequiredFields(): void {
    if(this.columns.length <= 0)
      throw new Error("Attribute 'columns' is required.");
  }
}