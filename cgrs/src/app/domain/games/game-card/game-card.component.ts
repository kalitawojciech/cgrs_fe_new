import { Component, Input, OnInit } from '@angular/core';
import { GameInfoResponse } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent implements OnInit {
  @Input() game: GameInfoResponse;

  constructor() { }

  ngOnInit(): void {
  }

}
