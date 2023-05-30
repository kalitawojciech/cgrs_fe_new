import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Subject, takeUntil, tap } from 'rxjs';
import { GameInfoResponse, GamesService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss']
})
export class GamesListComponent implements OnInit, AfterViewInit, OnDestroy {
  games: GameInfoResponse[] = [];
  pageSize: number = 4;
  pageNumber: number = 0;
  totalDataCount: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private gamesService: GamesService
  ) { }

  ngOnInit(): void {
    this.getGames();
  }

  ngAfterViewInit(): void {
    this.paginator.page
    .pipe(
      tap((change) => {
        this.pageNumber = change.pageIndex;
        this.getGames();
      })
    )
    .subscribe();
  }
  
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private getGames(): void {
    this.gamesService
    .getGames(true, null, this.pageNumber, this.pageSize)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(data => {
      this.games = data.results;
      this.totalDataCount = data.totalDataCount;
    });
  }

}
