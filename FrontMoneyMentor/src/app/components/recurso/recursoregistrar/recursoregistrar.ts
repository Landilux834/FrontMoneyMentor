import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
            this.edicion = data['id'] != null;
            this.init();
        });
      this.form = this.formBuilder.group({
            idRecurso: [''],
            titulo: ['', Validators.required],
            descripcion: ['', Validators.required],
            tipo: ['', Validators.required],
            autor: ['', Validators.required],
            fuente: ['', Validators.required],
            url: ['', [Validators.required,Validators.pattern(/^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/)]],
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
                this.rs.update(this.rc).subscribe((data) => {
                    this.rs.list().subscribe((data) => {
                        this.rs.setList(data);
                    });
                });
            } else {
                this.rs.insert(this.rc).subscribe((data) => {
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
            idRecurso:new FormControl(data.idRecurso),
            titulo:new FormControl(data.titulo),
            descripcion: new FormControl(data.descripcion),
            tipo:new FormControl(data.tipo),
            autor:new FormControl(data.autor),
            fuente:new  FormControl(data.fuente),
            url:new FormControl(data.url),
            fechapublicacion:new FormControl(data.fechapublicacion),
            fechasubida:new FormControl(data.fechasubida)
          });
        });
      }
    }
}
