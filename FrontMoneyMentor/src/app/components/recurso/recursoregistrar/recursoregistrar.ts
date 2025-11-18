import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { Recurso } from '../../../models/recurso';
import { RecursoService } from '../../../services/recurso-service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-recursoregistrar',
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatButtonModule,
    CommonModule,MatDatepickerModule
  ],
  templateUrl: './recursoregistrar.html',
  styleUrl: './recursoregistrar.css',
})
export class Recursoregistrar implements OnInit{
   form: FormGroup = new FormGroup({});
    rc: Recurso = new Recurso();

    edicion: boolean = false;
    id: number = 0;

    constructor(
        private rs: RecursoService,
        private router: Router,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute
    ) {}
    ngOnInit(): void {
      this.route.params.subscribe((data: Params) => {
            this.id = data['id'];
            this.edicion = this.id != null;
            this.init();
        });
      this.form = this.formBuilder.group({
            codigo: [''],
            titulo: ['', Validators.required],
            descripcion: ['', Validators.required],
            tipo: ['', Validators.required],
            autor: ['', Validators.required],
            fuente: ['', Validators.required],
            url: ['', Validators.required],
            fechapublicacion: ['', Validators.required],
            fechasubida: ['', Validators.required]
        });

    }
    aceptar():void{
      if(this.form.valid){
        this.rc.idRecurso=this.form.value.idRecurso;
        this.rc.titulo=this.form.value.titulo
        this.rc.descripcion=this.form.value.descripcion
        this.rc.tipo=this.form.value.tipo
        this.rc.autor=this.form.value.autor
        this.rc.fuente=this.form.value.fuente
        this.rc.url=this.form.value.url
        this.rc.fechapublicacion=this.form.value.fechapublicacion
        this.rc.fechasubida=this.form.value.fechasubida

        if (this.edicion) {
                this.rs.update(this.rc).subscribe(() => {
                    this.rs.list().subscribe((data) => {
                        this.rs.setList(data);
                    });
                });
            } else {
                this.rs.insert(this.rc).subscribe(() => {
                    this.rs.list().subscribe((data) => {
                        this.rs.setList(data);
                    });
                });
            }

            this.router.navigate(['recurso']);
      }
    }
    init(){
      if(this.edicion){
        this.rs.listId(this.id).subscribe((data)=>{
          this.form=new FormGroup({
            idRecurso:new FormGroup(data.idRecurso),
            titulo:new FormGroup(data.titulo),
            descripcion: new FormGroup(data.descripcion),
            tipo:new FormGroup(data.tipo),
            autor:new FormGroup(data.autor),
            fuente:new  FormGroup(data.fuente),
            url:new FormGroup(data.url),
            fechapublicacion:new FormGroup(data.fechapublicacion),
            fechasubida:new FormGroup(data.fechasubida)
          });
        });
      }
    }
}
