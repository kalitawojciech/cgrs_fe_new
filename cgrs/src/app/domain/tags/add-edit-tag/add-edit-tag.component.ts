import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, first, takeUntil } from 'rxjs';
import { CreateTagRequest, TagsService, UpdateTagRequest } from 'src/app/core/services/api.service';
import { inputWhiteSpaceValidator } from 'src/app/core/validators';

@Component({
  selector: 'app-add-edit-tag',
  templateUrl: './add-edit-tag.component.html',
  styleUrls: ['./add-edit-tag.component.scss']
})
export class AddEditTagComponent implements OnInit, OnDestroy {
  tagForm: FormGroup;
  isEditMode: boolean;
  id: string;
  loading = false;
  submitted = false;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private tagsService: TagsService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isEditMode = !!this.id;

    this.tagForm = this.formBuilder.group({
      name: new FormControl('', [inputWhiteSpaceValidator()]),
    })

    if (this.isEditMode) {
      this.tagsService.getTagsId(this.id)
        .pipe(
          first(),
          takeUntil(this.unsubscribe$))
        .subscribe(x => this.tagForm.patchValue(x));
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.tagForm.invalid) {
      return;
    }

    if (this.isEditMode) {
      this.editTag();
    } else {
      this.createTag();
    }
  }

  private createTag() {
    const query: CreateTagRequest = {
      name: this.tagForm.get('name').value,
    }

    this.tagsService.postTags(query)
      .pipe(first())
      .subscribe(() => {
        this.router.navigate(['tag']);
      });
  }

  private editTag() {
    const query: UpdateTagRequest = {
      id: this.id,
      name: this.tagForm.get('name').value,
    }

    this.tagsService.putTags(query)
      .pipe(first())
      .subscribe(() => {
        this.router.navigate(['tag']);
      });
  }

  onCancel(): void {
    this.location.back();
  }

  get tagFormControl() {
    return this.tagForm.controls;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
