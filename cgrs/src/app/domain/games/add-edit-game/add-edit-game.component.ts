import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, first, takeUntil } from 'rxjs';
import { CategoriesService, CategoryInfoResponse, TagInfoResponse, TagsService } from 'src/app/core/services/api.service';
import { CreateGameRequest, GamesService, UpdateGameRequest } from 'src/app/core/services/api.service';
import { inputWhiteSpaceValidator } from 'src/app/core/validators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-add-edit-game',
  templateUrl: './add-edit-game.component.html',
  styleUrls: ['./add-edit-game.component.scss']
})
export class AddEditGameComponent implements OnInit, OnDestroy {
  gameForm: FormGroup;
  isEditMode: boolean;
  id: string;
  loading = false;
  submitted = false;
  tagCtrl = new FormControl('');

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;

  categories: CategoryInfoResponse[] = [];
  tags: TagInfoResponse[] = [];
  filteredTags: Observable<TagInfoResponse[]>;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  private unsubscribe$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private gamesService: GamesService,
    private categoriesService: CategoriesService,
    private tagsService: TagsService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isEditMode = !!this.id;

    this.gameForm = this.formBuilder.group({
      name: new FormControl('', [inputWhiteSpaceValidator()]),
      description: new FormControl('', [inputWhiteSpaceValidator()]),
      categoryId: new FormControl(null),
      isAdultOnly: new FormControl(false),
    })

    this.categoriesService.getCategories()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => this.categories = data);

    this.tagsService.getTags()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(tags => this.tags = tags);

    if (this.isEditMode) {
      this.gamesService.getGamesId(this.id)
        .pipe(
          first(),
          takeUntil(this.unsubscribe$))
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
      description: this.gameForm.get('description').value,
      categoryId: this.gameForm.get('categoryId').value,
      isAdultOnly: this.gameForm.get('isAdultOnly').value
    }

    this.gamesService.postGames(query)
      .pipe(first())
      .subscribe();
  }

  private editGame() {
    const query: UpdateGameRequest = {
      id: this.id,
      name: this.gameForm.get('name').value,
      description: this.gameForm.get('description').value,
      categoryId: this.gameForm.get('categoryId').value,
      isAdultOnly: this.gameForm.get('isAdultOnly').value
    }

    this.gamesService.putGames(query)
      .pipe(first())
      .subscribe();
  }

  onCancel(): void {
    this.location.back();
  }

  get gameFormControl() {
    return this.gameForm.controls;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  selectTag(event: MatAutocompleteSelectedEvent): void {
    console.log(event.option);
  }

  addTag(event: MatChipInputEvent): void {

  }

  removeTag(tag): void {

  }
}
