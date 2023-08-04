import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { TagInfoResponse, TagsService } from 'src/app/core/services/api.service';
import { SpinnerService } from 'src/app/core/services/spinner.service';

@Component({
  selector: 'app-tags-list',
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.scss']
})
export class TagsListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'action-buttons'];
  tags: TagInfoResponse[] = [];
  dataSource: MatTableDataSource<TagInfoResponse>;

  @ViewChild(MatSort) sort: MatSort;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tagsService: TagsService,
    private spinnerService: SpinnerService,
  ) { }

  ngOnInit(): void {
    this.spinnerService.showSpinner();

    this.tagsService.getTags()
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

  addNewTag() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
