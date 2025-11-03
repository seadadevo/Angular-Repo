import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const _AuthService = inject(AuthService);
  const _Router = inject(Router);
  
  if(_AuthService.userData.getValue() !== null) {
    return true
  }
    _Router.navigate(['/login']);
    return false;
  
};
