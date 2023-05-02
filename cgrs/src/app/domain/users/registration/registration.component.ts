import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { first } from 'rxjs';
import { RegisterUserRequest, UsersService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService
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

    const requestQuery: RegisterUserRequest = {
      email: this.registrationForm.get('email').value,
      nick: this.registrationForm.get('nick').value,
      birthDate: this.registrationForm.get('birthDate').value,
      password: this.registrationForm.get('password').value
    }

    this.usersService.postUsersRegister(requestQuery).pipe(first()).subscribe();
  }

  
  get registrationFormControl() {
    return this.registrationForm.controls;
  }
}
