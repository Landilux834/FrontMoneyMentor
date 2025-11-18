import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Balance } from '../../../models/Balance';
import { BalanceService } from '../../../services/balance-service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario-service';
import { Usuario } from '../../../models/Usuario';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-balance-insert',
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,CommonModule],
  templateUrl: './balance-insert.html',
  styleUrl: './balance-insert.css',
})
export class BalanceInsert implements OnInit {
  form: FormGroup = new FormGroup({});
  bal: Balance = new Balance();
  edicion: boolean = false;
  id: number = 0;
  listaUsuario: Usuario[] = [];

  meses: { value: number; viewValue: string }[] = [
    { value: 1, viewValue: 'Enero' },
    { value: 2, viewValue: 'Febrero' },
    { value: 3, viewValue: 'Marzo' },
    { value: 4, viewValue: 'Abril' },
    { value: 5, viewValue: 'Mayo' },
    { value: 6, viewValue: 'Junio' },
    { value: 7, viewValue: 'Julio' },
    { value: 8, viewValue: 'Agosto' },
    { value: 9, viewValue: 'Septiembre' },
    { value: 10, viewValue: 'Octubre' },
    { value: 11, viewValue: 'Noviembre' },
    { value: 12, viewValue: 'Diciembre' }
  ];
  constructor(
    private bS: BalanceService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private uS: UsuarioService
  ) {
  }

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
      mes: ['', Validators.required],
      anio: ['', Validators.required],
      total_gasto: ['', Validators.required],
      total_ingreso: ['', Validators.required],
      total_ahorro: ['', Validators.required],
      balance: ['', Validators.required],
      fk: ['', Validators.required]
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.bal.idBalance = this.form.value.codigo;
      this.bal.mes = this.form.value.mes;
      this.bal.anio = this.form.value.anio;
      this.bal.total_gasto = this.form.value.total_gasto;
      this.bal.total_ingreso = this.form.value.total_ingreso;
      this.bal.total_ahorro = this.form.value.total_ahorro;
      this.bal.balance = this.form.value.balance;
      this.bal.usuario.idUsuario = this.form.value.fk;

      if (this.edicion) {
        this.bS.update(this.bal).subscribe(() => {
          this.bS.list().subscribe((data) => {
            this.bS.setList(data);
          });
        });
      } else {
        this.bS.insert(this.bal).subscribe((data) => {
          this.bS.list().subscribe((data) => {
            this.bS.setList(data);
          });
        });
      }

      this.router.navigate(['balance']);
    }

  }


  init() {
    if (this.edicion) {
      this.bS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idBalance),
          mes: new FormControl(data.mes),
          anio: new FormControl(data.anio),
          total_gasto: new FormControl(data.total_gasto),
          total_ingreso: new FormControl(data.total_ingreso),
          total_ahorro: new FormControl(data.total_ahorro),
          balance: new FormControl(data.balance),
          fk: new FormControl(data.usuario.idUsuario)
        });

      });
    }
  }
}