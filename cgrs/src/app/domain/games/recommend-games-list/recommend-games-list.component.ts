import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GameInfoResponse, GamesService } from 'src/app/core/services/api.service';
import { SpinnerService } from 'src/app/core/services/spinner.service';

@Component({
  selector: 'app-recommend-games-list',
  templateUrl: './recommend-games-list.component.html',
  styleUrls: ['./recommend-games-list.component.scss']
})
export class RecommendGamesListComponent implements OnInit, OnDestroy {
  games: GameInfoResponse[] = [];
  totalDataCount: number = 0;
  pageSize: number = 4;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private gamesService: GamesService,
    private spinnerService: SpinnerService,
  ) { }

  ngOnInit(): void {
    this.getGames();
  }
    
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private getGames(): void {
    this.spinnerService.showSpinner();
    this.gamesService
      .getGamesRecommended()
      .subscribe(data => {
        this.games = data;
        this.totalDataCount = data.length;
        this.spinnerService.hideSpinner();
      });
  }
}
