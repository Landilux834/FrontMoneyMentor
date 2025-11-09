import { Component } from "@angular/core";
import { ActivatedRoute, RouterLinkActive, RouterOutlet } from "@angular/router";
import { usuariolistar } from "./usuariolistar/usuariolistar";

@Component({
  selector: 'app-area',
  imports: [RouterOutlet,usuariolistar],
  templateUrl: './usuario.html',
  styleUrls: ['./usuario.css'],
})
export class Usuario {
  constructor(public route:ActivatedRoute) {}
}