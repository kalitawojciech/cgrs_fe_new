import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { CategoriesService, CategoryInfoResponse } from 'src/app/core/services/api.service';
import { CreateGameRequest, GamesService, UpdateGameRequest } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-add-edit-game',
  templateUrl: './add-edit-game.component.html',
  styleUrls: ['./add-edit-game.component.scss']
})
export class AddEditGameComponent implements OnInit {
  gameForm: FormGroup;
  isEditMode: boolean;
  id: string;
  loading = false;
  submitted = false;

  categories: CategoryInfoResponse[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private gamesService: GamesService,
    private categoriesService: CategoriesService,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isEditMode = !!this.id;

    this.gameForm = this.formBuilder.group({
      name: new FormControl(''),
      description: new FormControl(''),
      category: new FormControl(null),
    })

    this.categoriesService.getCategories().subscribe(x => this.categories = x);

    
    if (this.isEditMode) {
      this.gamesService.getGamesId(this.id)
        .pipe(first())
        .subscribe(x => this.gameForm.patchValue(x));
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.gameForm.invalid) {
      return;
    }

    if (this.isEditMode) {
      this.editGame();
    } else {
      this.createGame();
    }
  }

  private createGame() {
    const query: CreateGameRequest = {
      name: this.gameForm.get('name').value,
      description: this.gameForm.get('description').value
    }

    // this.categoriesService.postCategories(query)
    //   .pipe(first())
    //   .subscribe({

    // });
  }

  private editGame() {
    const query: UpdateGameRequest = {
      id: this.id,
      name: this.gameForm.get('name').value,
      description: this.gameForm.get('description').value
    }

    // this.categoriesService.putCategories(query)
    //   .pipe(first())
    //   .subscribe({

    // });
  }

  get gameFormControl() {
    return this.gameForm.controls;
  }

}
