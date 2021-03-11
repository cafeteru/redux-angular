import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import { initLoading, stopLoading } from 'src/app/shared/ui.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  loading = false;
  subscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      correo: new FormControl('', [Validators.required, Validators.email]),
      contrasenia: new FormControl('', Validators.required)
    });
    this.subscription = this.store.select('ui').subscribe(
      ui => this.loading = ui.isLoading
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  login(): void {
    if (this.formGroup.valid) {
      this.store.dispatch(initLoading());
      const { correo, contrasenia } = this.formGroup.value;
      this.authService.login(correo, contrasenia).then(
        () => {
          this.store.dispatch(stopLoading());
          this.router.navigateByUrl('/');
        }
      ).catch(
        (err: any) => {
          this.store.dispatch(stopLoading());
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.message,
          });
        }
      );
    }
  }
}
