import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  // Get Token from Local Storage
  const token = localStorage.getItem('token');

  // If token exists, clone request and add Authorization header
  if (token) {

    const clonedRequest = req.clone({

      setHeaders: {
        Authorization: `Bearer ${token}`
      }

    });

    return next(clonedRequest);

  }

  // If token not available, send original request
  return next(req);

};