import { ModalImagenService } from './../../../services/modal-imagen.service';
import { Usuario } from './../../../models/usuario.model';
import  Swal from 'sweetalert2';
import { BusquedasService } from './../../../services/busquedas.service';
import { UsuarioService } from './../../../services/usuario.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit,OnDestroy {

  public totalUsuarios:number=0;
  public usuarios:Usuario[]=[];
  public desde:number=0;
  public cargando:boolean=true;
  public usuariosTemp:Usuario[]=[];
  public imgSub:Subscription;

  constructor(
    private usuarioService:UsuarioService,
    private busquedaService:BusquedasService,
    private modalImagenService:ModalImagenService
  ) { }

  OnDestroy(){
    
    this.imgSub.unsubscribe();
  }

  ngOnInit(): void {

    this.cargarUsuarios();
    this.imgSub=this.modalImagenService.nuevaImagen
      .subscribe(
        img=>this.cargarUsuarios()
      );
  }

  cargarUsuarios(){
    this.cargando=true;
    this.usuarioService.cargarUsuarios(this.desde).subscribe(({total,usuarios})=>{
      this.totalUsuarios=total;
      this.usuarios=usuarios;
      this.usuariosTemp=usuarios;
      this.cargando=false;
    });
  }

  cambiarPagina(valor){

    this.desde+=valor;  
    if(this.desde<0){

      this.desde=0;
    }else if(this.desde>this.totalUsuarios){
      
      this.desde-=valor;
    }  

    this.cargarUsuarios();
  }

  buscar(termino:string){

    if(termino.length===0){
      this.usuarios=this.usuariosTemp;
      return;
    }

    console.log(termino);
    this.busquedaService.buscar('usuarios',termino).subscribe((resp:any)=>{
      
      this.usuarios=resp;
    })
  }

  eliminarUsuario(usuario:Usuario){

    if(usuario.uid===this.usuarioService.uid){
      return Swal.fire(
        'Error',
        `No puedes borrarte a ti mismo`,
        'warning'
      );
    }
    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Esta a punto de borrar a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,     
      confirmButtonText: 'Sí,Borrarlo!'
    }).then((result) => {
      if (result.value) {
        this.usuarioService.eliminarUsuario(usuario).subscribe(
          resp=>{
            Swal.fire(
              'Usuario borrado',
              `${usuario.nombre} fue eliminado correctamente`,
              'success'
            );
            this.cargarUsuarios();
          }
        )
      }
    })
  }

  cambiarRole(usuario:Usuario){

    this.usuarioService.guardarUsuario(usuario).subscribe(resp=>{
      console.log(resp);
    })
  }
  abrirModal(usuario:Usuario){
    console.log(usuario);
    this.modalImagenService.abrirModal('usuarios',usuario.uid,usuario.img);
  }
}
