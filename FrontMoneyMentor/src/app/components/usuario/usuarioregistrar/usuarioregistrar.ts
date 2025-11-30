import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { Usuario } from '../../../models/Usuario';
import { UsuarioService } from '../../../services/usuario-service';
import {
  ActivatedRoute,
  Params,
  Router,
  RouterLink,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-usuarioregistrar',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatButtonModule,
    CommonModule,
    MatCardModule,
    RouterLink,
    MatSelectModule,
  ],
  templateUrl: './usuarioregistrar.html',
  styleUrls: ['./usuarioregistrar.css'],
})
export class usuarioregistrar implements OnInit {
  
  form: FormGroup = new FormGroup({});
  ur: Usuario = new Usuario();

  mensajeError: string = '';

  edicion: boolean = false;
  id: number = 0;

  constructor(
    private uS: UsuarioService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];

      if (this.id != null) {
        this.edicion = true;
        this.init();
      } else {
        this.edicion = true;
        this.cargarMiPerfil();
      }
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasenia: ['', [Validators.minLength(10)]],
    });
  }

  cargarMiPerfil() {
    this.uS.getMiUsuario().subscribe(
      (data) => {
        this.form = new FormGroup({
          codigo: new FormControl({ value: data.idUsuario, disabled: true }),
          nombre: new FormControl(data.nombre),
          correo: new FormControl(data.correo),
          contrasenia: new FormControl('', []),
        });
      },
      () => {
        this.mensajeError = "❌ Error al cargar tu información de usuario.";
      }
    );
  }

  init() {
    if (this.id != null) {
      this.uS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idUsuario),
          nombre: new FormControl(data.nombre),
          correo: new FormControl(data.correo),
          contrasenia: new FormControl('', []),
        });
      });
    }
  }

  aceptar(): void {
    if (!this.form.valid) return;

    this.ur.idUsuario = this.form.getRawValue().codigo;
    this.ur.nombre = this.form.value.nombre;
    this.ur.correo = this.form.value.correo;
    this.ur.contrasenia = this.form.value.contrasenia;

    if (!this.id) {
      this.uS.updateMiUsuario(this.ur).subscribe(
        () => this.router.navigate(['app']),
        (err) => this.mensajeError = err.status === 409 ? "⚠ Correo en uso" : "❌ Error al actualizar"
      );
      return;
    }

    this.uS.update(this.ur).subscribe(() => {
      this.uS.list().subscribe((data) => this.uS.setList(data));
      this.router.navigate(['app/usuariolistar']);
    });
  }

  cerrar() {
    this.router.navigate(['']);
  }
}
