import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Ahorro } from '../../../models/Ahorro';
import { AhorroService } from '../../../services/ahorro-service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario-service';
import { Usuario } from '../../../models/Usuario';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-ahorro-insert',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './ahorro-insert.html',
  styleUrl: './ahorro-insert.css',
})
export class AhorroInsert {

  form: FormGroup = new FormGroup({});
  ah: Ahorro = new Ahorro();
  edicion: boolean = false;
  id: number = 0;
  listaUsuario: Usuario[] = [];

  constructor(
    private aS: AhorroService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private uS: UsuarioService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.uS.list().subscribe((data) => {
      this.listaUsuario = data;
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      objetivo: ['', Validators.required],
      fecha_inicio: ['', Validators.required],
      fecha_limite: ['', Validators.required],
      fk: ['', Validators.required]
    });

    this.init();
  }

  aceptar(): void {
    if (this.form.valid) {
      this.ah.idAhorro = this.form.value.codigo;
      this.ah.objetivo = this.form.value.objetivo;
      this.ah.usuario = new Usuario();
      this.ah.usuario.idUsuario = this.form.value.fk;

      this.ah.fecha_inicio = this.form.value.fecha_inicio;
      this.ah.fecha_limite = this.form.value.fecha_limite;

      if (this.edicion) {
        this.aS.update(this.ah).subscribe(() => {
          this.aS.list().subscribe(data => this.aS.setList(data));
        });
      } else {
        this.aS.insert(this.ah).subscribe(() => {
          this.aS.list().subscribe(data => this.aS.setList(data));
        });
      }

      this.router.navigate(['app/ahorro']);
    }
  }

  init() {
    if (this.edicion) {
      this.aS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idAhorro),
          objetivo: new FormControl(data.objetivo),
          fecha_inicio: new FormControl(data.fecha_inicio),
          fecha_limite: new FormControl(data.fecha_limite),
          fk: new FormControl(data.usuario.idUsuario)
        });
      });
    }
  }
}
