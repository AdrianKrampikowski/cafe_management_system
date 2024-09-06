import { CanActivateFn } from '@angular/router';
import { Inject, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const permissionGuard: CanActivateFn = (route, state) => {
  const isAdmin = localStorage.getItem('role');
  const router = inject(Router);
  if (isAdmin == 'admin') {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};