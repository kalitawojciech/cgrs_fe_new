import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, first, map, startWith, takeUntil } from 'rxjs';
import { CategoriesService, CategoryInfoResponse, TagInfoResponse, TagsService } from 'src/app/core/services/api.service';
import { CreateGameRequest, GamesService, UpdateGameRequest } from 'src/app/core/services/api.service';
import { inputWhiteSpaceValidator } from 'src/app/core/validators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { SpinnerService } from 'src/app/core/services/spinner.service';

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
  selectedTags: TagInfoResponse[] = [];
  filteredTags: Observable<TagInfoResponse[]>;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private gamesService: GamesService,
    private categoriesService: CategoriesService,
    private tagsService: TagsService,
    private location: Location,
    private spinnerService: SpinnerService,
  ) { 
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tagName: string | null) => this._filter(tagName))
    );
  }

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
      this.spinnerService.showSpinner();
      this.gamesService.getGamesId(this.id)
        .pipe(
          first(),
          takeUntil(this.unsubscribe$))
        .subscribe(x => {
          this.gameForm.patchValue(x);
          this.selectedTags = x.gameTags;
          this.spinnerService.hideSpinner();
        });
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
    var tagsIds = this.selectedTags.map(tag => tag.id);

    const query: CreateGameRequest = {
      name: this.gameForm.get('name').value,
      description: this.gameForm.get('description').value,
      categoryId: this.gameForm.get('categoryId').value,
      isAdultOnly: this.gameForm.get('isAdultOnly').value,
      tagsIds: tagsIds,
    }

    this.gamesService.postGames(query)
      .pipe(first())
      .subscribe(() => {
        this.router.navigate(['']);
      });
  }

  private editGame() {
    var tagsIds = this.selectedTags.map(tag => tag.id);

    const query: UpdateGameRequest = {
      id: this.id,
      name: this.gameForm.get('name').value,
      description: this.gameForm.get('description').value,
      categoryId: this.gameForm.get('categoryId').value,
      isAdultOnly: this.gameForm.get('isAdultOnly').value,
      tagsIds: tagsIds,
    }

    this.gamesService.putGames(query)
      .pipe(first())
      .subscribe(() => {
        this.router.navigate(['']);
      });
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
    if (event.option.value) {
      this.selectedTags.push(event.option.value);
      this.tagInput.nativeElement.value = '';
      this.tagCtrl.setValue(null);
    }
  }

  removeTag(tag): void {
    const index = this.selectedTags.indexOf(tag);

    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    }
  }

  private _filter(tagName: string | TagInfoResponse | null): TagInfoResponse[] {
    let unassignedTags = this.tags.filter(tag => !this.selectedTags.some(x => x.id === tag.id)).slice();
    
    if (tagName !== null && tagName instanceof String && tagName.trim() !== '') {
      const filterValue = tagName.toLowerCase();
      unassignedTags = unassignedTags.filter(tag => tag.name.toLowerCase().includes(filterValue));
    }

    return unassignedTags;
  }
}
