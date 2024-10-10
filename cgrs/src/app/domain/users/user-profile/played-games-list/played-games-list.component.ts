import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Subject, tap, takeUntil } from 'rxjs';
import { GameInfoResponse, GamesService } from 'src/app/core/services/api.service';
import { SpinnerService } from 'src/app/core/services/spinner.service';

@Component({
  selector: 'app-played-games-list',
  templateUrl: './played-games-list.component.html',
  styleUrls: ['./played-games-list.component.scss']
})
export class PlayedGamesListComponent implements OnInit, AfterViewInit, OnDestroy {
  games: GameInfoResponse[] = [];
  pageSize: number = 4;
  pageNumber: number = 0;
  totalDataCount: number;

  @Input() userId: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private gamesService: GamesService,
    private spinnerService: SpinnerService,
  ) { }

  ngOnInit(): void {
    console.log(this.userId);
    if (this.userId != undefined) {

      this.getGames();
    }


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
    this.spinnerService.showSpinner();
    this.gamesService
      .getGames(true, null, this.pageNumber, this.pageSize)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.games = data.results;
        this.totalDataCount = data.totalDataCount;
        this.spinnerService.hideSpinner();
      });
  }
}
