import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { Role } from 'src/app/core/constants';
import { GameInfoResponse, GamePopulatedResponse, GamesService, LoggedInUserResponse } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss']
})
export class GameDetailsComponent implements OnInit {
  gameData: GameInfoResponse;//GamePopulatedResponse;
  currentUser: LoggedInUserResponse | null;
  roles = Role;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gamesService: GamesService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.authService.currentUser
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(user => {
        this.currentUser = user;
      }
    );

    this.gamesService.getGamesId(id)//getGamesIdPopulated(id)
    .pipe(
      first(),
      takeUntil(this.unsubscribe$))
    .subscribe(x => this.gameData = x);
  }


  editGame(): void {
    this.router.navigate(['game/edit', this.gameData.id]);
  }
}
