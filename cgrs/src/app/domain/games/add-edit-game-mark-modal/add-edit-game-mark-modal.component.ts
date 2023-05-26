import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { first } from 'rxjs';
import { CrateGameMarkRequest, GamesMarkResponse, GamesMarksService, UpdateGameMarkRequest } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-add-edit-game-mark-modal',
  templateUrl: './add-edit-game-mark-modal.component.html',
  styleUrls: ['./add-edit-game-mark-modal.component.scss']
})
export class AddEditGameMarkModalComponent implements OnInit {
  isEditMode: boolean = false;
  gameMarkForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddEditGameMarkModalComponent>,
    @Inject(MAT_DIALOG_DATA) public gameMark: GamesMarkResponse,
    @Inject(MAT_DIALOG_DATA) public gameId: string,
    private formBuilder: FormBuilder,
    private gamesMarksService: GamesMarksService
  ) { }

  ngOnInit(): void {
    this.gameMarkForm = this.formBuilder.group({
      score: new FormControl(''),
    });

    if (this.gameMark != null) {
      this.isEditMode = true;
      this.gameMarkForm.patchValue({ score: this.gameMark.averageScore });
    }
  }

  onSubmit() {
    if (this.gameMarkForm.invalid) {
      return;
    }

    if (this.isEditMode) {
      this.updateGameMark();
    }

    this.addNewGameMark();
  }

  private addNewGameMark() {
    const query: CrateGameMarkRequest = {
      averageScore: this.gameMarkForm.get('score').value,
      gameId: this.gameId
    }

    this.gamesMarksService.postGamesMarks(query)
      .pipe(first())
      .subscribe();
  }

  private updateGameMark() {
    const query: UpdateGameMarkRequest = {
      id: this.gameMark.id,
      averageScore: this.gameMarkForm.get('score').value,
      gameId: this.gameId
    }

    this.gamesMarksService.putGamesMarks(query)
      .pipe(first())
      .subscribe();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  get gameMarkFormControl() {
    return this.gameMarkForm.controls;
  }
}
