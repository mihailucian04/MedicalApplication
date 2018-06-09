import { Injectable, Inject, forwardRef } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpHeaderResponse,
     HttpSentEvent, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/do';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(@Inject(forwardRef(() => Router))private router: Router) {
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const idToken = localStorage.getItem('access_token');
        if (idToken) {
            const clonedreq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + idToken)
            });
            return next.handle(clonedreq)
            .do(
                succ => {
                },
                err => {
                    if (err.status === 401) {
                        this.router.navigateByUrl('/user/login');
                    }
                }
            );
        } else {
            return next.handle(req);
        }

    }
}
