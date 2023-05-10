import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, first, takeUntil } from 'rxjs';
import { CategoriesService, CreateCategoryRequest, UpdateCategoryRequest } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-add-edit-category.form',
  templateUrl: './add-edit-category.form.component.html',
  styleUrls: ['./add-edit-category.form.component.scss']
})
export class AddEditCategoryComponent implements OnInit {
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
      name: new FormControl(''),
      description: new FormControl(''),
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
      .subscribe({

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
      .subscribe({

    });
  }

  onCancel() {
    this.router.navigate(['category'],);
  }

  get categoryFormControl() {
    return this.categoryForm.controls;
  }
}
