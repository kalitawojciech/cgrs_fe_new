import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, first, takeUntil } from 'rxjs';
import { UserProfileResponse, UsersService } from 'src/app/core/services/api.service';
import { SpinnerService } from 'src/app/core/services/spinner.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  userData: UserProfileResponse;
  
  private unsubscribe$ = new Subject<void>();

  constructor(
    private usersService: UsersService,
    private spinnerService: SpinnerService,
  ) { }

  ngOnInit(): void {
    this.getUserDetails();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private getUserDetails(): void {
    this.spinnerService.showSpinner();

    this.usersService.getUsersMyData()
    .pipe(
      first(),
      takeUntil(this.unsubscribe$))
    .subscribe(x => {
      this.userData = x;
      this.spinnerService.hideSpinner();
    });
  }
}
