import { Component, Input, OnInit } from '@angular/core';
import { GameCommentResponse } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss']
})
export class CommentCardComponent implements OnInit {
  @Input() comment: GameCommentResponse;

  constructor() { }

  ngOnInit(): void {
  }

}
