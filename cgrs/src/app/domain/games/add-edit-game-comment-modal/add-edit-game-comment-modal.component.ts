import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs';
import { CreateGameCommentRequest, GameCommentResponse, GamesCommentsService, UpdateGameCommentRequest } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-add-edit-game-comment-modal',
  templateUrl: './add-edit-game-comment-modal.component.html',
  styleUrls: ['./add-edit-game-comment-modal.component.scss']
})
export class AddEditGameCommentModalComponent implements OnInit {
  isEditMode: boolean = false;
  gameCommentForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddEditGameCommentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GameCommentModalData,
    private formBuilder: FormBuilder,
    private gamesCommentsService: GamesCommentsService
  ) { }

  ngOnInit(): void {
    this.gameCommentForm = this.formBuilder.group({
      message: new FormControl(''),
    });

    if (this.data.gameComment != null) {
      this.isEditMode = true;
      this.gameCommentForm.patchValue({ score: this.data.gameComment.message });
    }
  }

  onSubmit() {
    if (this.gameCommentForm.invalid) {
      return;
    }

    if (this.isEditMode) {
      this.updateGameMark();
    }
    this.addNewGameMark();
  }

  private addNewGameMark() {
    const query: CreateGameCommentRequest = {
      message: this.gameCommentForm.get('message').value,
      gameId: this.data.gameId
    }

    this.gamesCommentsService.postGamesComments(query)
      .pipe(first())
      .subscribe(() => this.dialogRef.close());
  }

  private updateGameMark() {
    const query: UpdateGameCommentRequest = {
      id: this.data.gameComment.id,
      message: this.gameCommentForm.get('message').value,
      gameId: this.data.gameId
    }

    this.gamesCommentsService.putGamesComments(query)
      .pipe(first())
      .subscribe(() => this.dialogRef.close());
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  get gameCommentFormControl() {
    return this.gameCommentForm.controls;
  }
}

export interface GameCommentModalData {
  gameComment: GameCommentResponse;
  gameId: string;
}
