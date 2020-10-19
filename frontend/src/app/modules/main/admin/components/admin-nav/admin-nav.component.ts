import { Component, OnInit } from '@angular/core';
import { User, createEmptyUser } from '@modules/main/navigation/models';
import { UsersService } from '@modules/main/navigation/services';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html'
})
export class AdminNavComponent implements OnInit {

  public user: User;

  constructor(
    private usersService: UsersService
  ) {
    this.user = createEmptyUser();
  }

  ngOnInit(): void {
    this.getUser();
  }

  private getUser(): void {
    this.usersService.getUser().subscribe(
      resolve => {
        this.user = resolve;
      }
    );
  }
}
