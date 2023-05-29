import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GameInfoResponse, GamesService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss']
})
export class GamesListComponent implements OnInit, OnDestroy {
  games: GameInfoResponse[] = [];

  private unsubscribe$ = new Subject<void>();

  constructor(
    private gamesService: GamesService
  ) { }

  ngOnInit(): void {
    this.gamesService
      .getGames(true, null, undefined, undefined)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(games => this.games = games);
  }
  
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
