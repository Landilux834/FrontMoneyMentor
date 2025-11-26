import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Balance } from '../../models/Balance';
import { BalanceService } from '../../services/balance-service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-reporte-balance-mes',
  imports: [CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule],
  templateUrl: './reporte-balance-mes.html',
  styleUrl: './reporte-balance-mes.css',
})
export class ReporteBalanceMes implements OnInit {


  meses: string[] = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];


  mesBuscado: string = '';
  mensaje: string = '';

  dataSource: MatTableDataSource<Balance> =
    new MatTableDataSource<Balance>([]);

  displayedColumns: string[] = [
    'mes',
    'anio',
    'total_gasto',
    'total_ingreso',
    'total_ahorro',
    'balance',
    'usuario'
  ];

  constructor(private bs: BalanceService) { }

  ngOnInit(): void {
  }

  buscarPorMes() {
    if (!this.mesBuscado) {
      this.mensaje = 'Debe seleccionar un mes.';
      this.dataSource = new MatTableDataSource<Balance>([]);
      return;
    }

    this.bs.getBalancePorMes(this.mesBuscado).subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.mensaje = '';
      },
      error: () => {
        this.mensaje = `No se encontraron balances para el mes "${this.mesBuscado}".`;
        this.dataSource = new MatTableDataSource<Balance>([]);
      }
    });
  }

  limpiar() {
    this.mesBuscado = '';
    this.mensaje = '';
    this.dataSource = new MatTableDataSource<Balance>([]);
  }
}
