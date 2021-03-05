import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      correo: new FormControl('', [Validators.required, Validators.email]),
      contrasenia: new FormControl('', Validators.required)
    });
  }

  login(): void {
    if (this.formGroup.valid) {
      Swal.fire({
        title: 'Espere por favor',
        didOpen: () => {
          Swal.showLoading();
        }
      });
      const { correo, contrasenia } = this.formGroup.value;
      this.authService.login(correo, contrasenia).then(
        () => {
          Swal.close();
          this.router.navigateByUrl('/');
        }
      ).catch(
        (err: any) => Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        })
      );
    }
  }
}
