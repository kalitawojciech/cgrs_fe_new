import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { CategoriesService, CategoryInfoResponse } from 'src/app/core/services/api.service';
import { SpinnerService } from 'src/app/core/services/spinner.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'description', 'status', 'action-buttons'];
  categories: CategoryInfoResponse[] = [];
  dataSource: MatTableDataSource<CategoryInfoResponse>;

  @ViewChild(MatSort) sort: MatSort;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoriesService: CategoriesService,
    private spinnerService: SpinnerService,
  ) { }

  ngOnInit(): void {
    this.spinnerService.showSpinner();

    this.categoriesService.getCategories()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.spinnerService.hideSpinner();
      });
  }

  onEdit(id: string) {
    this.router.navigate(['edit', id], {relativeTo: this.route});
  }

  addNewCategory() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  changeStatus(id: string) {
    this.spinnerService.showSpinner();
    this.categoriesService.putCategoriesChangeStatusId(id)
      .pipe(
        takeUntil(this.unsubscribe$),
        switchMap(() => this.categoriesService.getCategories())
      )
      .subscribe((data) => {
        this.dataSource.data = data;
        this.spinnerService.hideSpinner();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
