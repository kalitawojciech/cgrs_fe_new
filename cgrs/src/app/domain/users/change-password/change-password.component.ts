import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  ) { }

  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group({
      oldPassword: new FormControl('', [inputWhiteSpaceValidator()]),
      newPassword: new FormControl('', [inputWhiteSpaceValidator()]),
    })
  }

}
