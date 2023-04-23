import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { LoggedInUserResponse, UserAuthenticationRequest, UsersService } from './api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<LoggedInUserResponse>;
  public currentUser: Observable<LoggedInUserResponse>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersService
    ) {
      this.currentUserSubject = new BehaviorSubject<LoggedInUserResponse>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  authenticateUser(loginPayload: UserAuthenticationRequest): Observable<LoggedInUserResponse> {
    return this.usersService.postUsersAuthenticate(loginPayload)
      .pipe(map(user => {

        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}
