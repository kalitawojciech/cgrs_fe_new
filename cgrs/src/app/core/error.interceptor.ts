import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { AuthService } from "./services/auth.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AllertComponent } from "./components/allert/allert.component";

@Injectable({providedIn: 'root'})
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
        private authService: AuthService,
        private snackBar: MatSnackBar
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('xDDDDD')
        return next.handle(request).pipe(catchError(err => {
            if ([401, 403].indexOf(err.status) !== -1) {
                this.authService.logout();
            } else if ([404].indexOf(err.status) !== -1) {
                this.router.navigateByUrl('/not-found', {replaceUrl: true});

                return new Observable<HttpEvent<null>>();
            } else if ([400].indexOf(err.status) !== -1) {
                console.log(err)
                // this.snackBar.openFromComponent(AllertComponent, {
                //     duration: 5000
                // })
                this.snackBar.open(err.error, 'Close', { duration: 5000, verticalPosition: 'top' })

                return new Observable<HttpEvent<null>>();
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }));
    }
}