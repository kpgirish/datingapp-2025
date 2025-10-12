import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs';
import { ToastService } from '../services/toast-service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);
  const router = inject(Router);
  return next(req).pipe(
    catchError(error => {
      if (error) {
        switch (error.status) {
          case 400:
            if (error.error.errors) {
              const modalStateErrors = [];
              for (const key in error.error.errors) {
                if (error.error.errors[key]) {
                  modalStateErrors.push(error.error.errors[key]);
                }
              }
              throw modalStateErrors.flat();
            } else {
              //toast.error(error.error || 'Bad Request');
              toast.error(error.error || 'Bad Request');
            }
            //toast.error(error.error);
            break;
          case 401:
            toast.error('Unauthorized');
            break;
          case 404:
            router.navigateByUrl('/not-found');
            //toast.error('Not Found!');
            break;
          case 500:
            const navigationExtras = { state: { error: error.error } }
            router.navigateByUrl('/server-error', navigationExtras);
            // toast.error('Server Error');
            break;
          default:
            toast.error('Something went wrong!!');
            console.log(error);
            break;
        }
      }
      throw error;
    })
  )
};
