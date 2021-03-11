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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  loading = false;
  subscription: Subscription;

  formGroup: FormGroup;
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      nombre: new FormControl('', Validators.required),
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

  crearUsuario(): void {
    if (this.formGroup.valid) {
      this.store.dispatch(initLoading());
      const { nombre, correo, contrasenia } = this.formGroup.value;
      this.authService.crearUsuario(nombre, correo, contrasenia).then(
        () => {
          this.store.dispatch(stopLoading());
          this.router.navigateByUrl('/');
        }
      ).catch(
        err => {
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
