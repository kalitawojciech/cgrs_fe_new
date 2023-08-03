import { Component, OnInit } from '@angular/core';
import { UserProfileResponse, UsersService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userData: UserProfileResponse;

  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
  }

}
