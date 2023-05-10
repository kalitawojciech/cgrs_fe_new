import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { CategoriesService, CategoryInfoResponse } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'actionButtons'];
  categories: CategoryInfoResponse[] = [];

  private unsubscribe$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.categoriesService.getCategories()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(x => this.categories = x);
  }

  onEdit(id: string) {
    this.router.navigate(['edit', id], {relativeTo: this.route});
  }

  onDelete(id: string) {
    this.categoriesService.deleteCategoriesId(id).pipe(first()).subscribe();
  }

}
