import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canLoad(): Observable<boolean> {
    return this.authService.isAuth().pipe(
      tap(estado => {
        if (!estado) {
          this.router.navigateByUrl('/login');
        }
      }),
      take(1)
    );
  }
}
