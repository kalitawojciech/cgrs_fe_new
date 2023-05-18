import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LoggedInUserResponse } from '../../services/api.service';
import { Role } from '../../constants';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentUser: LoggedInUserResponse | null;
  roles = Role;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    })
  }

  logOut(): void {
    this.authService.logout();
  }

}
