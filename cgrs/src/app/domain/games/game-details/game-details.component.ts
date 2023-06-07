import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { first, takeUntil, tap } from 'rxjs/operators';
import { ModalAction, Role } from 'src/app/core/constants';
import { GameMarkResponse, GamePopulatedResponse, GamesService, LoggedInUserResponse } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { AddEditGameMarkModalComponent } from '../add-edit-game-mark-modal/add-edit-game-mark-modal.component';
import { SpinnerService } from 'src/app/core/services/spinner.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss']
})
export class GameDetailsComponent implements OnInit {
  gameData: GamePopulatedResponse;
  currentUser: LoggedInUserResponse | null;
  roles = Role;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gamesService: GamesService,
    private authService: AuthService,
    public dialog: MatDialog,
    private spinnerService: SpinnerService,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.authService.currentUser
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(user => {
        this.currentUser = user;
      }
    );

    this.getGameDetails(id);
  }

  private getGameDetails(id: string): void {
    this.spinnerService.showSpinner();

    this.gamesService.getGamesIdPopulated(id)
    .pipe(
      first(),
      takeUntil(this.unsubscribe$))
    .subscribe(x => {
      this.gameData = x;
      this.spinnerService.hideSpinner();
    });
  }

  editGame(): void {
    this.router.navigate(['game/edit', this.gameData.id]);
  }

  openGameMarkModal(): void {
    const dialogRef = this.dialog.open(AddEditGameMarkModalComponent, {
      data : {
        gameMark: this.gameData.userGameMark,
        gameId: this.gameData.id,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === ModalAction.Submited) {
        this.getGameDetails(this.gameData.id);
      }
    })
  }

  refresh(): void {
    this.getGameDetails(this.gameData.id);
  }

  getScoreColor(): string {
    if (this.gameData.averageScore > 84) {
      return '#005C27'
    } else if (this.gameData.averageScore > 69) {
      return '#59A173'
    } else if (this.gameData.averageScore > 49) {
      return '#FFE188'
    } else if (this.gameData.averageScore > 25) {
      return '#FEBE70'
    } 

    return '#790002'
  }
}
