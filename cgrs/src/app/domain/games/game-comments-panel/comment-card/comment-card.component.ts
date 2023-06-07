import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GameCommentResponse, GamesCommentsService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss']
})
export class CommentCardComponent implements OnInit {
  @Input() comment: GameCommentResponse;
  @Input() canDelete: boolean = false;

  @Output() deleted: EventEmitter<string> = new EventEmitter<string>();

  constructor(private commentsService: GamesCommentsService) { }

  ngOnInit(): void {
  }

  onDelete(): void {
    this.commentsService.deleteGamesCommentsId(this.comment.id).subscribe(() => {
      this.deleted.emit(this.comment.id);
    })
  }

}
