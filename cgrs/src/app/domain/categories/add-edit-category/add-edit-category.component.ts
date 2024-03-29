import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, first, takeUntil } from 'rxjs';
import { CategoriesService, CreateCategoryRequest, UpdateCategoryRequest } from 'src/app/core/services/api.service';
import { inputWhiteSpaceValidator } from 'src/app/core/validators';

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.scss']
})
export class AddEditCategoryComponent implements OnInit, OnDestroy {
  categoryForm: FormGroup;
  isEditMode: boolean;
  id: string;
  submitted: boolean = false;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private categoriesService: CategoriesService,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isEditMode = !!this.id;

    this.categoryForm = this.formBuilder.group({
      name: new FormControl('', [inputWhiteSpaceValidator()]),
      description: new FormControl('', [inputWhiteSpaceValidator()]),
    });

    if (this.isEditMode) {
      this.categoriesService.getCategoriesId(this.id)
        .pipe(
          first(),
          takeUntil(this.unsubscribe$)
        ).subscribe(x => this.categoryForm.patchValue(x));
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.categoryForm.invalid) {
      return;
    }

    if (this.isEditMode) {
      this.editCategory();
    } else {
      this.createCategory();
    }
  }

  private createCategory() {
    const query: CreateCategoryRequest = {
      name: this.categoryForm.get('name').value,
      description: this.categoryForm.get('description').value
    }

    this.categoriesService.postCategories(query)
      .pipe(first())
      .subscribe(() => {
        this.router.navigate(['category']);
      });
  }

  private editCategory() {
    const query: UpdateCategoryRequest = {
      id: this.id,
      name: this.categoryForm.get('name').value,
      description: this.categoryForm.get('description').value
    }

    this.categoriesService.putCategories(query)
      .pipe(first())
      .subscribe(() => {
        this.router.navigate(['category']);
      });
  }

  onCancel() {
    this.router.navigate(['category']);
  }

  get categoryFormControl() {
    return this.categoryForm.controls;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
