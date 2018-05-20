import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpHeaderResponse,
     HttpSentEvent, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router) {
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.headers.get('No-Auth') === 'True') {
            const cl = req.clone();
            return next.handle(cl);
        }
        if (localStorage.getItem('access_token') != null) {
            const clonedreq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
            });
            return next.handle(clonedreq)
            .do(
                succ => {
                },
                err => {
                    // tslint:disable-next-line:no-debugger
                    debugger;
                    if (err.status === 401) {
                        this.router.navigateByUrl('/user/login');
                    }
                }
            );
        } else {
            this.router.navigateByUrl('/user/login');
        }

    }
}
