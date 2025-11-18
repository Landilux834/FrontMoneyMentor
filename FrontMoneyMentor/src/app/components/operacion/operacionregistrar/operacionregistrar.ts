import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router, Params } from "@angular/router";

import { operacionModel } from "../../../models/operacionModel";
import { OperacionService } from "../../../services/operacion-service";
import { Usuario } from "../../../models/Usuario";
import { UsuarioService } from "../../../services/usuario-service";
import { MatDatepickerModule } from "@angular/material/datepicker";

@Component({
  selector: "app-operacionregistrar",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    CommonModule,MatDatepickerModule
  ],
  templateUrl: "./operacionregistrar.html",
  styleUrls: ["./operacionregistrar.css"]
})
export class OperacionRegistrar implements OnInit {

  form!: FormGroup;
  operacion: operacionModel = new operacionModel();
  edicion: boolean = false;
  id: number = 0;
  usuarios: Usuario[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private operacionService: OperacionService,
    private usuarioService: UsuarioService
  ) {}

 ngOnInit(): void {

  this.form = this.fb.group({
    categoria: ['', Validators.required],
    tipo: ['', Validators.required],
    monto: [0, [Validators.required, Validators.min(0)]],
    detalle: [''],
    fecha: ['', Validators.required],
    usuarioId: ['', Validators.required]
  });

  this.usuarioService.list().subscribe(data => {
    this.usuarios = data;
  });

  this.route.params.subscribe((data: Params) => {
    this.id = data['id'];
    this.edicion = this.id != null;
    this.init();  
  });
}


  aceptar(): void {
    if (this.form.valid) {

      // Asegurar que exista usuario
      if (!this.operacion.usuario) {
        this.operacion.usuario = new Usuario();
      }

      this.operacion.categoria = this.form.value.categoria;
      this.operacion.tipo = this.form.value.tipo;
      this.operacion.monto = this.form.value.monto;
      this.operacion.detalle = this.form.value.detalle;
      this.operacion.fecha = this.form.value.fecha;
      this.operacion.usuario.idUsuario = this.form.value.usuarioId;

      if (this.edicion) {
        this.operacionService.update(this.operacion.idOperacion, this.operacion)
          .subscribe(() => {
            this.operacionService.list().subscribe(data => this.operacionService.setList(data));
            this.router.navigate(['/operacion']);
          });
      } else {
        this.operacionService.save(this.operacion)
          .subscribe(() => {
            this.operacionService.list().subscribe(data => this.operacionService.setList(data));
            this.router.navigate(['/operacion']);
          });
      }
    }
  }

  cancelar(): void {
    this.router.navigate(['/operacion']);
  }

  init() {
    if (this.edicion) {
      this.operacionService.list().subscribe(data => {
        const op = data.find(o => o.idOperacion === this.id);

        if (op) {
          this.operacion = op;

          this.form.patchValue({
            categoria: op.categoria,
            tipo: op.tipo,
            monto: op.monto,
            detalle: op.detalle,
            fecha: op.fecha,
            usuarioId: op.usuario?.idUsuario
          });

          console.log("Formulario cargado:", this.form.value);
        }
      });
    }
  }
}
