import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UserFullInfoResponse, UsersService } from 'src/app/core/services/api.service';
import { SpinnerService } from 'src/app/core/services/spinner.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['nick', 'email', 'role'];
  users: UserFullInfoResponse[] = [];
  dataSource: MatTableDataSource<UserFullInfoResponse>;

  pageSize: number = 4;
  pageNumber: number = 0;
  totalDataCount: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService,
    private spinnerService: SpinnerService,
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers(): void {
    this.spinnerService.showSpinner();
    this.usersService
      .getUsers('', this.pageNumber, this.pageSize)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.users = data.results;
        this.dataSource = new MatTableDataSource(data.results);
        this.totalDataCount = data.totalDataCount;
        this.spinnerService.hideSpinner();
      });
  }
}
