import { Component, Input, OnInit } from '@angular/core';
import { Role } from 'src/app/core/constants';
import { GameCommentResponse, LoggedInUserResponse } from 'src/app/core/services/api.service';
import { AddEditGameCommentModalComponent } from '../add-edit-game-comment-modal/add-edit-game-comment-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-game-comments-panel',
  templateUrl: './game-comments-panel.component.html',
  styleUrls: ['./game-comments-panel.component.scss']
})
export class GameCommentsPanelComponent implements OnInit {
  @Input() gameId: string;
  @Input() gameComments: GameCommentResponse[] | null;
  @Input() currentUser: LoggedInUserResponse | null;
  roles = Role;

  constructor(public dialog: MatDialog,) { }

  ngOnInit(): void {
  }

  addComment(): void {
    this.openGameCommentModal(null);
  }

  private openGameCommentModal(gameComment: GameCommentResponse | null): void {
    const dialogRef = this.dialog.open(AddEditGameCommentModalComponent, {
      data: {
        gameComment: gameComment,
        gameId: this.gameId,
      }
    });
  }
}
