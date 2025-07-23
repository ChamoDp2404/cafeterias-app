import { Injectable } from '@angular/core';
import {
  CanActivateFn,
  Router
} from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { map, take } from 'rxjs/operators';
import { of } from 'rxjs';

export const roleGuard = (expectedRole: string): CanActivateFn => {
  return () => {
    const userService = inject(UserService);
    const router = inject(Router);

    return userService.obtenerRolActual().pipe(
      take(1),
      map((rol) => {
        if (rol === expectedRole) {
          return true;
        } else {
          router.navigate(['/cafeterias']); // Redirige si no tiene el rol esperado
          return false;
        }
      })
    );
  };
};
