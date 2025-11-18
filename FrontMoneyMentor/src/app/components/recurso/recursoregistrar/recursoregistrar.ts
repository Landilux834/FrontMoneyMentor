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

@Component({
  selector: 'app-recursoregistrar',
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatButtonModule,
    CommonModule
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
}
