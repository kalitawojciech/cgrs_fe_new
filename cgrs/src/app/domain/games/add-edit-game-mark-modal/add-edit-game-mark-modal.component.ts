import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { first } from 'rxjs';
import { CrateGameMarkRequest, GamesMarksService, UpdateGameMarkRequest } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-add-edit-game-mark-modal',
  templateUrl: './add-edit-game-mark-modal.component.html',
  styleUrls: ['./add-edit-game-mark-modal.component.scss']
})
export class AddEditGameMarkModalComponent implements OnInit {
  @Input() gameMarkId: string | null;
  @Input() gameId: string;

  gameMarkForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private gamesMarksService: GamesMarksService
  ) { }

  ngOnInit(): void {
    this.gameMarkForm = this.formBuilder.group({
      score: new FormControl(''),
    });

    if (this.gameMarkId !== null) {
      //this.gamesMarksService getById - to do backend endpoint
    }
  }

  onSubmit() {
    if (this.gameMarkForm.invalid) {
      return;
    }

    if (this.gameMarkId !== null) {
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
      id: this.gameMarkId,
      averageScore: this.gameMarkForm.get('score').value,
      gameId: this.gameId
    }

    this.gamesMarksService.putGamesMarks(query)
      .pipe(first())
      .subscribe();
  }

  onCancel() {

  }

  get gameMarkFormControl() {
    return this.gameMarkForm.controls;
  }
}
