import { Usuario } from './../../models/usuario.model';
import { UsuarioService } from './../../services/usuario.service';
import { SidebarService } from './../../services/sidebar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuItems:any[];
  public usuario:Usuario;
  
  constructor(private sidebarService:SidebarService,private usuarioService:UsuarioService) {
    this.usuario=usuarioService.usuario;
    this.menuItems=sidebarService.menu;
   }

  ngOnInit(): void {
  }

}
