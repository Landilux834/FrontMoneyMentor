import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatButtonModule } from "@angular/material/button";
import { Usuario } from "../../../models/Usuario";
import { UsuarioService } from "../../../services/usuario-service";
import { ActivatedRoute, Params, Route, Router } from "@angular/router";
import { CommonModule } from '@angular/common';
import { compileDeclareClassMetadata } from "@angular/compiler";

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
        this.id=data['id']
        this.edicion=data['id']!=null
        //llenar formulario con data
        this.init();
        });

        this.form = this.formBuilder.group({
            codigo: [''],
            nombre: ['',Validators.required],
            correo: ['',Validators.required],
            contrasenia: ['',Validators.required],
        });
    }
    aceptar(): void {
    if (this.form.valid) {
        this.ur.idUsuario = this.form.value.codigo;
        this.ur.nombre = this.form.value.nombre;
        this.ur.correo = this.form.value.correo;
        this.ur.contrasenia = this.form.value.contrasenia;

        if(this.edicion){
            this.uS.update(this.ur).subscribe((data) => {
                this.uS.list().subscribe((data) => {
                this.uS.setList(data);
            });
    });
        }else{
            this.uS.insert(this.ur).subscribe((data) => {
                this.uS.list().subscribe((data) => {
                this.uS.setList(data);

     });

    });

   }

   this.router.navigate(['usuarios']);

  }
    }
init(){
    if(this.edicion){
    this.uS.ListId(this.id).subscribe(data=>{
      this.form = new FormGroup({
        codigo: new FormControl(data.idUsuario),
        nombre: new FormControl(data.nombre),
        correo: new FormControl(data.correo),
        contrasenia: new FormControl(data.contrasenia)
      });
    });
}
}
}
