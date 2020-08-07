import { Usuario } from './../../models/usuario.model';
import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public usuario:Usuario;

  constructor(private usuarioService:UsuarioService) {
    this.usuario=usuarioService.usuario;
   }

  ngOnInit(): void {
  }

  logOut(){
    this.usuarioService.logout();
  }

}
