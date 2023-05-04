import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { GamePopulatedResponse, GamesService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss']
})
export class GameDetailsComponent implements OnInit {
  gameData: GamePopulatedResponse;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gamesService: GamesService,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.gamesService.getGamesIdPopulated(id)
    .pipe(
      first(),
      takeUntil(this.unsubscribe$))
    .subscribe(x => this.gameData = x);
  }

}
