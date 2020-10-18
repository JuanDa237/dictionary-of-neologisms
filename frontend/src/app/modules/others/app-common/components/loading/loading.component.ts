import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html'
})
export class LoadingComponent {

  @Input()
  public colorClass: string;

  @Input()
  public size: string;

  constructor() {
    this.colorClass = '';
    this.size = '';
  }
}