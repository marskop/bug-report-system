import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export class Interceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({ setHeaders: { Authorization: "code.hub.ng5.token" } });

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (event.status === 200) { }
          else if (event.status === 404) {
            console.error("401: Not Found")
          }
          else if (event.status === 401) {
            console.error("401: Unauthorized")
          }
          else if (event.status === 500) {
            console.error("500: Internal Server Error")
          }
        }
        return event;
      })
    );
  }
}
