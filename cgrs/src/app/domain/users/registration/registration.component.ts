import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { RegisterUserRequest, UsersService } from 'src/app/core/services/api.service';
import { SpinnerService } from 'src/app/core/services/spinner.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usersService: UsersService,
    private spinnerService: SpinnerService,
  ) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      email: new FormControl(''),
      nick: new FormControl(''),
      password: new FormControl(''),
      birthDate: new FormControl(''),
    })
  }

  register() {
    if (this.registrationForm.invalid) {
      return;
    }
    
    this.spinnerService.showSpinner();

    const requestQuery: RegisterUserRequest = {
      email: this.registrationForm.get('email').value,
      nick: this.registrationForm.get('nick').value,
      birthDate: this.registrationForm.get('birthDate').value,
      password: this.registrationForm.get('password').value
    }

    this.usersService.postUsersRegister(requestQuery)
    .pipe(first())
    .subscribe(() => {
      this.spinnerService.hideSpinner();
      this.router.navigate(['login']);
    });
  }

  
  get registrationFormControl() {
    return this.registrationForm.controls;
  }
}
