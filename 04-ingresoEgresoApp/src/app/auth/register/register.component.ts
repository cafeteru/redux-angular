import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formGroup: FormGroup;
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      nombre: new FormControl('', Validators.required),
      correo: new FormControl('', [Validators.required, Validators.email]),
      contrasenia: new FormControl('', Validators.required)
    });
  }

  crearUsuario(): void {
    if (this.formGroup.valid) {
      Swal.fire({
        title: 'Espere por favor',
        didOpen: () => {
          Swal.showLoading();
        }
      });
      const { nombre, correo, contrasenia } = this.formGroup.value;
      this.authService.crearUsuario(nombre, correo, contrasenia).then(
        () => {
          Swal.close();
          this.router.navigateByUrl('/');
        }
      ).catch(
        err => Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        })
      );
    }
  }

}
