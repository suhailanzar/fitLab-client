import { HttpInterceptorFn } from '@angular/common/http';

export const errorHandlingInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
