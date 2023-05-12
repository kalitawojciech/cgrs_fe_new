import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { AuthService } from "./services/auth.service";
import { Router } from "@angular/router";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('xDDDDD')
        return next.handle(request).pipe(catchError(err => {
            if ([401, 403].indexOf(err.status) !== -1) {
                this.authService.logout();
                location.reload();
            } else if ([404].indexOf(err.status) !== -1) {
                this.router.navigateByUrl('/not-found', {replaceUrl: true});

                return new Observable<HttpEvent<null>>();
            }


            // TODO: show error toast
            const error = err.error.message || err.statusText;
            return throwError(error);
        }));
    }
}