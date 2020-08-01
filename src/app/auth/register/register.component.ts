import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.css'
  ]
})
export class RegisterComponent{

  public formSubmitted=false;

  public registerForm=this.fb.group({
    nombre:[
      'Andres Lince',
      [Validators.required,Validators.minLength(3)]
    ],
    email:[
      'test100@gmail.com',
     [ Validators.required,Validators.email]
    ],
    password:[
      '1234567',
      Validators.required
    ],
    password2:[
      '1234567',
      Validators.required
    ],
    terminos:[
      true,
      Validators.required
    ],

  },{
    validators:this.passwordsIguales('password','password2')
  });

  constructor(private fb:FormBuilder,private usuarioService:UsuarioService,private router:Router) { }

  crearUsuario(){

    this.formSubmitted=true;
    console.log(this.registerForm.value);

    if(this.registerForm.invalid){

      return;
    }
    //realizar el posteo
    this.usuarioService.createUsuario(this.registerForm.value).subscribe(res=>{
        console.log('usuario creado');
        this.router.navigateByUrl('/');
      },(err)=>{
        Swal.fire('Error',err.error.msg,'error');
      }
    )

  }

  campoNoValido(campo:string):boolean{

    if(this.registerForm.get(campo).invalid&&this.formSubmitted){
      return true;
    }
    return false;
  }

  contrasenasNoValidas():boolean{
    const pass1=this.registerForm.get('password').value;
    const pass2=this.registerForm.get('password2').value;

    if((pass1!==pass2)&&this.formSubmitted){
      return true;
    }
    return false;

    
  }

  aceptaTerminos():boolean{
    if(!this.registerForm.get('terminos').value&&this.formSubmitted){
      return true;
    }
    return false;
  }

  passwordsIguales(pass1Name:string,pass2Name:string){
  
    return (formGroup:FormGroup)=>{

      const passControl=formGroup.get(pass1Name);
      const pass2Control=formGroup.get(pass2Name);

      if(passControl.value===pass2Control.value){
        pass2Control.setErrors(null);
      }else{
        pass2Control.setErrors({noEsIgual:true});
      }
    }
  }

}
