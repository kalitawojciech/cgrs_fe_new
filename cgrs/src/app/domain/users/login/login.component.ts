import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserAuthenticationRequest } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  logIn() {
    this.submitted = true;

    const query: UserAuthenticationRequest = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    }

    this.authService.authenticateUser(query).subscribe();
  }

  get loginFormControl() {
    return this.loginForm.controls;
  }

}
