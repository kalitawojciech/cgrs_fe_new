import { Component, Input, OnInit } from '@angular/core';
import { Role } from 'src/app/core/constants';
import { GameCommentResponse, LoggedInUserResponse } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-game-comments-panel',
  templateUrl: './game-comments-panel.component.html',
  styleUrls: ['./game-comments-panel.component.scss']
})
export class GameCommentsPanelComponent implements OnInit {
  @Input() gameId: string;
  gameComments: GameCommentResponse[] | null;
  @Input() currentUser: LoggedInUserResponse | null;
  roles = Role;

  constructor() { }

  ngOnInit(): void {
    console.log('xDDDDDD')
    if (this.gameId != null) {
      console.log('xDDD')
    }
  }

  addComment(): void {
    
  }

}
