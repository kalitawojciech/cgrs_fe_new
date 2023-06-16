import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GameCommentResponse, GamesCommentsService } from 'src/app/core/services/api.service';
import { AddEditGameCommentModalComponent } from '../../add-edit-game-comment-modal/add-edit-game-comment-modal.component';
import { ModalAction } from 'src/app/core/constants';
import { MatDialog } from '@angular/material/dialog'

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss']
})
export class CommentCardComponent implements OnInit {
  @Input() comment: GameCommentResponse;
  @Input() isCommentCreator: boolean = false;

  @Output() refresh: EventEmitter<string> = new EventEmitter<string>();

  constructor(private commentsService: GamesCommentsService, public dialog: MatDialog,) { }

  ngOnInit(): void {
  }

  onDelete(): void {
    this.commentsService.deleteGamesCommentsId(this.comment.id).subscribe(() => {
      this.refresh.emit(this.comment.id);
    })
  }

  onEdit(): void {
    const dialogRef = this.dialog.open(AddEditGameCommentModalComponent, {
      data : {
        gameComment: this.comment,
        gameId: this.comment.gameId,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === ModalAction.Submited) {
        this.refresh.emit(this.comment.id);
      }
    })
  }
}
