import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatButtonModule } from "@angular/material/button";
import { Usuario } from "../../../models/Usuario";
import { UsuarioService } from "../../../services/usuario-service";
import { ActivatedRoute, Params, Route, Router } from "@angular/router";
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
    form: FormGroup=new FormGroup({});
    ur: Usuario=new Usuario();

    edicion:boolean=false;
    id:number=0;

    constructor(
        private uS: UsuarioService,
        private router: Router,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe((data: Params) => {
        });

        this.form = this.formBuilder.group({
            nombre: ['',Validators.required],
            correo: ['',Validators.required],
            contrasenia: ['',Validators.required],
        });
    }
    aceptar(): void {
    if (this.form.valid) {
        this.ur.nombre = this.form.value.nombre;
        this.ur.correo = this.form.value.correo;
        this.ur.contrasenia = this.form.value.contrasenia;

        this.uS.insert(this.ur).subscribe(() => {
        this.uS.list().subscribe((data) => {
        this.uS.setList(data);
        });
        this.router.navigate(["/usuario"]);
        });
    }
}

}
