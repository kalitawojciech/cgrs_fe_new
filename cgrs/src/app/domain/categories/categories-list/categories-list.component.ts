import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CategoriesService, CategoryInfoResponse } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description'];
  categories: CategoryInfoResponse[] = [];

  private unsubscribe$ = new Subject<void>();

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.categoriesService.getCategories()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(x => this.categories = x);
    console.log(this.categories);
  }

}
