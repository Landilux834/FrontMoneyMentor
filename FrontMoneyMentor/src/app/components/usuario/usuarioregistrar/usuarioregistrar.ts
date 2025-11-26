import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatButtonModule } from "@angular/material/button";
import { Usuario } from "../../../models/Usuario";
import { UsuarioService } from "../../../services/usuario-service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
    selector: "app-usuarioregistrar",
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatRadioModule,
        MatButtonModule,
        CommonModule
    ],
    templateUrl: "./usuarioregistrar.html",
    styleUrls: ["./usuarioregistrar.css"]
})
export class usuarioregistrar implements OnInit {

    form!: FormGroup;
    ur: Usuario = new Usuario();
    edicion: boolean = false;
    id: number = 0;
    tituloPagina: string = "Registrar Usuario"

    constructor(
        private uS: UsuarioService,
        private router: Router,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {

        this.form = this.formBuilder.group({
            codigo: [''],
            nombre: ['', [Validators.required, Validators.maxLength(20)]],
            correo: ['', [Validators.required, Validators.email]],
            contrasenia: ['', [Validators.required, Validators.minLength(10)]],
        });

        this.route.params.subscribe((data: Params) => {
            this.id = data['id'];
            this.edicion = this.id != undefined;
            this.tituloPagina = this.edicion ? "Actualizar datos" : "Registrar usuario";
            if (this.edicion) {
                this.init();
            }
        });

    }

    limitarLongitud(campo: string, max: number) {
        const valor = this.form.get(campo)?.value || '';
        if (valor.length > max) {
            this.form.get(campo)?.setValue(valor.substring(0, max));
        }
    }

    aceptar(): void {
        if (this.form.valid) {

            this.ur.nombre = this.form.value.nombre;
            this.ur.correo = this.form.value.correo;

            if (this.edicion) {
                this.ur.idUsuario = this.id;

                this.uS.update(this.ur).subscribe(() => {
                    this.uS.list().subscribe(data => this.uS.setList(data));
                    this.router.navigate(['app/usuariolistar']);
                });
            } else {
                this.ur.contrasenia=this.form.value.contrasenia;
                this.uS.insert(this.ur).subscribe(() => {
                    this.uS.list().subscribe(data => this.uS.setList(data));
                    this.router.navigate(['app/usuariolistar']);
                });
            }
        }
    }

    init() {
        if (this.edicion) {
            this.uS.listId(this.id).subscribe((data) => {
                this.form.patchValue({
                    codigo: data.idUsuario,
                    nombre: data.nombre,
                    correo: data.correo,
                });
                this.ur.idUsuario = data.idUsuario;
            });
        }
    }
}

