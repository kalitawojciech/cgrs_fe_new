import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { GamesMarksService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-add-edit-game-mark-modal',
  templateUrl: './add-edit-game-mark-modal.component.html',
  styleUrls: ['./add-edit-game-mark-modal.component.scss']
})
export class AddEditGameMarkModalComponent implements OnInit {
  @Input() gameMarkId: string | null;
  @Input() gameId: string;

  categoryForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private gamesMarksService: GamesMarksService
  ) { }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      score: new FormControl(''),
    });
  }

}
