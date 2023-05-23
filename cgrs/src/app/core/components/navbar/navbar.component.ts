import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { GameNameResponse, GamesService, LoggedInUserResponse } from '../../services/api.service';
import { Role } from '../../constants';
import { FormControl } from '@angular/forms';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentUser: LoggedInUserResponse | null;
  roles = Role;
  gameSearchControl = new FormControl('')
  gameNames: GameNameResponse[] = [];

  constructor(
    private authService: AuthService,
    private gamesService: GamesService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
    
    this.gameSearchControl.valueChanges
      .pipe(tap(name => this.getNamesFiltered(name)))
      .subscribe()
  }

  logOut(): void {
    this.authService.logout();
  }

  private getNamesFiltered(name: string) {
    if ( !name || name.length < 2) {
      return;
    }

    this.gamesService.getGamesGetNames(name).subscribe(data => this.gameNames = data)
  }

  goToGamePage($event: any) {
    this.router.navigate(['game', $event.option.value.id]);
    this.gameSearchControl.reset();
  }

}
