import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { first, takeUntil, tap } from 'rxjs/operators';
import { Role } from 'src/app/core/constants';
import { GameMarkResponse, GamePopulatedResponse, GamesMarksService, GamesService, LoggedInUserResponse } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { AddEditGameMarkModalComponent } from '../add-edit-game-mark-modal/add-edit-game-mark-modal.component';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss']
})
export class GameDetailsComponent implements OnInit {
  gameData: GamePopulatedResponse;
  currentUser: LoggedInUserResponse | null;
  gameMark: GameMarkResponse | null;
  roles = Role;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gamesService: GamesService,
    private gamesMarksService: GamesMarksService,
    private authService: AuthService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.authService.currentUser
      .pipe(
        tap(user => {
          if (user !== null) {
            this.getGameMark(id);
          }
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(user => {
        this.currentUser = user;
      }
    );

    this.gamesService.getGamesIdPopulated(id)
    .pipe(
      first(),
      takeUntil(this.unsubscribe$))
    .subscribe(x => this.gameData = x);
  }

  getGameMark(gameId: string) {
    this.gamesMarksService.getGamesMarksGameId(gameId)
      .pipe(
        first(),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(result => this.gameMark = result);
  }

  editGame(): void {
    this.router.navigate(['game/edit', this.gameData.id]);
  }

  openGameMarkModal(): void {
    const dialogRef = this.dialog.open(AddEditGameMarkModalComponent, {
      data : {
        gameMark: null,
        gameId: this.gameData.id,
      }
    });
  }
}
