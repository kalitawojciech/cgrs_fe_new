import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { ChangePasswordRequest, UsersService } from 'src/app/core/services/api.service';
import { inputWhiteSpaceValidator } from 'src/app/core/validators';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  passwordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group({
      oldPassword: new FormControl('', [inputWhiteSpaceValidator()]),
      newPassword: new FormControl('', [inputWhiteSpaceValidator()]),
    })
  }

  saveChanges(): void {
    if (this.passwordForm.invalid) {
      return;
    }

    const query: ChangePasswordRequest = {
      oldPassword: this.passwordForm.get('oldPassword').value,
      newPassword: this.passwordForm.get('newPassword').value,
    }

    this.usersService.putUsersChangePassword(query)
      .pipe(first())
      .subscribe(() => {
        this.router.navigate(['']);
      });
  }

  get passwordFormControl() {
    return this.passwordForm.controls;
  }

}
