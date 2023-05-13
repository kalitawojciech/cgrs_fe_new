import { Component, inject } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-allert',
  templateUrl: './allert.component.html',
  styleUrls: ['./allert.component.scss']
})
export class AllertComponent {
  snackBarRef = inject(MatSnackBarRef);
}
