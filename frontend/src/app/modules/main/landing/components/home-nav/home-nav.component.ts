import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-nav',
  templateUrl: './home-nav.component.html'
})
export class HomeNavComponent {

  constructor(
    public router: Router
  ) { }
}