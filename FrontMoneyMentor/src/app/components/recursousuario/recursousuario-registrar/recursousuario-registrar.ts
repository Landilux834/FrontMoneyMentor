import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { recursousuario } from '../../../models/recurso-usuario';
import { Recurso } from '../../../models/recurso';
import { Usuario } from '../../../models/Usuario';
import { RecursoService } from '../../../services/recurso-service';
import { UsuarioService } from '../../../services/usuario-service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ImpuestoopService } from '../../../services/impuestoop-service';
import { RecursousService } from '../../../services/recursous-service';

@Component({
  selector: 'app-recursousuario-registrar',
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatButtonModule,
    MatSelectModule,
    CommonModule],
  templateUrl: './recursousuario-registrar.html',
  styleUrl: './recursousuario-registrar.css',
})
export class RecursousuarioRegistrar implements OnInit {
  form: FormGroup = new FormGroup({});
  recur: recursousuario = new recursousuario();
  edicion: boolean = false;
  id: number = 0;
  listarecurso: Recurso[] = [];
  listausuario: Usuario[] = [];
  constructor(
    private rs: RecursoService,
    private us: UsuarioService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private rus: RecursousService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.rs.list().subscribe((data) => {
      this.listarecurso = data;
    });
    this.us.list().subscribe((data) => {
      this.listausuario = data;
    });
    this.form = this.formBuilder.group({
      idRecursoUsuario: [''],
      usuario: ['', Validators.required],
      recurso: ['', Validators.required],
    });
  }
  aceptar(): void {
    if (this.form.valid) {
      this.recur.idRecursoUsuario = this.form.value.idRecursoUsuario;
      this.recur.usuario.idUsuario = this.form.value.usuario;
      this.recur.recurso.idRecurso = this.form.value.recurso;

      if (this.edicion) {
        this.rus.update(this.recur).subscribe(() => {
          this.rus.list().subscribe((data) => {
            this.rus.setList(data);
          });
        });
      } else {
        this.rus.insert(this.recur).subscribe((data) => {
          this.rus.list().subscribe((data) => {
            this.rus.setList(data);
          });
        });
      }
      this.router.navigate(['app/recurso-usuario']);
    }
  }
  init() {
    if (this.edicion) {
      this.rus.ListId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idRecursoUsuario: new FormControl(data.idRecursoUsuario),
          usuario: new FormControl(data.usuario.idUsuario),
          recurso: new FormControl(data.recurso.idRecurso),
        });
      });
    }
  }
}
