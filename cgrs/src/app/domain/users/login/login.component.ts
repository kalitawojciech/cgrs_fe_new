import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserAuthenticationRequest } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { inputWhiteSpaceValidator } from 'src/app/core/validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private spinnerService: SpinnerService,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [inputWhiteSpaceValidator()]),
      password: new FormControl('', [inputWhiteSpaceValidator()])
    });
  }

  logIn() {
    if (this.loginForm.invalid) {
      return;
    }
    
    this.spinnerService.showSpinner();

    const query: UserAuthenticationRequest = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    }

    this.authService.authenticateUser(query).subscribe(() => this.spinnerService.hideSpinner());
  }

  get loginFormControl() {
    return this.loginForm.controls;
  }

}
