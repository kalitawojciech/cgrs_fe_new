import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameInfoResponse } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent implements OnInit {
  @Input() game: GameInfoResponse;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onCardClick() {
    this.router.navigate(['game', this.game.id]);
  }

  getScoreColor(): string {
    if (!this.game || !this.game?.averageScore) {
      return;
    }

    if (this.game?.averageScore > 84) {
      return '#005C27'
    } else if (this.game?.averageScore > 69) {
      return '#59A173'
    } else if (this.game?.averageScore > 49) {
      return '#FFE188'
    } else if (this.game?.averageScore > 25) {
      return '#FEBE70'
    } 

    return '#790002'
  }
}
