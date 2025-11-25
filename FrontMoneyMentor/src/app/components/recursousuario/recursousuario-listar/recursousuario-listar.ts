import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { recursousuario } from '../../../models/recurso-usuario';
import { RecursousService } from '../../../services/recursous-service';

@Component({
  selector: 'app-recursousuario-listar',
  imports: [MatTableModule, MatButtonModule, CommonModule
  ],
  templateUrl: './recursousuario-listar.html',
  styleUrl: './recursousuario-listar.css',
})
export class RecursousuarioListar {
  dataSource: MatTableDataSource<recursousuario> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3'];

  constructor(private rus:RecursousService ) { }
  ngOnInit(): void {
    this.rus.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.rus.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  eliminar(id: number) {
    this.rus.delete(id).subscribe(() => {
      this.rus.list().subscribe((data) => {
        this.rus.setList(data)
      })
    })
  }
}
