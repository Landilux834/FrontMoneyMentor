import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  const authReq = token
    ? req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      })
    : req;

  return next(authReq); // 👈 ESTA ES LA CLAVE. No se usa next(req).
};
