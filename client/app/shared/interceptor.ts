import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse,
    HttpResponse
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {isPlatformBrowser} from '@angular/common';


@Injectable()
export class InterceptorProvider implements HttpInterceptor {

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (isPlatformBrowser(this.platformId)) {
            if (localStorage.getItem('AUTH_TOKEN') && !request.headers.has('Authorization')) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN')}`
                    }
                });
            }
        }
        return next.handle(request).pipe(
            tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {

                    // do stuff with response if you want
                }
            }, (error: any) => {
                if (error instanceof HttpErrorResponse) {
                    switch (error.status) {
                        case 401:
                            if (isPlatformBrowser(this.platformId)) {
                                localStorage.removeItem('AUTH_TOKEN');
                            }
                            console.log(error.error);
                            break;
                        default:
                            console.log(error.error);
                    }
                }
            })
        );
    }

    public isJson(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
}

